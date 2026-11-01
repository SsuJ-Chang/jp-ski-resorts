export type PopularResortEntry = {
  id: string
  data: string
  previousRank: number | null
}

export const popularResorts = {
  // 控制排行榜是否顯示 data 數值欄位；資料仍保留供排序與驗證使用。
  showData: true,
  version: '2026-11-01-001',
  period: '2026/9/25 - 2026/11/01',
  updatedAt: '2026-11-01',
  title: '熱門雪場排行',
  description: '依據本站近 30 天瀏覽次數整理統計。',
  resorts: [
    { id: 'kagura', data: '10.19', previousRank: 10 },
    { id: 'furano', data: '8.38', previousRank: null },
    { id: 'sapporo-teine', data: '7.37', previousRank: 1 },
    { id: 'hakuba-happo-one', data: '6.66', previousRank: null },
    { id: 'tsugaike-kogen', data: '6.56', previousRank: 7 },
    { id: 'ishiuchi-maruyama', data: '6.46', previousRank: 8 },
    { id: 'nozawa-onsen', data: '6.05', previousRank: 9 },
    { id: 'kamui-ski-links', data: '5.95', previousRank: 4 },
    { id: 'kandatsu', data: '5.75', previousRank: 2 },
    { id: 'iwappara', data: '4.84', previousRank: null },
  ] satisfies PopularResortEntry[],
} as const

export const isPopularResortsEnabled = popularResorts.resorts.length >= 5
