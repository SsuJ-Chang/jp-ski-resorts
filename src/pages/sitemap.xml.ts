import type { APIRoute } from 'astro'
import { execFileSync } from 'node:child_process'
import { statSync } from 'node:fs'
import { regions } from '../data/regions'
import { publishedSkiAreaKeys } from '../data/skiAreas'
import { getPrefectureStats } from '../utils/resortBrowse'
import { type ResortEntry } from '../utils/resorts'
import { getPublishedResorts } from '../utils/resortCatalog'

type SitemapEntry = {
  path: string
  lastmod: Date
  priority: string
  changefreq: 'weekly' | 'monthly' | 'yearly'
}

const xmlEscape = (value: string) =>
  value
    .replaceAll('&', '&amp;')
    .replaceAll('<', '&lt;')
    .replaceAll('>', '&gt;')
    .replaceAll('"', '&quot;')
    .replaceAll("'", '&apos;')

const toUrl = (path: string, site: URL) => new URL(path, site).toString()

const toSitemapLastmod = (date: Date) => date.toISOString().replace(/\.\d{3}Z$/, 'Z')

const resortContentRoot = 'src/content/resorts/'
const gitCommitLinePrefix = 'commit:'

const normalizeResortContentPath = (filePath: string) => {
  const normalizedPath = filePath.replaceAll('\\', '/')
  const rootIndex = normalizedPath.indexOf(resortContentRoot)

  return rootIndex === -1 ? normalizedPath : normalizedPath.slice(rootIndex)
}

const getCommittedLastmodByPath = () => {
  const lastmodByPath = new Map<string, Date>()

  try {
    const output = execFileSync(
      'git',
      ['log', `--format=${gitCommitLinePrefix}%cI`, '--name-only', '--', resortContentRoot],
      { encoding: 'utf8', stdio: ['ignore', 'pipe', 'ignore'] },
    )
    let commitDate: Date | undefined

    for (const rawLine of output.split(/\r?\n/)) {
      const line = rawLine.trim()

      if (!line) continue

      if (line.startsWith(gitCommitLinePrefix)) {
        const parsedDate = new Date(line.slice(gitCommitLinePrefix.length))
        commitDate = Number.isNaN(parsedDate.getTime()) ? undefined : parsedDate
        continue
      }

      const contentPath = normalizeResortContentPath(line)
      if (
        commitDate &&
        contentPath.startsWith(resortContentRoot) &&
        !lastmodByPath.has(contentPath)
      ) {
        lastmodByPath.set(contentPath, commitDate)
      }
    }
  } catch {
    return lastmodByPath
  }

  return lastmodByPath
}

const getFileModifiedAt = (filePath?: string) => {
  if (!filePath) return undefined

  try {
    return statSync(filePath).mtime
  } catch {
    return undefined
  }
}

const getLatestDate = (dates: Date[], fallback: Date) => {
  if (dates.length === 0) return fallback

  return new Date(Math.max(...dates.map((date) => date.getTime())))
}

export const GET: APIRoute = async ({ site }) => {
  const siteUrl = site ?? new URL('https://jp-resorts.rj-tw.com')
  const resorts = await getPublishedResorts()
  const prefectureStats = getPrefectureStats(resorts)
  const buildLastmod = new Date()
  const committedLastmodByPath = getCommittedLastmodByPath()
  const resortLastmodById = new Map(
    resorts.map((resort) => {
      const contentPath = resort.filePath ? normalizeResortContentPath(resort.filePath) : ''
      const lastmod =
        committedLastmodByPath.get(contentPath) ?? getFileModifiedAt(resort.filePath) ?? buildLastmod

      return [resort.id, lastmod] as const
    }),
  )
  const siteLastmod = getLatestDate([...resortLastmodById.values()], buildLastmod)
  const getResortLastmod = (resort: ResortEntry) => resortLastmodById.get(resort.id) ?? siteLastmod
  const getLatestResortLastmod = (matchingResorts: ResortEntry[]) =>
    getLatestDate(matchingResorts.map(getResortLastmod), siteLastmod)

  const staticEntries: SitemapEntry[] = [
    { path: '/', lastmod: siteLastmod, priority: '1.0', changefreq: 'weekly' },
    { path: '/resorts/', lastmod: siteLastmod, priority: '0.9', changefreq: 'weekly' },
    { path: '/ski-areas/', lastmod: siteLastmod, priority: '0.8', changefreq: 'monthly' },
    { path: '/prefectures/', lastmod: siteLastmod, priority: '0.8', changefreq: 'monthly' },
  ]

  const regionEntries: SitemapEntry[] = regions.map((region) => ({
    path: `/regions/${region.key}/`,
    lastmod: getLatestResortLastmod(resorts.filter((resort) => resort.data.region === region.key)),
    priority: '0.8',
    changefreq: 'monthly',
  }))

  const skiAreaEntries: SitemapEntry[] = publishedSkiAreaKeys.map((key) => ({
    path: `/ski-areas/${key}/`,
    lastmod: getLatestResortLastmod(resorts.filter((resort) => resort.data.skiArea === key)),
    priority: '0.8',
    changefreq: 'monthly',
  }))

  const prefectureEntries: SitemapEntry[] = prefectureStats.map((prefecture) => ({
    path: `/prefectures/${prefecture.key}/`,
    lastmod: getLatestResortLastmod(
      resorts.filter((resort) => resort.data.prefecture === prefecture.key),
    ),
    priority: '0.7',
    changefreq: 'monthly',
  }))

  const resortEntries: SitemapEntry[] = resorts.map((resort) => ({
    path: `/resorts/${resort.id}/`,
    lastmod: getResortLastmod(resort),
    priority: '0.7',
    changefreq: 'monthly',
  }))

  const courseEntries: SitemapEntry[] = resorts
    .filter((resort) => resort.data.courses?.courseInfoPage)
    .map((resort) => ({
      path: `/resorts/${resort.id}/courses/`,
      lastmod: getResortLastmod(resort),
      priority: '0.6',
      changefreq: 'monthly',
    }))

  const entries = [
    ...staticEntries,
    ...regionEntries,
    ...skiAreaEntries,
    ...prefectureEntries,
    ...resortEntries,
    ...courseEntries,
  ]

  const body = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${entries
  .map(
    (entry) => `  <url>
    <loc>${xmlEscape(toUrl(entry.path, siteUrl))}</loc>
    <lastmod>${toSitemapLastmod(entry.lastmod)}</lastmod>
    <changefreq>${entry.changefreq}</changefreq>
    <priority>${entry.priority}</priority>
  </url>`,
  )
  .join('\n')}
</urlset>`

  return new Response(body, {
    headers: {
      'Content-Type': 'application/xml; charset=utf-8',
    },
  })
}
