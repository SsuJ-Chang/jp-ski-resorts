import type { APIRoute } from 'astro'
import { execFileSync } from 'node:child_process'
import { statSync } from 'node:fs'
import { regions } from '../data/regions'
import { publishedSkiAreaKeys, type PublishedSkiAreaKey } from '../data/skiAreaKeys'
import { getPrefectureStats } from '../utils/resortBrowse'
import { type ResortEntry } from '../utils/resorts'
import { getPublishedResorts } from '../utils/resortCatalog'
import { getPublishedSkiAreaEntries } from '../utils/skiAreas'

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
const skiAreaContentRoot = 'src/content/ski-areas/'
const gitCommitLinePrefix = 'commit:'

const normalizeContentPath = (filePath: string, contentRoot: string) => {
  const normalizedPath = filePath.replaceAll('\\', '/')
  const rootIndex = normalizedPath.indexOf(contentRoot)

  return rootIndex === -1 ? normalizedPath : normalizedPath.slice(rootIndex)
}

const getCommittedLastmodByPath = (contentRoot: string) => {
  const lastmodByPath = new Map<string, Date>()

  try {
    const output = execFileSync(
      'git',
      ['log', `--format=${gitCommitLinePrefix}%cI`, '--name-only', '--', contentRoot],
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

      const contentPath = normalizeContentPath(line, contentRoot)
      if (
        commitDate &&
        contentPath.startsWith(contentRoot) &&
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
  const skiAreas = await getPublishedSkiAreaEntries()
  const prefectureStats = getPrefectureStats(resorts)
  const buildLastmod = new Date()
  const committedResortLastmodByPath = getCommittedLastmodByPath(resortContentRoot)
  const committedSkiAreaLastmodByPath = getCommittedLastmodByPath(skiAreaContentRoot)
  const resortLastmodById = new Map(
    resorts.map((resort) => {
      const contentPath = resort.filePath
        ? normalizeContentPath(resort.filePath, resortContentRoot)
        : ''
      const lastmod =
        committedResortLastmodByPath.get(contentPath) ??
        getFileModifiedAt(resort.filePath) ??
        buildLastmod

      return [resort.id, lastmod] as const
    }),
  )
  const skiAreaLastmodByKey = new Map(
    skiAreas.map((skiArea) => {
      const contentPath = skiArea.filePath
        ? normalizeContentPath(skiArea.filePath, skiAreaContentRoot)
        : ''
      const lastmod =
        committedSkiAreaLastmodByPath.get(contentPath) ??
        getFileModifiedAt(skiArea.filePath) ??
        buildLastmod

      return [skiArea.id, lastmod] as const
    }),
  )
  const siteLastmod = getLatestDate(
    [...resortLastmodById.values(), ...skiAreaLastmodByKey.values()],
    buildLastmod,
  )
  const getResortLastmod = (resort: ResortEntry) => resortLastmodById.get(resort.id) ?? siteLastmod
  const getLatestResortLastmod = (matchingResorts: ResortEntry[]) =>
    getLatestDate(matchingResorts.map(getResortLastmod), siteLastmod)
  const getSkiAreaLastmod = (key: PublishedSkiAreaKey) => skiAreaLastmodByKey.get(key) ?? siteLastmod

  const staticEntries: SitemapEntry[] = [
    { path: '/', lastmod: siteLastmod, priority: '1.0', changefreq: 'weekly' },
    { path: '/resorts/', lastmod: siteLastmod, priority: '0.9', changefreq: 'weekly' },
    { path: '/ski-areas/', lastmod: siteLastmod, priority: '0.8', changefreq: 'monthly' },
    { path: '/prefectures/', lastmod: siteLastmod, priority: '0.8', changefreq: 'monthly' },
    { path: '/about/', lastmod: siteLastmod, priority: '0.4', changefreq: 'yearly' },
    { path: '/contact/', lastmod: siteLastmod, priority: '0.3', changefreq: 'yearly' },
    { path: '/privacy/', lastmod: siteLastmod, priority: '0.3', changefreq: 'yearly' },
  ]

  const regionEntries: SitemapEntry[] = regions.map((region) => ({
    path: `/regions/${region.key}/`,
    lastmod: getLatestResortLastmod(resorts.filter((resort) => resort.data.region === region.key)),
    priority: '0.8',
    changefreq: 'monthly',
  }))

  const skiAreaEntries: SitemapEntry[] = publishedSkiAreaKeys.map((key) => ({
    path: `/ski-areas/${key}/`,
    lastmod: getLatestDate(
      [
        getLatestResortLastmod(resorts.filter((resort) => resort.data.skiArea === key)),
        getSkiAreaLastmod(key),
      ],
      siteLastmod,
    ),
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
