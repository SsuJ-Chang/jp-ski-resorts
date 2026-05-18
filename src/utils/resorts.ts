import type { CollectionEntry } from 'astro:content'

export type ResortEntry = CollectionEntry<'resorts'>

export function isPublishedResort(resort: ResortEntry) {
  return resort.data.visibility.status === 'published'
}

export function filterPublishedResorts(resorts: ResortEntry[]) {
  return resorts.filter(isPublishedResort)
}

export function sortResortsByEnglishName(resorts: ResortEntry[]) {
  return resorts.toSorted((a, b) =>
    (a.data.name.en ?? a.data.name.zhTw).localeCompare(
      b.data.name.en ?? b.data.name.zhTw,
      'en',
    ),
  )
}

