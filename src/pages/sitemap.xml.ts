import type { APIRoute } from 'astro'
import { getCollection } from 'astro:content'
import { regions } from '../data/regions'
import { publishedSkiAreaKeys } from '../data/skiAreas'
import { getPrefectureStats } from '../utils/resortBrowse'
import { filterPublishedResorts } from '../utils/resorts'

type SitemapEntry = {
  path: string
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

export const GET: APIRoute = async ({ site }) => {
  const siteUrl = site ?? new URL('https://jp-resorts.rj-tw.com')
  const resorts = filterPublishedResorts(await getCollection('resorts'))
  const prefectureStats = getPrefectureStats(resorts)

  const staticEntries: SitemapEntry[] = [
    { path: '/', priority: '1.0', changefreq: 'weekly' },
    { path: '/resorts/', priority: '0.9', changefreq: 'weekly' },
    { path: '/ski-areas/', priority: '0.8', changefreq: 'monthly' },
    { path: '/prefectures/', priority: '0.8', changefreq: 'monthly' },
  ]

  const regionEntries: SitemapEntry[] = regions.map((region) => ({
    path: `/regions/${region.key}/`,
    priority: '0.8',
    changefreq: 'monthly',
  }))

  const skiAreaEntries: SitemapEntry[] = publishedSkiAreaKeys.map((key) => ({
    path: `/ski-areas/${key}/`,
    priority: '0.8',
    changefreq: 'monthly',
  }))

  const prefectureEntries: SitemapEntry[] = prefectureStats.map((prefecture) => ({
    path: `/prefectures/${prefecture.key}/`,
    priority: '0.7',
    changefreq: 'monthly',
  }))

  const resortEntries: SitemapEntry[] = resorts.map((resort) => ({
    path: `/resorts/${resort.id}/`,
    priority: '0.7',
    changefreq: 'monthly',
  }))

  const courseEntries: SitemapEntry[] = resorts
    .filter((resort) => resort.data.courses?.courseInfoPage)
    .map((resort) => ({
      path: `/resorts/${resort.id}/courses/`,
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
