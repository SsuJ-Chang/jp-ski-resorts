import type { RegionKey } from '../data/regions'
import {
  getPrefectureByName,
  prefectures,
  type Prefecture,
  type PrefectureKey,
} from '../data/prefectures'
import type { ResortEntry } from './resorts'

export type PrefectureStat = Prefecture & {
  count: number
}

export function getResortPrefecture(resort: ResortEntry) {
  return getPrefectureByName(resort.data.prefecture)
}

export function getResortPrefectureKey(resort: ResortEntry) {
  return getResortPrefecture(resort)?.key
}

export function filterResortsByPrefecture(resorts: ResortEntry[], prefectureKey: PrefectureKey) {
  return resorts.filter((resort) => getResortPrefectureKey(resort) === prefectureKey)
}

export function getPrefectureStats(resorts: ResortEntry[]) {
  const countByPrefecture = new Map<string, number>()

  for (const resort of resorts) {
    countByPrefecture.set(resort.data.prefecture, (countByPrefecture.get(resort.data.prefecture) ?? 0) + 1)
  }

  return prefectures
    .map((prefecture) => ({
      ...prefecture,
      count: countByPrefecture.get(prefecture.name.zhTw) ?? 0,
    }))
    .filter((prefecture) => prefecture.count > 0)
}

export function getPrefectureStatsByRegion(resorts: ResortEntry[], region: RegionKey) {
  return getPrefectureStats(resorts).filter((prefecture) => prefecture.region === region)
}
