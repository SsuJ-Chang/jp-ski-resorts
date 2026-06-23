import { withBasePath } from '../utils/paths'

const startDeferredEnhancements = () => {
  // 這裡只放「不急著在首屏完成」的東西：GA、頁面事件追蹤、service worker。
  // 先讓主內容跑完，再慢慢載入，減少跟首屏搶資源。
  import('./pageAnalytics.ts').catch(() => {})

  const swUrl = withBasePath('/sw.js')

  if ('serviceWorker' in navigator) {
    navigator.serviceWorker.register(swUrl).catch(() => {
      // Service worker is a progressive enhancement; ignore registration failures.
    })
  }
}

if (document.readyState === 'complete') {
  startDeferredEnhancements()
} else {
  window.addEventListener('load', startDeferredEnhancements, { once: true })
}
