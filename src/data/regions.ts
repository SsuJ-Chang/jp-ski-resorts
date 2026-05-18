export const regionKeys = [
  'hokkaido',
  'tohoku',
  'kanto-koshinetsu',
  'hokuriku',
  'chubu',
  'kansai-chugoku',
  'kyushu',
] as const

export type RegionKey = (typeof regionKeys)[number]

export type Region = {
  key: RegionKey
  name: {
    zhTw: string
    en: string
  }
  description: string
}

export const regions: Region[] = [
  {
    key: 'hokkaido',
    name: {
      zhTw: '北海道',
      en: 'Hokkaido',
    },
    description: '粉雪與大型度假村集中，是第一次規劃日本滑雪旅行時常見的候選區域。',
  },
  {
    key: 'tohoku',
    name: {
      zhTw: '東北',
      en: 'Tohoku',
    },
    description: '雪量穩定、溫泉地多，適合把滑雪與地方旅行放在同一趟行程。',
  },
  {
    key: 'kanto-koshinetsu',
    name: {
      zhTw: '關東甲信越',
      en: 'Kanto-Koshinetsu',
    },
    description: '從東京出發的選項多，包含新潟、長野、群馬等熱門滑雪目的地；白馬資料先歸在此區。',
  },
  {
    key: 'hokuriku',
    name: {
      zhTw: '北陸',
      en: 'Hokuriku',
    },
    description: '可與金澤、富山等北陸城市旅行搭配，適合作為後續資料擴充區域。',
  },
  {
    key: 'chubu',
    name: {
      zhTw: '中部',
      en: 'Chubu',
    },
    description: '以東海與岐阜等中部滑雪目的地為主；長野滑雪旅行資料先歸入關東甲信越。',
  },
  {
    key: 'kansai-chugoku',
    name: {
      zhTw: '關西 / 中國',
      en: 'Kansai / Chugoku',
    },
    description: '可從大阪、京都、神戶等城市延伸，適合短天數或城市旅行搭配滑雪。',
  },
  {
    key: 'kyushu',
    name: {
      zhTw: '九州',
      en: 'Kyushu',
    },
    description: '涵蓋福岡及九州各縣可延伸的滑雪與冬季旅行目的地，先保留為後續資料擴充區域。',
  },
]
