import { getCollection } from 'astro:content'

import { filterPublishedResorts, type ResortEntry } from './resorts'

let publishedResortsPromise: Promise<ResortEntry[]> | undefined

export function getPublishedResorts() {
  // 這裡是「同一個 Node 執行過程內」的快取：
  // 第一次抓資料時才打 `getCollection`，之後同一輪建置流程共用同一個 Promise。
  publishedResortsPromise ??= getCollection('resorts').then(filterPublishedResorts)

  return publishedResortsPromise
}
