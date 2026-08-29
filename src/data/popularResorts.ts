export type PopularResortEntry = {
  id: string
  data: string
  note?: string
}

export const popularResorts = {
  version: '2026-08-29-413',
  period: '2026/7/30 - 2026/8/29',
  updatedAt: '2026-08-29',
  title: '熱門雪場排行',
  description: '依據本站近 30 天瀏覽次數整理統計。',
  resorts: [
    { id: 'kandatsu', data: '4.60', note: '湯澤近郊的夜滑與多樣雪道' },
    { id: 'kagura', data: '3.39', note: '高海拔雪場與長距離滑行' },
    { id: 'naeba', data: '3.39', note: '大型度假雪場與龍纜行程' },
    { id: 'necoma-mountain', data: '3.39', note: '東北豪雪與南北雙區滑行' },
    { id: 'ishiuchi-maruyama', data: '2.91', note: '湯澤代表性的綜合型雪場' },
    { id: 'listel-ski-fantasia', data: '2.91', note: '福島的中小型雪場與多樣坡面' },
    { id: 'sapporo-teine', data: '2.91', note: '札幌市景、粉雪與冬奧雪道' },
    { id: 'nozawa-onsen', data: '2.66', note: '滑雪、溫泉街與長距離雪道' },
    { id: 'palcall-tsumagoi-resort', data: '2.42', note: '長距離巡航與開闊山景' },
    { id: 'rusutsu-resort', data: '2.42', note: '三座山與北海道粉雪' },
  ] satisfies PopularResortEntry[],
} as const

export const isPopularResortsEnabled = popularResorts.resorts.length >= 5
