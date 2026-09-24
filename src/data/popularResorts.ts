export type PopularResortEntry = {
  id: string
  data: string
  previousRank: number | null
}

export const popularResorts = {
  // 控制排行榜是否顯示 data 數值欄位；資料仍保留供排序與驗證使用。
  showData: false,
  version: '2026-09-24-001',
  period: '2026/8/25 - 2026/9/24',
  updatedAt: '2026-09-24',
  title: '熱門雪場排行',
  description: '依據本站近 30 天瀏覽次數整理統計。',
  resorts: [
    { id: 'sapporo-teine', data: '', previousRank: 7 },
    { id: 'kandatsu', data: '', previousRank: 1 },
    { id: 'sapporo-kokusai', data: '', previousRank: null },
    { id: 'kamui-ski-links', data: '', previousRank: null },
    { id: 'necoma-mountain', data: '', previousRank: 4 },
    { id: 'zao-onsen', data: '', previousRank: null },
    { id: 'tsugaike-kogen', data: '', previousRank: null },
    { id: 'ishiuchi-maruyama', data: '', previousRank: 5 },
    { id: 'nozawa-onsen', data: '', previousRank: 8 },
    { id: 'kagura', data: '', previousRank: 2 },
  ] satisfies PopularResortEntry[],
} as const

export const isPopularResortsEnabled = popularResorts.resorts.length >= 5
