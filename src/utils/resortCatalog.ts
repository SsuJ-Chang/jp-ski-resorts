import { getCollection } from 'astro:content'

import { filterPublishedResorts, type ResortEntry } from './resorts'

let publishedResortsPromise: Promise<ResortEntry[]> | undefined

export function getPublishedResorts() {
  publishedResortsPromise ??= getCollection('resorts').then(filterPublishedResorts)

  return publishedResortsPromise
}
