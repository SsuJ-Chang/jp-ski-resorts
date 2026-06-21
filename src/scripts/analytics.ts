type AnalyticsParamValue = string | number | boolean
type AnalyticsEventParams = Record<string, AnalyticsParamValue | null | undefined>

declare global {
  interface Window {
    gtag?: (...args: unknown[]) => void
  }
}

const cleanParams = (params: AnalyticsEventParams) =>
  Object.fromEntries(
    Object.entries(params).filter(([, value]) => value !== undefined && value !== null && value !== ''),
  )

const isDebugMode = () => {
  const params = new URLSearchParams(window.location.search)

  return params.get('ga_debug') === '1' || params.get('debug_mode') === 'true'
}

export const trackEvent = (eventName: string, params: AnalyticsEventParams = {}) => {
  if (typeof window === 'undefined' || typeof window.gtag !== 'function') return

  window.gtag('event', eventName, cleanParams({
    ...params,
    debug_mode: isDebugMode() ? true : undefined,
  }))
}

export const getTextLengthBucket = (value: string) => {
  const normalizedLength = value.normalize('NFKC').trim().length

  if (normalizedLength === 0) return 'empty'
  if (normalizedLength <= 2) return '1-2'
  if (normalizedLength <= 5) return '3-5'
  if (normalizedLength <= 10) return '6-10'

  return '11+'
}
