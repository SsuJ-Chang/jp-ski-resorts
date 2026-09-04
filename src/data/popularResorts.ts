export type PopularResortEntry = {
  id: string
  data: string
}

export const popularResorts = {
  // 控制排行榜是否顯示 data 數值欄位；資料仍保留供排序與驗證使用。
  showData: false,
  version: '2026-08-29-413',
  period: '2026/7/30 - 2026/9/5',
  updatedAt: '2026-08-29',
  title: '熱門雪場排行',
  description: '依據本站近 30 天瀏覽次數整理統計。',
  resorts: [
    { id: 'kandatsu', data: '4.60' },
    { id: 'kagura', data: '3.39' },
    { id: 'naeba', data: '3.39' },
    { id: 'necoma-mountain', data: '3.39' },
    { id: 'ishiuchi-maruyama', data: '2.91' },
    { id: 'listel-ski-fantasia', data: '2.91' },
    { id: 'sapporo-teine', data: '2.91' },
    { id: 'nozawa-onsen', data: '2.66' },
    { id: 'palcall-tsumagoi-resort', data: '2.42' },
    { id: 'rusutsu-resort', data: '2.42' },
  ] satisfies PopularResortEntry[],
} as const

export const isPopularResortsEnabled = popularResorts.resorts.length >= 5
