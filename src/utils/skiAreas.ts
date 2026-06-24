import { getCollection, type CollectionEntry } from 'astro:content'
import {
  publishedSkiAreaKeys,
  type PublishedSkiAreaKey,
  type SkiAreaKey,
} from '../data/skiAreaKeys'

export type SkiAreaEntry = CollectionEntry<'skiAreas'>
export type SkiArea = SkiAreaEntry['data'] & { key: SkiAreaKey }
export type PublishedSkiArea = SkiArea & { key: PublishedSkiAreaKey }

const publishedSkiAreaKeySet = new Set<SkiAreaKey>(publishedSkiAreaKeys)
const publishedSkiAreaOrder = new Map<SkiAreaKey, number>(
  publishedSkiAreaKeys.map((key, index) => [key, index]),
)

const compareSkiAreaEntries = (a: SkiAreaEntry, b: SkiAreaEntry) => {
  const orderA = publishedSkiAreaOrder.get(a.id as SkiAreaKey) ?? Number.MAX_SAFE_INTEGER
  const orderB = publishedSkiAreaOrder.get(b.id as SkiAreaKey) ?? Number.MAX_SAFE_INTEGER

  if (orderA !== orderB) {
    return orderA - orderB
  }

  return a.id.localeCompare(b.id, 'en')
}

const toSkiArea = (entry: SkiAreaEntry): SkiArea => ({
  key: entry.id as SkiAreaKey,
  ...entry.data,
})

let skiAreaEntriesPromise: Promise<SkiAreaEntry[]> | undefined

export function getSkiAreaEntries() {
  skiAreaEntriesPromise ??= getCollection('skiAreas').then((entries) =>
    entries.toSorted(compareSkiAreaEntries),
  )

  return skiAreaEntriesPromise
}

export async function getPublishedSkiAreaEntries() {
  const entries = await getSkiAreaEntries()

  return entries.filter(
    (entry): entry is SkiAreaEntry & { id: PublishedSkiAreaKey } =>
      publishedSkiAreaKeySet.has(entry.id as SkiAreaKey),
  )
}

export async function getPublishedSkiAreas() {
  const entries = await getPublishedSkiAreaEntries()

  return entries.map((entry) => toSkiArea(entry) as PublishedSkiArea)
}

export async function getPublishedSkiAreaMap() {
  const areas = await getPublishedSkiAreas()

  return new Map<string, PublishedSkiArea>(areas.map((area) => [area.key, area] as const))
}
