import { trackEvent } from './analytics'

const pageContextElement = document.querySelector<HTMLElement>('[data-analytics-view]')
const resourceClickTrackedAt = new WeakMap<HTMLAnchorElement, number>()
const resourceClickDedupeMs = 750

const getResortParams = (element?: HTMLElement | null) => ({
  resort_slug: element?.dataset.resortSlug ?? pageContextElement?.dataset.resortSlug,
  resort_region: element?.dataset.resortRegion ?? pageContextElement?.dataset.resortRegion,
  resort_prefecture: element?.dataset.resortPrefecture ?? pageContextElement?.dataset.resortPrefecture,
})

const getNumberDataset = (element: HTMLElement | null, key: string) => {
  const value = element?.dataset[key]
  if (!value) return undefined

  const numberValue = Number(value)
  return Number.isFinite(numberValue) ? numberValue : undefined
}

const getLinkDomain = (href: string) => {
  try {
    return new URL(href, window.location.href).hostname
  } catch {
    return undefined
  }
}

const getAnalyticsText = (value?: string | null) => {
  const normalizedValue = value?.replace(/\s+/g, ' ').trim()

  return normalizedValue ? normalizedValue.slice(0, 100) : undefined
}

const trackPageViewContext = () => {
  if (!pageContextElement) return

  const analyticsView = pageContextElement.dataset.analyticsView

  if (analyticsView === 'resort') {
    trackEvent('view_resort', getResortParams(pageContextElement))
    return
  }

  if (analyticsView === 'resort_courses') {
    trackEvent('view_resort_courses', {
      ...getResortParams(pageContextElement),
      course_count: getNumberDataset(pageContextElement, 'courseCount'),
      course_group_count: getNumberDataset(pageContextElement, 'courseGroupCount'),
    })
  }
}

const trackResortCardClick = (card: HTMLElement) => {
  const resortSlug = card.dataset.resortSlug

  trackEvent('resort_card_click', {
    ...getResortParams(card),
    item_id: resortSlug,
    source_area: card.dataset.sourceArea ?? pageContextElement?.dataset.analyticsView,
  })
}

const trackResourceClick = (link: HTMLAnchorElement) => {
  const now = Date.now()
  const lastTrackedAt = resourceClickTrackedAt.get(link) ?? 0

  if (now - lastTrackedAt < resourceClickDedupeMs) return

  resourceClickTrackedAt.set(link, now)

  trackEvent('outbound_resource_click', {
    ...getResortParams(link),
    resource_type: link.dataset.analyticsResource,
    resource_label: getAnalyticsText(link.dataset.analyticsLabel ?? link.textContent),
    resource_note: getAnalyticsText(link.dataset.analyticsNote),
    link_domain: getLinkDomain(link.href),
    transport_type: 'beacon',
  })
}

const trackContentSelection = (element: HTMLElement) => {
  trackEvent('select_content', {
    content_type: element.dataset.analyticsSelect,
    item_id: element.dataset.selectId,
    source_area: element.dataset.sourceArea ?? pageContextElement?.dataset.analyticsView,
  })
}

trackPageViewContext()

document.addEventListener('pointerdown', (event) => {
  if (!(event.target instanceof Element)) return

  const resourceLink = event.target.closest<HTMLAnchorElement>('a[data-analytics-resource]')
  if (resourceLink) trackResourceClick(resourceLink)
}, { capture: true })

document.addEventListener('click', (event) => {
  if (!(event.target instanceof Element)) return

  const resourceLink = event.target.closest<HTMLAnchorElement>('a[data-analytics-resource]')
  if (resourceLink) trackResourceClick(resourceLink)

  const resortCard = event.target.closest<HTMLElement>('[data-resort-card]')
  if (resortCard) trackResortCardClick(resortCard)

  const selectedContent = event.target.closest<HTMLElement>('[data-analytics-select]')
  if (selectedContent) trackContentSelection(selectedContent)
})
