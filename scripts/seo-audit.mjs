import { existsSync, readdirSync, readFileSync, statSync } from 'node:fs'
import path from 'node:path'

const args = process.argv.slice(2)
const getArg = (name, fallback) => {
  const index = args.indexOf(name)
  return index === -1 ? fallback : args[index + 1]
}

const distDir = path.resolve(getArg('--dir', 'dist'))
const siteUrl = new URL(getArg('--site', 'https://jp-resorts.rj-tw.com'))
const errors = []
const warnings = []

const addError = (file, message) => errors.push({ file, message })
const addWarning = (file, message) => warnings.push({ file, message })

const escapeRegExp = (value) => value.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')

const getTags = (html, tagName) =>
  [...html.matchAll(new RegExp(`<${tagName}\\b[^>]*>`, 'gi'))].map((match) => match[0])

const getAttr = (tag, attrName) => {
  const match = tag.match(
    new RegExp(`\\b${escapeRegExp(attrName)}\\s*=\\s*("[^"]*"|'[^']*'|[^\\s>]+)`, 'i'),
  )

  return match ? match[1].replace(/^["']|["']$/g, '') : ''
}

const getMetaContent = (html, attrName, attrValue) => {
  const normalizedAttrValue = attrValue.toLowerCase()

  for (const tag of getTags(html, 'meta')) {
    if (getAttr(tag, attrName).toLowerCase() === normalizedAttrValue) {
      return getAttr(tag, 'content').trim()
    }
  }

  return ''
}

const getLinkHrefByRel = (html, relName) => {
  for (const tag of getTags(html, 'link')) {
    const relValues = getAttr(tag, 'rel').toLowerCase().split(/\s+/).filter(Boolean)

    if (relValues.includes(relName)) {
      return getAttr(tag, 'href').trim()
    }
  }

  return ''
}

const getTitle = (html) => {
  const match = html.match(/<title\b[^>]*>([\s\S]*?)<\/title>/i)
  return match ? match[1].replace(/<[^>]+>/g, '').trim() : ''
}

const getHtmlFiles = (directory) => {
  const files = []

  for (const entry of readdirSync(directory, { withFileTypes: true })) {
    const fullPath = path.join(directory, entry.name)

    if (entry.isDirectory()) {
      files.push(...getHtmlFiles(fullPath))
    } else if (entry.isFile() && entry.name.endsWith('.html')) {
      files.push(fullPath)
    }
  }

  return files
}

const pagePathFromFile = (filePath) => {
  const relativePath = path.relative(distDir, filePath).replaceAll(path.sep, '/')

  if (relativePath === 'index.html') return '/'
  if (relativePath.endsWith('/index.html')) {
    return `/${relativePath.slice(0, -'index.html'.length)}`
  }

  return `/${relativePath}`
}

const toSiteUrl = (pathname) => new URL(pathname, siteUrl).toString()

const toDistPathFromUrl = (value) => {
  const url = new URL(value, siteUrl)
  if (url.origin !== siteUrl.origin) return undefined

  let pathname = decodeURIComponent(url.pathname)
  if (pathname.endsWith('/')) pathname += 'index.html'
  if (!pathname.endsWith('.html') && !path.extname(pathname)) pathname += '/index.html'

  return path.join(distDir, pathname.replace(/^\/+/, ''))
}

const assertInternalAssetExists = (file, label, value) => {
  if (!value) return

  try {
    const url = new URL(value, siteUrl)
    if (url.origin !== siteUrl.origin) return

    const assetPath = path.join(distDir, decodeURIComponent(url.pathname).replace(/^\/+/, ''))
    if (!existsSync(assetPath) || !statSync(assetPath).isFile()) {
      addError(file, `${label} points to a missing asset: ${value}`)
    }
  } catch {
    addError(file, `${label} is not a valid URL or path: ${value}`)
  }
}

const extractXmlTag = (block, tagName) => {
  const match = block.match(new RegExp(`<${tagName}\\b[^>]*>([\\s\\S]*?)<\\/${tagName}>`, 'i'))
  return match ? match[1].trim() : ''
}

const parseSitemap = (sitemapPath) => {
  if (!existsSync(sitemapPath)) {
    addError('sitemap.xml', 'Missing dist/sitemap.xml')
    return []
  }

  const xml = readFileSync(sitemapPath, 'utf8')

  return [...xml.matchAll(/<url\b[^>]*>([\s\S]*?)<\/url>/gi)].map((match) => ({
    loc: extractXmlTag(match[1], 'loc'),
    lastmod: extractXmlTag(match[1], 'lastmod'),
    changefreq: extractXmlTag(match[1], 'changefreq'),
    priority: extractXmlTag(match[1], 'priority'),
  }))
}

const validateStructuredData = (file, html) => {
  const scripts = [
    ...html.matchAll(
      /<script\b[^>]*type=["']application\/ld\+json["'][^>]*>([\s\S]*?)<\/script>/gi,
    ),
  ]

  for (const script of scripts) {
    try {
      JSON.parse(script[1].trim())
    } catch (error) {
      addError(file, `Invalid JSON-LD: ${error.message}`)
    }
  }

  return scripts.length > 0
}

if (!existsSync(distDir)) {
  console.error(`Missing build output: ${distDir}`)
  process.exit(1)
}

const sitemapEntries = parseSitemap(path.join(distDir, 'sitemap.xml'))
const sitemapLocs = new Set()
const titleMap = new Map()
const descriptionMap = new Map()
const htmlFiles = getHtmlFiles(distDir).sort()
let jsonLdPageCount = 0
let indexedPageCount = 0

for (const entry of sitemapEntries) {
  if (!entry.loc) addError('sitemap.xml', 'A sitemap entry is missing <loc>')
  if (entry.loc && sitemapLocs.has(entry.loc)) addError('sitemap.xml', `Duplicate sitemap URL: ${entry.loc}`)
  if (entry.loc) sitemapLocs.add(entry.loc)

  if (!entry.lastmod) {
    addError('sitemap.xml', `${entry.loc || 'Unknown URL'} is missing <lastmod>`)
  } else if (Number.isNaN(new Date(entry.lastmod).getTime())) {
    addError('sitemap.xml', `${entry.loc || 'Unknown URL'} has an invalid <lastmod>`)
  }

  if (entry.loc) {
    try {
      const htmlPath = toDistPathFromUrl(entry.loc)
      if (htmlPath && !existsSync(htmlPath)) {
        addError('sitemap.xml', `Sitemap URL has no generated HTML file: ${entry.loc}`)
      }
    } catch {
      addError('sitemap.xml', `Invalid sitemap URL: ${entry.loc}`)
    }
  }
}

for (const filePath of htmlFiles) {
  const html = readFileSync(filePath, 'utf8')
  const file = path.relative(process.cwd(), filePath).replaceAll(path.sep, '/')
  const pagePath = pagePathFromFile(filePath)
  const expectedCanonical = toSiteUrl(pagePath)
  const title = getTitle(html)
  const description = getMetaContent(html, 'name', 'description')
  const robots = getMetaContent(html, 'name', 'robots')
  const canonical = getLinkHrefByRel(html, 'canonical')
  const ogTitle = getMetaContent(html, 'property', 'og:title')
  const ogDescription = getMetaContent(html, 'property', 'og:description')
  const ogUrl = getMetaContent(html, 'property', 'og:url')
  const ogImage = getMetaContent(html, 'property', 'og:image')
  const twitterCard = getMetaContent(html, 'name', 'twitter:card')
  const twitterTitle = getMetaContent(html, 'name', 'twitter:title')
  const twitterDescription = getMetaContent(html, 'name', 'twitter:description')
  const twitterImage = getMetaContent(html, 'name', 'twitter:image')
  const viewport = getMetaContent(html, 'name', 'viewport')
  const language = getAttr(html.match(/<html\b[^>]*>/i)?.[0] ?? '', 'lang')
  const h1Count = [...html.matchAll(/<h1\b/gi)].length
  const isNoindex = /noindex/i.test(robots)

  if (!title) addError(file, 'Missing <title>')
  if (!description) addError(file, 'Missing meta description')
  if (!robots) addError(file, 'Missing robots meta')
  if (!viewport) addError(file, 'Missing viewport meta')
  if (language !== 'zh-Hant-TW') addWarning(file, `Unexpected html lang: ${language || '(missing)'}`)
  if (!canonical) addError(file, 'Missing canonical link')
  if (canonical && canonical !== expectedCanonical) {
    addError(file, `Canonical does not match generated path: expected ${expectedCanonical}, got ${canonical}`)
  }

  if (!ogTitle) addError(file, 'Missing og:title')
  if (!ogDescription) addError(file, 'Missing og:description')
  if (!ogUrl) addError(file, 'Missing og:url')
  if (ogUrl && ogUrl !== canonical) addError(file, `og:url does not match canonical: ${ogUrl}`)
  if (!ogImage) addError(file, 'Missing og:image')
  if (!twitterCard) addError(file, 'Missing twitter:card')
  if (!twitterTitle) addError(file, 'Missing twitter:title')
  if (!twitterDescription) addError(file, 'Missing twitter:description')
  if (!twitterImage) addError(file, 'Missing twitter:image')

  if (!getLinkHrefByRel(html, 'icon')) addError(file, 'Missing favicon link')
  if (!getLinkHrefByRel(html, 'apple-touch-icon')) addError(file, 'Missing apple touch icon link')
  if (h1Count === 0) addWarning(file, 'Missing h1')
  if (h1Count > 1) addWarning(file, `Multiple h1 headings: ${h1Count}`)

  assertInternalAssetExists(file, 'og:image', ogImage)
  assertInternalAssetExists(file, 'twitter:image', twitterImage)
  assertInternalAssetExists(file, 'favicon', getLinkHrefByRel(html, 'icon'))
  assertInternalAssetExists(file, 'apple-touch-icon', getLinkHrefByRel(html, 'apple-touch-icon'))

  if (!isNoindex) {
    indexedPageCount += 1
    if (canonical && !sitemapLocs.has(canonical)) {
      addError(file, `Indexed canonical URL is missing from sitemap: ${canonical}`)
    }
  }

  if (validateStructuredData(file, html)) jsonLdPageCount += 1

  if (title) {
    const list = titleMap.get(title) ?? []
    list.push(file)
    titleMap.set(title, list)
  }

  if (description) {
    const list = descriptionMap.get(description) ?? []
    list.push(file)
    descriptionMap.set(description, list)
  }
}

for (const [title, files] of titleMap) {
  if (files.length > 1) addWarning(files[0], `Duplicate title on ${files.length} pages: ${title}`)
}

for (const [description, files] of descriptionMap) {
  if (files.length > 1) {
    addWarning(files[0], `Duplicate description on ${files.length} pages: ${description}`)
  }
}

const printIssues = (label, issues, limit = 25) => {
  console.log(`${label}: ${issues.length}`)

  for (const issue of issues.slice(0, limit)) {
    console.log(`- ${issue.file}: ${issue.message}`)
  }

  if (issues.length > limit) {
    console.log(`- ... ${issues.length - limit} more`)
  }
}

console.log('SEO audit summary')
console.log(`- dist: ${distDir}`)
console.log(`- site: ${siteUrl.toString()}`)
console.log(`- html pages: ${htmlFiles.length}`)
console.log(`- indexed pages: ${indexedPageCount}`)
console.log(`- sitemap URLs: ${sitemapEntries.length}`)
console.log(`- JSON-LD pages: ${jsonLdPageCount}`)
printIssues('Warnings', warnings)
printIssues('Errors', errors)

if (errors.length > 0) {
  process.exit(1)
}

console.log('SEO audit passed')
