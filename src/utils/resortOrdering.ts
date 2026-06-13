import { resortListingOrder } from '../data/resortListingOrder'
import type { ResortEntry } from './resorts'
import { getResortPrefecture } from './resortBrowse'

const collatorZh = new Intl.Collator('zh-Hant-TW', {
  numeric: true,
  sensitivity: 'base',
})

const collatorEn = new Intl.Collator('en', {
  numeric: true,
  sensitivity: 'base',
})

const resortListingOrderIndex = new Map<string, number>(
  resortListingOrder.map((resortId, index) => [resortId, index]),
)

const fallbackOrder = Number.MAX_SAFE_INTEGER

export function getResortListingId(resort: ResortEntry) {
  return resort.data.id || resort.id
}

export function compareResortsForListing(a: ResortEntry, b: ResortEntry) {
  const orderA = resortListingOrderIndex.get(getResortListingId(a)) ?? fallbackOrder
  const orderB = resortListingOrderIndex.get(getResortListingId(b)) ?? fallbackOrder

  if (orderA !== orderB) {
    return orderA - orderB
  }

  const prefectureOrderA = getResortPrefecture(a)?.order ?? fallbackOrder
  const prefectureOrderB = getResortPrefecture(b)?.order ?? fallbackOrder

  if (prefectureOrderA !== prefectureOrderB) {
    return prefectureOrderA - prefectureOrderB
  }

  const zhNameComparison = collatorZh.compare(a.data.name.zhTw, b.data.name.zhTw)

  if (zhNameComparison !== 0) {
    return zhNameComparison
  }

  const enNameComparison = collatorEn.compare(a.data.name.en ?? '', b.data.name.en ?? '')

  if (enNameComparison !== 0) {
    return enNameComparison
  }

  return collatorEn.compare(getResortListingId(a), getResortListingId(b))
}

export function sortResortsForListing(resorts: ResortEntry[]) {
  return resorts.toSorted(compareResortsForListing)
}
