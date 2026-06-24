import type { APIRoute } from 'astro'

const escapeJsString = (value: string) =>
  value.replaceAll('\\', '\\\\').replaceAll("'", "\\'")

export const GET: APIRoute = async () => {
  const timestamp = new Date().toISOString().replace(/[-:]/g, '').replace(/\.\d{3}Z$/, 'Z')
  // 每次重新 build 都換一個版本號，讓舊的瀏覽器快取能被辨識並清掉。
  const cacheVersion = `v${timestamp}`
  const basePath = import.meta.env.BASE_URL.endsWith('/')
    ? import.meta.env.BASE_URL.slice(0, -1)
    : import.meta.env.BASE_URL
  const withBasePath = (path: string) => `${basePath}${path.startsWith('/') ? path : `/${path}`}`

  const shellUrls = [
    '/',
    '/resorts/',
    '/prefectures/',
    '/ski-areas/',
    '/about/',
    '/contact/',
    '/privacy/',
    '/thanks/',
    '/robots.txt',
    '/sitemap.xml',
    '/favicon.ico',
    '/favicon-16x16.png',
    '/favicon-32x32.png',
    '/favicon-48x48.png',
    '/apple-touch-icon.png',
    '/images/og-image.png',
  ].map(withBasePath)

  const body = `const CACHE_VERSION = '${escapeJsString(cacheVersion)}'
const SHELL_CACHE = \`jp-ski-resorts-shell-\${CACHE_VERSION}\`
const NAVIGATION_CACHE = \`jp-ski-resorts-navigation-\${CACHE_VERSION}\`
const ASSET_CACHE = \`jp-ski-resorts-assets-\${CACHE_VERSION}\`
const SHELL_URLS = ${JSON.stringify(shellUrls)}

const isSameOriginRequest = (request) => {
  try {
    return new URL(request.url).origin === self.location.origin
  } catch {
    return false
  }
}

const isNavigationRequest = (request) =>
  request.mode === 'navigate' || request.destination === 'document'

const isAssetRequest = (request) => {
  if (!request.destination) {
    const pathname = new URL(request.url).pathname
    return /\\.(?:css|js|mjs|png|jpe?g|gif|webp|svg|ico|json|xml|txt|woff2?)$/i.test(pathname)
  }

  return ['style', 'script', 'image', 'font', 'manifest'].includes(request.destination)
}

const cacheResponse = async (cacheName, request, response) => {
  if (!response || !response.ok) return response

  // 把成功回應放進瀏覽器的 Cache Storage，下一次同 URL 先不用再抓網路。
  const cache = await caches.open(cacheName)
  await cache.put(request, response.clone())
  return response
}

const fetchAndCache = async (cacheName, request) => {
  const response = await fetch(request)
  return cacheResponse(cacheName, request, response)
}

const networkFirst = async (cacheName, request) => {
  const cache = await caches.open(cacheName)

  try {
    // 頁面類資源先問網路，拿到新內容就順手覆蓋快取。
    const response = await fetchAndCache(cacheName, request)
    if (response) return response
  } catch {}

  // 網路掛掉時，退回上一版已存好的頁面。
  const cached = await cache.match(request)
  if (cached) return cached

  throw new Error('Network request failed')
}

const cacheFirst = async (cacheName, request) => {
  const cache = await caches.open(cacheName)
  const cached = await cache.match(request)
  if (cached) return cached

  // 靜態檔案先用快取，沒有才去抓。
  return fetchAndCache(cacheName, request)
}

self.addEventListener('install', (event) => {
  event.waitUntil((async () => {
    // 先把首頁與主要入口頁塞進 shell cache，讓第一次進站後的常用頁面比較快開。
    const cache = await caches.open(SHELL_CACHE)
    await cache.addAll(SHELL_URLS)
    self.skipWaiting()
  })())
})

self.addEventListener('activate', (event) => {
  event.waitUntil((async () => {
    // 只留目前版本需要的 cache，避免瀏覽器越存越多舊資料。
    const expectedCaches = new Set([SHELL_CACHE, NAVIGATION_CACHE, ASSET_CACHE])
    const cacheNames = await caches.keys()

    await Promise.all(
      cacheNames.map((cacheName) => {
        if (expectedCaches.has(cacheName)) return Promise.resolve()
        return caches.delete(cacheName)
      }),
    )

    await self.clients.claim()
  })())
})

self.addEventListener('fetch', (event) => {
  const { request } = event

  if (request.method !== 'GET' || !isSameOriginRequest(request)) return

  if (isNavigationRequest(request)) {
    event.respondWith(networkFirst(NAVIGATION_CACHE, request))
    return
  }

  if (isAssetRequest(request)) {
    event.respondWith(cacheFirst(ASSET_CACHE, request))
  }
})
`

  return new Response(body, {
    headers: {
      'Content-Type': 'application/javascript; charset=utf-8',
      'Cache-Control': 'no-cache',
    },
  })
}
