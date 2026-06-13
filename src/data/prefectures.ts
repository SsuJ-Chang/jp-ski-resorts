import type { RegionKey } from './regions'

export const browseAreaKeys = [
  'hokkaido',
  'tohoku',
  'kanto',
  'koshinetsu',
  'hokuriku',
  'tokai',
  'kansai',
  'chugoku-shikoku',
  'kyushu',
] as const

export type BrowseAreaKey = (typeof browseAreaKeys)[number]

export const browseAreaLabels: Record<BrowseAreaKey, string> = {
  hokkaido: '北海道',
  tohoku: '東北',
  kanto: '關東',
  koshinetsu: '甲信越',
  hokuriku: '北陸',
  tokai: '東海',
  kansai: '關西',
  'chugoku-shikoku': '中國・四國',
  kyushu: '九州',
}

export type Prefecture = {
  key: string
  name: {
    zhTw: string
    ja: string
    en: string
  }
  region: RegionKey
  browseArea: BrowseAreaKey
  order: number
}

export const prefectures = [
  {
    key: 'hokkaido',
    name: { zhTw: '北海道', ja: '北海道', en: 'Hokkaido' },
    region: 'hokkaido',
    browseArea: 'hokkaido',
    order: 1,
  },
  {
    key: 'aomori',
    name: { zhTw: '青森縣', ja: '青森県', en: 'Aomori' },
    region: 'tohoku',
    browseArea: 'tohoku',
    order: 2,
  },
  {
    key: 'iwate',
    name: { zhTw: '岩手縣', ja: '岩手県', en: 'Iwate' },
    region: 'tohoku',
    browseArea: 'tohoku',
    order: 3,
  },
  {
    key: 'miyagi',
    name: { zhTw: '宮城縣', ja: '宮城県', en: 'Miyagi' },
    region: 'tohoku',
    browseArea: 'tohoku',
    order: 4,
  },
  {
    key: 'akita',
    name: { zhTw: '秋田縣', ja: '秋田県', en: 'Akita' },
    region: 'tohoku',
    browseArea: 'tohoku',
    order: 5,
  },
  {
    key: 'yamagata',
    name: { zhTw: '山形縣', ja: '山形県', en: 'Yamagata' },
    region: 'tohoku',
    browseArea: 'tohoku',
    order: 6,
  },
  {
    key: 'fukushima',
    name: { zhTw: '福島縣', ja: '福島県', en: 'Fukushima' },
    region: 'tohoku',
    browseArea: 'tohoku',
    order: 7,
  },
  {
    key: 'ibaraki',
    name: { zhTw: '茨城縣', ja: '茨城県', en: 'Ibaraki' },
    region: 'kanto-koshinetsu',
    browseArea: 'kanto',
    order: 8,
  },
  {
    key: 'tochigi',
    name: { zhTw: '栃木縣', ja: '栃木県', en: 'Tochigi' },
    region: 'kanto-koshinetsu',
    browseArea: 'kanto',
    order: 9,
  },
  {
    key: 'gunma',
    name: { zhTw: '群馬縣', ja: '群馬県', en: 'Gunma' },
    region: 'kanto-koshinetsu',
    browseArea: 'kanto',
    order: 10,
  },
  {
    key: 'saitama',
    name: { zhTw: '埼玉縣', ja: '埼玉県', en: 'Saitama' },
    region: 'kanto-koshinetsu',
    browseArea: 'kanto',
    order: 11,
  },
  {
    key: 'chiba',
    name: { zhTw: '千葉縣', ja: '千葉県', en: 'Chiba' },
    region: 'kanto-koshinetsu',
    browseArea: 'kanto',
    order: 12,
  },
  {
    key: 'tokyo',
    name: { zhTw: '東京都', ja: '東京都', en: 'Tokyo' },
    region: 'kanto-koshinetsu',
    browseArea: 'kanto',
    order: 13,
  },
  {
    key: 'kanagawa',
    name: { zhTw: '神奈川縣', ja: '神奈川県', en: 'Kanagawa' },
    region: 'kanto-koshinetsu',
    browseArea: 'kanto',
    order: 14,
  },
  {
    key: 'yamanashi',
    name: { zhTw: '山梨縣', ja: '山梨県', en: 'Yamanashi' },
    region: 'kanto-koshinetsu',
    browseArea: 'koshinetsu',
    order: 15,
  },
  {
    key: 'nagano',
    name: { zhTw: '長野縣', ja: '長野県', en: 'Nagano' },
    region: 'kanto-koshinetsu',
    browseArea: 'koshinetsu',
    order: 16,
  },
  {
    key: 'niigata',
    name: { zhTw: '新潟縣', ja: '新潟県', en: 'Niigata' },
    region: 'kanto-koshinetsu',
    browseArea: 'koshinetsu',
    order: 17,
  },
  {
    key: 'toyama',
    name: { zhTw: '富山縣', ja: '富山県', en: 'Toyama' },
    region: 'hokuriku',
    browseArea: 'hokuriku',
    order: 18,
  },
  {
    key: 'ishikawa',
    name: { zhTw: '石川縣', ja: '石川県', en: 'Ishikawa' },
    region: 'hokuriku',
    browseArea: 'hokuriku',
    order: 19,
  },
  {
    key: 'fukui',
    name: { zhTw: '福井縣', ja: '福井県', en: 'Fukui' },
    region: 'hokuriku',
    browseArea: 'hokuriku',
    order: 20,
  },
  {
    key: 'gifu',
    name: { zhTw: '岐阜縣', ja: '岐阜県', en: 'Gifu' },
    region: 'chubu',
    browseArea: 'tokai',
    order: 21,
  },
  {
    key: 'shizuoka',
    name: { zhTw: '靜岡縣', ja: '静岡県', en: 'Shizuoka' },
    region: 'chubu',
    browseArea: 'tokai',
    order: 22,
  },
  {
    key: 'aichi',
    name: { zhTw: '愛知縣', ja: '愛知県', en: 'Aichi' },
    region: 'chubu',
    browseArea: 'tokai',
    order: 23,
  },
  {
    key: 'mie',
    name: { zhTw: '三重縣', ja: '三重県', en: 'Mie' },
    region: 'chubu',
    browseArea: 'tokai',
    order: 24,
  },
  {
    key: 'shiga',
    name: { zhTw: '滋賀縣', ja: '滋賀県', en: 'Shiga' },
    region: 'kansai-chugoku',
    browseArea: 'kansai',
    order: 25,
  },
  {
    key: 'kyoto',
    name: { zhTw: '京都府', ja: '京都府', en: 'Kyoto' },
    region: 'kansai-chugoku',
    browseArea: 'kansai',
    order: 26,
  },
  {
    key: 'osaka',
    name: { zhTw: '大阪府', ja: '大阪府', en: 'Osaka' },
    region: 'kansai-chugoku',
    browseArea: 'kansai',
    order: 27,
  },
  {
    key: 'hyogo',
    name: { zhTw: '兵庫縣', ja: '兵庫県', en: 'Hyogo' },
    region: 'kansai-chugoku',
    browseArea: 'kansai',
    order: 28,
  },
  {
    key: 'nara',
    name: { zhTw: '奈良縣', ja: '奈良県', en: 'Nara' },
    region: 'kansai-chugoku',
    browseArea: 'kansai',
    order: 29,
  },
  {
    key: 'wakayama',
    name: { zhTw: '和歌山縣', ja: '和歌山県', en: 'Wakayama' },
    region: 'kansai-chugoku',
    browseArea: 'kansai',
    order: 30,
  },
  {
    key: 'tottori',
    name: { zhTw: '鳥取縣', ja: '鳥取県', en: 'Tottori' },
    region: 'kansai-chugoku',
    browseArea: 'chugoku-shikoku',
    order: 31,
  },
  {
    key: 'shimane',
    name: { zhTw: '島根縣', ja: '島根県', en: 'Shimane' },
    region: 'kansai-chugoku',
    browseArea: 'chugoku-shikoku',
    order: 32,
  },
  {
    key: 'okayama',
    name: { zhTw: '岡山縣', ja: '岡山県', en: 'Okayama' },
    region: 'kansai-chugoku',
    browseArea: 'chugoku-shikoku',
    order: 33,
  },
  {
    key: 'hiroshima',
    name: { zhTw: '廣島縣', ja: '広島県', en: 'Hiroshima' },
    region: 'kansai-chugoku',
    browseArea: 'chugoku-shikoku',
    order: 34,
  },
  {
    key: 'yamaguchi',
    name: { zhTw: '山口縣', ja: '山口県', en: 'Yamaguchi' },
    region: 'kansai-chugoku',
    browseArea: 'chugoku-shikoku',
    order: 35,
  },
  {
    key: 'tokushima',
    name: { zhTw: '德島縣', ja: '徳島県', en: 'Tokushima' },
    region: 'kansai-chugoku',
    browseArea: 'chugoku-shikoku',
    order: 36,
  },
  {
    key: 'kagawa',
    name: { zhTw: '香川縣', ja: '香川県', en: 'Kagawa' },
    region: 'kansai-chugoku',
    browseArea: 'chugoku-shikoku',
    order: 37,
  },
  {
    key: 'ehime',
    name: { zhTw: '愛媛縣', ja: '愛媛県', en: 'Ehime' },
    region: 'kansai-chugoku',
    browseArea: 'chugoku-shikoku',
    order: 38,
  },
  {
    key: 'kochi',
    name: { zhTw: '高知縣', ja: '高知県', en: 'Kochi' },
    region: 'kansai-chugoku',
    browseArea: 'chugoku-shikoku',
    order: 39,
  },
  {
    key: 'fukuoka',
    name: { zhTw: '福岡縣', ja: '福岡県', en: 'Fukuoka' },
    region: 'kyushu',
    browseArea: 'kyushu',
    order: 40,
  },
  {
    key: 'saga',
    name: { zhTw: '佐賀縣', ja: '佐賀県', en: 'Saga' },
    region: 'kyushu',
    browseArea: 'kyushu',
    order: 41,
  },
  {
    key: 'nagasaki',
    name: { zhTw: '長崎縣', ja: '長崎県', en: 'Nagasaki' },
    region: 'kyushu',
    browseArea: 'kyushu',
    order: 42,
  },
  {
    key: 'kumamoto',
    name: { zhTw: '熊本縣', ja: '熊本県', en: 'Kumamoto' },
    region: 'kyushu',
    browseArea: 'kyushu',
    order: 43,
  },
  {
    key: 'oita',
    name: { zhTw: '大分縣', ja: '大分県', en: 'Oita' },
    region: 'kyushu',
    browseArea: 'kyushu',
    order: 44,
  },
  {
    key: 'miyazaki',
    name: { zhTw: '宮崎縣', ja: '宮崎県', en: 'Miyazaki' },
    region: 'kyushu',
    browseArea: 'kyushu',
    order: 45,
  },
  {
    key: 'kagoshima',
    name: { zhTw: '鹿兒島縣', ja: '鹿児島県', en: 'Kagoshima' },
    region: 'kyushu',
    browseArea: 'kyushu',
    order: 46,
  },
  {
    key: 'okinawa',
    name: { zhTw: '沖繩縣', ja: '沖縄県', en: 'Okinawa' },
    region: 'kyushu',
    browseArea: 'kyushu',
    order: 47,
  },
] as const satisfies readonly Prefecture[]

export type PrefectureKey = (typeof prefectures)[number]['key']

export function getPrefectureByKey(key: string) {
  return prefectures.find((prefecture) => prefecture.key === key)
}

export function getPrefectureByName(name: string) {
  return prefectures.find((prefecture) => prefecture.name.zhTw === name)
}

export function getPrefecturesByRegion(region: RegionKey) {
  return prefectures.filter((prefecture) => prefecture.region === region)
}
