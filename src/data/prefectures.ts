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
  description: string
  region: RegionKey
  browseArea: BrowseAreaKey
  order: number
}

export const prefectures = [
  {
    key: 'hokkaido',
    name: { zhTw: '北海道', ja: '北海道', en: 'Hokkaido' },
    description: '遼闊自然、粉雪、海鮮、溫泉與四季戶外活動，適合滑雪與多日自然旅行。',
    region: 'hokkaido',
    browseArea: 'hokkaido',
    order: 1,
  },
  {
    key: 'aomori',
    name: { zhTw: '青森縣', ja: '青森県', en: 'Aomori' },
    description: '蘋果、睡魔祭、奧入瀨溪流與八甲田山是亮點，冬季可看樹冰、溫泉與深雪景色。',
    region: 'tohoku',
    browseArea: 'tohoku',
    order: 2,
  },
  {
    key: 'iwate',
    name: { zhTw: '岩手縣', ja: '岩手県', en: 'Iwate' },
    description: '三陸海岸、平泉文化遺產與安比高原等山岳度假地，兼具歷史、溫泉與雪國風景。',
    region: 'tohoku',
    browseArea: 'tohoku',
    order: 3,
  },
  {
    key: 'miyagi',
    name: { zhTw: '宮城縣', ja: '宮城県', en: 'Miyagi' },
    description: '以仙台為中心，松島海景、藏王山景與溫泉並存，適合結合城市、美食與自然。',
    region: 'tohoku',
    browseArea: 'tohoku',
    order: 4,
  },
  {
    key: 'akita',
    name: { zhTw: '秋田縣', ja: '秋田県', en: 'Akita' },
    description: '以乳頭溫泉、男鹿半島、角館武家屋敷與雪國祭典聞名，風景樸實沉靜。',
    region: 'tohoku',
    browseArea: 'tohoku',
    order: 5,
  },
  {
    key: 'yamagata',
    name: { zhTw: '山形縣', ja: '山形県', en: 'Yamagata' },
    description: '藏王樹冰、出羽三山、銀山溫泉與山寺，構成山岳、溫泉與信仰文化兼具的目的地。',
    region: 'tohoku',
    browseArea: 'tohoku',
    order: 6,
  },
  {
    key: 'fukushima',
    name: { zhTw: '福島縣', ja: '福島県', en: 'Fukushima' },
    description: '會津歷史城下町、磐梯山與豬苗代湖環繞，四季自然、溫泉與雪場選擇多。',
    region: 'tohoku',
    browseArea: 'tohoku',
    order: 7,
  },
  {
    key: 'ibaraki',
    name: { zhTw: '茨城縣', ja: '茨城県', en: 'Ibaraki' },
    description: '偕樂園、國營海濱公園、筑波山與太平洋海岸線，適合花景、山景與海鮮旅行。',
    region: 'kanto-koshinetsu',
    browseArea: 'kanto',
    order: 8,
  },
  {
    key: 'tochigi',
    name: { zhTw: '栃木縣', ja: '栃木県', en: 'Tochigi' },
    description: '日光寺社、鬼怒川與那須高原各有特色，適合把世界遺產、溫泉與高原自然串在一起。',
    region: 'kanto-koshinetsu',
    browseArea: 'kanto',
    order: 9,
  },
  {
    key: 'gunma',
    name: { zhTw: '群馬縣', ja: '群馬県', en: 'Gunma' },
    description: '草津、水上、伊香保等溫泉地集中，山岳與溪谷景觀多，冬季滑雪選擇豐富。',
    region: 'kanto-koshinetsu',
    browseArea: 'kanto',
    order: 10,
  },
  {
    key: 'saitama',
    name: { zhTw: '埼玉縣', ja: '埼玉県', en: 'Saitama' },
    description: '川越老街、秩父山林、長瀞溪谷與花景資源豐富，適合近郊文化與自然小旅行。',
    region: 'kanto-koshinetsu',
    browseArea: 'kanto',
    order: 11,
  },
  {
    key: 'chiba',
    name: { zhTw: '千葉縣', ja: '千葉県', en: 'Chiba' },
    description: '房總海岸、成田山、花田與主題樂園資源多，海景、美食與親子旅遊都方便安排。',
    region: 'kanto-koshinetsu',
    browseArea: 'kanto',
    order: 12,
  },
  {
    key: 'tokyo',
    name: { zhTw: '東京都', ja: '東京都', en: 'Tokyo' },
    description: '從都心文化、下町街景到多摩山林與離島自然，能在城市節奏中加入多樣體驗。',
    region: 'kanto-koshinetsu',
    browseArea: 'kanto',
    order: 13,
  },
  {
    key: 'kanagawa',
    name: { zhTw: '神奈川縣', ja: '神奈川県', en: 'Kanagawa' },
    description: '橫濱港灣、鎌倉寺社、箱根溫泉與富士山景彼此相近，城市與自然層次豐富。',
    region: 'kanto-koshinetsu',
    browseArea: 'kanto',
    order: 14,
  },
  {
    key: 'yamanashi',
    name: { zhTw: '山梨縣', ja: '山梨県', en: 'Yamanashi' },
    description: '富士山、富士五湖、葡萄酒鄉與高原景觀是主軸，適合湖景、溫泉與山岳活動。',
    region: 'kanto-koshinetsu',
    browseArea: 'koshinetsu',
    order: 15,
  },
  {
    key: 'nagano',
    name: { zhTw: '長野縣', ja: '長野県', en: 'Nagano' },
    description: '日本阿爾卑斯、白馬、志賀高原與溫泉鄉構成高山度假核心，雪場密度高、自然景觀壯闊。',
    region: 'kanto-koshinetsu',
    browseArea: 'koshinetsu',
    order: 16,
  },
  {
    key: 'niigata',
    name: { zhTw: '新潟縣', ja: '新潟県', en: 'Niigata' },
    description: '以深雪、稻米、清酒與越後湯澤、妙高等山區聞名，適合滑雪、溫泉與地方美食。',
    region: 'kanto-koshinetsu',
    browseArea: 'koshinetsu',
    order: 17,
  },
  {
    key: 'toyama',
    name: { zhTw: '富山縣', ja: '富山県', en: 'Toyama' },
    description: '立山黑部、黑部峽谷、五箇山合掌村與富山灣海鮮，構成山海兼具的旅遊印象。',
    region: 'hokuriku',
    browseArea: 'hokuriku',
    order: 18,
  },
  {
    key: 'ishikawa',
    name: { zhTw: '石川縣', ja: '石川県', en: 'Ishikawa' },
    description: '金澤傳統工藝、兼六園、能登半島與加賀溫泉交織，適合文化、海景與溫泉旅行。',
    region: 'hokuriku',
    browseArea: 'hokuriku',
    order: 19,
  },
  {
    key: 'fukui',
    name: { zhTw: '福井縣', ja: '福井県', en: 'Fukui' },
    description: '恐龍博物館、永平寺、東尋坊與越前海岸是代表，兼具歷史、地質景觀與海味。',
    region: 'hokuriku',
    browseArea: 'hokuriku',
    order: 20,
  },
  {
    key: 'gifu',
    name: { zhTw: '岐阜縣', ja: '岐阜県', en: 'Gifu' },
    description: '白川鄉、飛驒高山、下呂溫泉與奧美濃雪場群，山村文化、溫泉與滑雪都具代表性。',
    region: 'chubu',
    browseArea: 'tokai',
    order: 21,
  },
  {
    key: 'shizuoka',
    name: { zhTw: '靜岡縣', ja: '静岡県', en: 'Shizuoka' },
    description: '富士山、伊豆半島、茶園與海岸景觀是主軸，能安排溫泉、海鮮與山海風景。',
    region: 'chubu',
    browseArea: 'tokai',
    order: 22,
  },
  {
    key: 'aichi',
    name: { zhTw: '愛知縣', ja: '愛知県', en: 'Aichi' },
    description: '名古屋城、產業文化、熱田神宮與三河灣周邊景點多，城市、美食與歷史兼具。',
    region: 'chubu',
    browseArea: 'tokai',
    order: 23,
  },
  {
    key: 'mie',
    name: { zhTw: '三重縣', ja: '三重県', en: 'Mie' },
    description: '伊勢神宮、熊野古道、珍珠與海岸景觀聞名，適合神社文化、海味與自然步道。',
    region: 'chubu',
    browseArea: 'tokai',
    order: 24,
  },
  {
    key: 'shiga',
    name: { zhTw: '滋賀縣', ja: '滋賀県', en: 'Shiga' },
    description: '琵琶湖是核心景觀，彥根城、湖畔活動與比良山系讓歷史與自然距離很近。',
    region: 'kansai-chugoku',
    browseArea: 'kansai',
    order: 25,
  },
  {
    key: 'kyoto',
    name: { zhTw: '京都府', ja: '京都府', en: 'Kyoto' },
    description: '古都寺社、傳統街町、丹後海岸與山里風景交織，四季文化體驗密度高。',
    region: 'kansai-chugoku',
    browseArea: 'kansai',
    order: 26,
  },
  {
    key: 'osaka',
    name: { zhTw: '大阪府', ja: '大阪府', en: 'Osaka' },
    description: '美食、購物、娛樂與歷史景點集中，從城郭到街區文化都展現關西活力。',
    region: 'kansai-chugoku',
    browseArea: 'kansai',
    order: 27,
  },
  {
    key: 'hyogo',
    name: { zhTw: '兵庫縣', ja: '兵庫県', en: 'Hyogo' },
    description: '神戶港灣、姬路城、有馬溫泉、城崎溫泉與北部山區，城市、歷史與雪國風情並存。',
    region: 'kansai-chugoku',
    browseArea: 'kansai',
    order: 28,
  },
  {
    key: 'nara',
    name: { zhTw: '奈良縣', ja: '奈良県', en: 'Nara' },
    description: '古都寺社、世界遺產、奈良公園與吉野山，構成歷史深度濃厚的文化旅行地。',
    region: 'kansai-chugoku',
    browseArea: 'kansai',
    order: 29,
  },
  {
    key: 'wakayama',
    name: { zhTw: '和歌山縣', ja: '和歌山県', en: 'Wakayama' },
    description: '高野山、熊野古道、白濱溫泉與海岸景觀是重點，適合信仰文化、溫泉與自然旅行。',
    region: 'kansai-chugoku',
    browseArea: 'kansai',
    order: 30,
  },
  {
    key: 'tottori',
    name: { zhTw: '鳥取縣', ja: '鳥取県', en: 'Tottori' },
    description: '鳥取砂丘、大山、浦富海岸與溫泉鄉是主軸，山海景觀鮮明且步調悠閒。',
    region: 'kansai-chugoku',
    browseArea: 'chugoku-shikoku',
    order: 31,
  },
  {
    key: 'shimane',
    name: { zhTw: '島根縣', ja: '島根県', en: 'Shimane' },
    description: '出雲大社、松江城、足立美術館與石見銀山，串起神話、庭園、城下町與世界遺產。',
    region: 'kansai-chugoku',
    browseArea: 'chugoku-shikoku',
    order: 32,
  },
  {
    key: 'okayama',
    name: { zhTw: '岡山縣', ja: '岡山県', en: 'Okayama' },
    description: '岡山後樂園、倉敷美觀地區、瀨戶內海島景與水果特產，適合文化散策與美食。',
    region: 'kansai-chugoku',
    browseArea: 'chugoku-shikoku',
    order: 33,
  },
  {
    key: 'hiroshima',
    name: { zhTw: '廣島縣', ja: '広島県', en: 'Hiroshima' },
    description: '嚴島神社、和平紀念公園、尾道與瀨戶內海群島並列，歷史記憶與海島風景深刻。',
    region: 'kansai-chugoku',
    browseArea: 'chugoku-shikoku',
    order: 34,
  },
  {
    key: 'yamaguchi',
    name: { zhTw: '山口縣', ja: '山口県', en: 'Yamaguchi' },
    description: '秋吉台、萩城下町、錦帶橋與瀨戶內、山陰海岸景觀多元，歷史與自然都鮮明。',
    region: 'kansai-chugoku',
    browseArea: 'chugoku-shikoku',
    order: 35,
  },
  {
    key: 'tokushima',
    name: { zhTw: '德島縣', ja: '徳島県', en: 'Tokushima' },
    description: '阿波舞、祖谷溪谷、鳴門漩渦與山村秘境是特色，適合祭典、峽谷與海岸景觀。',
    region: 'kansai-chugoku',
    browseArea: 'chugoku-shikoku',
    order: 36,
  },
  {
    key: 'kagawa',
    name: { zhTw: '香川縣', ja: '香川県', en: 'Kagawa' },
    description: '瀨戶內海島嶼藝術、栗林公園、金刀比羅宮與烏龍麵文化，適合慢遊與美食。',
    region: 'kansai-chugoku',
    browseArea: 'chugoku-shikoku',
    order: 37,
  },
  {
    key: 'ehime',
    name: { zhTw: '愛媛縣', ja: '愛媛県', en: 'Ehime' },
    description: '道後溫泉、松山城、瀨戶內島景與柑橘文化，兼具城下町、溫泉與海風。',
    region: 'kansai-chugoku',
    browseArea: 'chugoku-shikoku',
    order: 38,
  },
  {
    key: 'kochi',
    name: { zhTw: '高知縣', ja: '高知県', en: 'Kochi' },
    description: '四萬十川、桂濱、足摺岬與鰹魚文化鮮明，自然尺度開闊、海岸風景強烈。',
    region: 'kansai-chugoku',
    browseArea: 'chugoku-shikoku',
    order: 39,
  },
  {
    key: 'fukuoka',
    name: { zhTw: '福岡縣', ja: '福岡県', en: 'Fukuoka' },
    description: '博多美食、太宰府、屋台文化與海港城市風貌集中，融合九州城市活力與地方風情。',
    region: 'kyushu',
    browseArea: 'kyushu',
    order: 40,
  },
  {
    key: 'saga',
    name: { zhTw: '佐賀縣', ja: '佐賀県', en: 'Saga' },
    description: '有田燒、唐津、嬉野溫泉與玄界灘海味是特色，步調安靜、工藝與溫泉感強。',
    region: 'kyushu',
    browseArea: 'kyushu',
    order: 41,
  },
  {
    key: 'nagasaki',
    name: { zhTw: '長崎縣', ja: '長崎県', en: 'Nagasaki' },
    description: '港町異國文化、軍艦島、五島列島與夜景聞名，歷史層次與海島風景鮮明。',
    region: 'kyushu',
    browseArea: 'kyushu',
    order: 42,
  },
  {
    key: 'kumamoto',
    name: { zhTw: '熊本縣', ja: '熊本県', en: 'Kumamoto' },
    description: '熊本城、阿蘇火山、黑川溫泉與天草海景代表性強，火山地形與溫泉資源豐富。',
    region: 'kyushu',
    browseArea: 'kyushu',
    order: 43,
  },
  {
    key: 'oita',
    name: { zhTw: '大分縣', ja: '大分県', en: 'Oita' },
    description: '別府、由布院溫泉與九重山群是核心，溫泉文化深厚，也適合高原與自然散策。',
    region: 'kyushu',
    browseArea: 'kyushu',
    order: 44,
  },
  {
    key: 'miyazaki',
    name: { zhTw: '宮崎縣', ja: '宮崎県', en: 'Miyazaki' },
    description: '高千穗峽、日南海岸、神話舞台與南國海景是亮點，適合自然與神社文化旅行。',
    region: 'kyushu',
    browseArea: 'kyushu',
    order: 45,
  },
  {
    key: 'kagoshima',
    name: { zhTw: '鹿兒島縣', ja: '鹿児島県', en: 'Kagoshima' },
    description: '櫻島、霧島、指宿砂浴與屋久島自然聞名，火山地形、溫泉與離島景觀鮮明。',
    region: 'kyushu',
    browseArea: 'kyushu',
    order: 46,
  },
  {
    key: 'okinawa',
    name: { zhTw: '沖繩縣', ja: '沖縄県', en: 'Okinawa' },
    description: '珊瑚海、琉球王國文化、離島與亞熱帶自然是主軸，適合海洋活動與慢節奏旅行。',
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
