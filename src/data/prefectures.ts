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
    description:
      '北海道幅員遼闊，從札幌、小樽到富良野、美瑛、知床與釧路濕原，都能感受大自然尺度。冬季以二世谷、留壽都、富良野等粉雪雪場最具代表，夏季可賞花田、湖泊與國家公園，秋季有大雪山紅葉。海鮮、乳製品、拉麵、成吉思汗烤肉與在地甜點，讓滑雪以外的食旅體驗也很完整。無論初次訪日或深度停留，都能找到截然不同的季節表情。',
    region: 'hokkaido',
    browseArea: 'hokkaido',
    order: 1,
  },
  {
    key: 'aomori',
    name: { zhTw: '青森縣', ja: '青森県', en: 'Aomori' },
    description:
      '青森縣位在本州最北端，冬季豪雪、夏季睡魔祭與海峽文化都很鮮明。八甲田山、奧入瀨溪流、十和田湖與白神山地展現原始森林、樹冰與溪谷景觀，弘前城的櫻花與蘋果產地形象也深植人心。旅行可結合溫泉、雪景散策、津輕三味線、海鮮丼、蘋果甜點與鄉土料理，感受東北粗獷又溫暖的氛圍。適合喜歡雪國、祭典與森林景觀的旅人，也適合慢慢深入探索。',
    region: 'tohoku',
    browseArea: 'tohoku',
    order: 2,
  },
  {
    key: 'iwate',
    name: { zhTw: '岩手縣', ja: '岩手県', en: 'Iwate' },
    description:
      '岩手縣面積廣闊，兼具三陸海岸、北上山地與奧羽山脈的自然尺度。八幡平、安比高原、雫石等地適合滑雪與溫泉，龍泉洞、中尊寺、毛越寺、遠野民話之鄉則展現地質、歷史與民俗層次。沿海可感受震災復興後的海景與漁港風味，飲食以盛岡冷麵、碗子蕎麥麵、前澤牛、南部鐵器與在地清酒最具記憶點。整體節奏開闊，適合慢慢深入東北腹地。',
    region: 'tohoku',
    browseArea: 'tohoku',
    order: 3,
  },
  {
    key: 'miyagi',
    name: { zhTw: '宮城縣', ja: '宮城県', en: 'Miyagi' },
    description:
      '宮城縣以仙台為核心，結合城下町文化、海灣景觀與山區溫泉。松島群島是日本三景之一，藏王連峰可欣賞樹冰與冬季雪景，秋保、作並、鳴子等溫泉鄉適合放慢步調；瑞鳳殿、青葉城跡與仙台七夕展現伊達文化。美食有牛舌、毛豆麻糬、牡蠣、魚板與海鮮，能把城市散策、自然風景和東北味覺安排在一起。第一次認識東北時，也很適合作為文化與美食起點。',
    region: 'tohoku',
    browseArea: 'tohoku',
    order: 4,
  },
  {
    key: 'akita',
    name: { zhTw: '秋田縣', ja: '秋田県', en: 'Akita' },
    description:
      '秋田縣位在日本海側，豪雪、溫泉與傳統祭典構成鮮明印象。乳頭溫泉鄉、田澤湖、角館武家屋敷、男鹿半島與白神山地，都能感受山湖、海岸與歷史街區的層次；冬季可欣賞雪景、樹冰與橫手雪屋祭。地方風味包含米棒鍋、稻庭烏龍麵、比內地雞、秋田米與日本酒，適合喜歡安靜自然與東北文化的旅人。整體氛圍質樸，適合慢慢體會雪國生活。',
    region: 'tohoku',
    browseArea: 'tohoku',
    order: 5,
  },
  {
    key: 'yamagata',
    name: { zhTw: '山形縣', ja: '山形県', en: 'Yamagata' },
    description:
      '山形縣被群山環抱，藏王樹冰、銀山溫泉與出羽三山是最具代表的景觀與信仰場域。冬季可在藏王溫泉滑雪並欣賞雪怪，春夏秋則適合走訪山寺、最上川、鶴岡與酒田的歷史街區。櫻桃、米澤牛、芋煮、蕎麥麵與地方清酒讓食旅很有深度，從雪景、溫泉到山岳信仰，都能感受東北內陸的厚實魅力。旅程節奏安靜，適合安排多日深度停留。細細探索。',
    region: 'tohoku',
    browseArea: 'tohoku',
    order: 6,
  },
  {
    key: 'fukushima',
    name: { zhTw: '福島縣', ja: '福島県', en: 'Fukushima' },
    description:
      '福島縣橫跨會津、中通與濱通，從磐梯山、豬苗代湖到只見川與太平洋海岸，景觀變化很大。會津若松城、大內宿、喜多方與裏磐梯呈現武家歷史、宿場風情、湖沼與雪國風景，冬季也能安排滑雪與溫泉。美食包含喜多方拉麵、會津醬汁豬排飯、桃子、清酒與鄉土點心，適合自然、歷史與慢食並重的旅程。不同區域個性鮮明，適合反覆探索。',
    region: 'tohoku',
    browseArea: 'tohoku',
    order: 7,
  },
  {
    key: 'ibaraki',
    name: { zhTw: '茨城縣', ja: '茨城県', en: 'Ibaraki' },
    description:
      '茨城縣位在關東東北側，兼具太平洋海岸、筑波山與農業風景。國營常陸海濱公園的粉蝶花與掃帚草、偕樂園梅花、袋田瀑布與霞浦湖，展現四季分明的自然景觀；鹿島神宮、笠間陶藝與水戶德川文化則帶來歷史層次。飲食可品嚐納豆、常陸牛、鮟鱇鍋、栗子、地瓜與海鮮，適合輕鬆的花景與食旅。節奏比都會更舒緩，適合安排一日到多日小旅行。',
    region: 'kanto-koshinetsu',
    browseArea: 'kanto',
    order: 8,
  },
  {
    key: 'tochigi',
    name: { zhTw: '栃木縣', ja: '栃木県', en: 'Tochigi' },
    description:
      '栃木縣位在關東北部，日光的世界遺產社寺、華嚴瀑布、中禪寺湖與鬼怒川溫泉，是自然與歷史交會的核心。那須高原、鹽原溫泉、奧日光濕原與雪季山景，適合森林散策、泡湯與親子度假；足利花卉公園則以紫藤聞名。美食有宇都宮餃子、草莓、湯波、和牛與高原乳製品，旅遊節奏可從文化巡禮延伸到山區放鬆。也很適合初次接觸關東山區。',
    region: 'kanto-koshinetsu',
    browseArea: 'kanto',
    order: 9,
  },
  {
    key: 'gunma',
    name: { zhTw: '群馬縣', ja: '群馬県', en: 'Gunma' },
    description:
      '群馬縣位在關東山地，草津、伊香保、四萬與水上等溫泉鄉相當有名，也擁有谷川岳、尾瀨、赤城山與榛名山等自然景觀。冬季可安排滑雪、雪景與泡湯，夏秋則適合濕原健行、溪谷散策與賞紅葉；富岡製絲廠展現近代產業史。地方風味包含水澤烏龍麵、下仁田蔥、蒟蒻、峠之釜飯與高原蔬果，適合山岳溫泉旅行。一年四季都有泡湯與戶外魅力。',
    region: 'kanto-koshinetsu',
    browseArea: 'kanto',
    order: 10,
  },
  {
    key: 'saitama',
    name: { zhTw: '埼玉縣', ja: '埼玉県', en: 'Saitama' },
    description:
      '埼玉縣位在東京近郊，卻保留川越小江戶街景、秩父山地與長瀞溪谷等多樣面貌。春季可賞櫻與芝櫻，夏季有祭典與河川活動，秋冬則適合走訪三峯神社、冰柱景觀與溫泉；盆栽村、岩槻人偶與秩父夜祭也具地方特色。美食包含草加煎餅、鰻魚、秩父蕎麥麵、味噌馬鈴薯與地方酒，適合城市近郊慢旅行。從街區到山谷的距離感很迷人。層次豐富。',
    region: 'kanto-koshinetsu',
    browseArea: 'kanto',
    order: 11,
  },
  {
    key: 'chiba',
    name: { zhTw: '千葉縣', ja: '千葉県', en: 'Chiba' },
    description:
      '千葉縣三面臨海，從房總半島、九十九里濱到鴨川與銚子，可感受太平洋海岸、花田與漁港風情。成田山新勝寺、佐原古街、鋸山、東京灣沿岸與主題樂園，讓歷史散策、海景與家庭旅行都能安排；春季油菜花、夏季海灘、冬季溫暖花卉是特色。飲食以落花生、海鮮、醬油、枇杷與在地蔬果最具代表性。適合想在海邊放鬆又保留城市便利的旅人。',
    region: 'kanto-koshinetsu',
    browseArea: 'kanto',
    order: 12,
  },
  {
    key: 'tokyo',
    name: { zhTw: '東京都', ja: '東京都', en: 'Tokyo' },
    description:
      '東京都不只有新宿、澀谷、銀座與淺草等都會景點，也保留上野博物館群、皇居周邊、下町商店街與多摩自然。高尾山、奧多摩與伊豆・小笠原群島展現山林、溪谷與海島風景，讓城市旅行延伸出戶外層次。飲食從壽司、天婦羅、蕎麥麵、拉麵到甜點與咖啡文化都選擇豐富，適合結合藝術、購物、歷史與日常散策。每個街區都有截然不同的節奏。',
    region: 'kanto-koshinetsu',
    browseArea: 'kanto',
    order: 13,
  },
  {
    key: 'kanagawa',
    name: { zhTw: '神奈川縣', ja: '神奈川県', en: 'Kanagawa' },
    description:
      '神奈川縣緊鄰東京，橫濱港灣、鎌倉古寺、江之島海岸與箱根溫泉，構成多層次的旅行印象。箱根可欣賞富士山、湖景、美術館與溫泉，鎌倉與湘南則適合寺社散策、海景與咖啡小店；橫濱融合近代建築、夜景與中華街。地方風味包含海鮮、鎌倉蔬菜、箱根蕎麥麵、崎陽軒燒賣與港町甜點，適合文化與海山風景並重。很適合短途或多日慢遊。',
    region: 'kanto-koshinetsu',
    browseArea: 'kanto',
    order: 14,
  },
  {
    key: 'yamanashi',
    name: { zhTw: '山梨縣', ja: '山梨県', en: 'Yamanashi' },
    description:
      '山梨縣位在富士山北側，富士五湖、忍野八海、昇仙峽與八岳山麓展現山岳、湖泊與溪谷風景。春季可賞櫻與桃花，夏秋適合露營、健行、葡萄園與紅葉，冬季則能欣賞清澈富士山景與雪場活動；甲府與武田氏史跡帶來歷史深度。美食以葡萄、桃子、葡萄酒、餺飥鍋、信玄餅與高原蔬果最具地方特色。適合喜歡山景、果園與戶外活動的旅人。',
    region: 'kanto-koshinetsu',
    browseArea: 'koshinetsu',
    order: 15,
  },
  {
    key: 'nagano',
    name: { zhTw: '長野縣', ja: '長野県', en: 'Nagano' },
    description:
      '長野縣位在日本阿爾卑斯山脈環抱的高地，是冬奧舉辦地，也是滑雪與雪板重鎮。白馬、志賀高原、野澤溫泉等雪場各有壯闊山景、粉雪與溫泉村氛圍；雪季之外，還能串聯松本城、善光寺、妻籠宿、奈良井宿、上高地與地獄谷雪猴。四季皆適合登山、單車、森林散策與泡湯，也能品嚮信州蕎麥、蘋果、山葵、高原蔬菜、味噌與清酒等地方風味。',
    region: 'kanto-koshinetsu',
    browseArea: 'koshinetsu',
    order: 16,
  },
  {
    key: 'niigata',
    name: { zhTw: '新潟縣', ja: '新潟県', en: 'Niigata' },
    description:
      '新潟縣面向日本海，是雪上運動、稻米與清酒的代表地。越後湯澤、苗場、妙高等雪場擁有豐富積雪，雪季之外可走訪星峠梯田、佐渡島、海岸沙灘與溫泉鄉；長岡煙火、高田城賞櫻、十日町雪祭也展現四季魅力。從豪雪山區到離島海景落差鮮明，適合把滑雪、泡湯、自然與食旅安排在同一趟行程。美食則以越光米、海鮮、清酒、笹團子、木盒蕎麥麵與柿種最具地方記憶。',
    region: 'kanto-koshinetsu',
    browseArea: 'koshinetsu',
    order: 17,
  },
  {
    key: 'toyama',
    name: { zhTw: '富山縣', ja: '富山県', en: 'Toyama' },
    description:
      '富山縣位在立山連峰與富山灣之間，是山海景觀濃縮的北陸秘境。五箇山合掌聚落在雪中格外靜謐，立山黑部、雪之大谷、黑部水壩與黑部峽谷適合賞雪、健行與泡湯；富山市、高岡與礪波展現玻璃、銅器、漆器與鬱金香文化。冬春雪壁、夏秋山色與峽谷楓紅都鮮明，適合慢慢安排山岳與城市工藝旅行。飲食可品嚐富山灣海鮮、螢魷、白蝦、鱒魚壽司與在地清酒。',
    region: 'hokuriku',
    browseArea: 'hokuriku',
    order: 18,
  },
  {
    key: 'ishikawa',
    name: { zhTw: '石川縣', ja: '石川県', en: 'Ishikawa' },
    description:
      '石川縣夾在日本海與白山群峰之間，兼具金澤城下町文化、能登半島海景與加賀溫泉鄉。金澤保存茶屋街、武家屋敷、兼六園、近江町市場與 21 世紀美術館，傳統工藝如金箔、輪島漆器、九谷燒、加賀友禪與現代藝術並存。旅程可延伸至白山自然景觀、能登海岸、山中溫泉與和倉溫泉，從城市散策到海岸景觀都很有層次，並能品嚐海鮮、加賀野菜、治部煮與蕪菁壽司。',
    region: 'hokuriku',
    browseArea: 'hokuriku',
    order: 19,
  },
  {
    key: 'fukui',
    name: { zhTw: '福井縣', ja: '福井県', en: 'Fukui' },
    description:
      '福井縣面向日本海，結合海岸奇景、禪寺古城、恐龍化石與越前工藝。東尋坊柱狀岩海岸展現壯闊地質景觀，永平寺保留深山禪修氛圍，丸岡城、一乘谷朝倉氏遺跡與越前大野城串起歷史層次；恐龍博物館則是親子與自然科學亮點。加上若狹灣海景、越前海岸夕陽、溫泉與滑雪，能安排成自然、文化和美食並重的慢旅行。美食以越前蟹、甘蝦、越前蕎麥麵、若狹塗筷與越前燒最具代表。',
    region: 'hokuriku',
    browseArea: 'hokuriku',
    order: 20,
  },
  {
    key: 'gifu',
    name: { zhTw: '岐阜縣', ja: '岐阜県', en: 'Gifu' },
    description:
      '岐阜縣位在日本中部內陸，北部有飛驒山脈與白川鄉合掌聚落，南部則有長良川與城下町文化。高山古街、下呂溫泉、郡上八幡、奧飛驒溫泉鄉與新穗高山景，串起山村、溫泉與傳統工藝；冬季可欣賞雪中合掌村與高原雪場。美食包含飛驒牛、朴葉味噌、栗金團、鵜飼文化與清流鮎魚，適合山岳慢旅。每到雪季與紅葉季，山村景色特別迷人。',
    region: 'chubu',
    browseArea: 'tokai',
    order: 21,
  },
  {
    key: 'shizuoka',
    name: { zhTw: '靜岡縣', ja: '静岡県', en: 'Shizuoka' },
    description:
      '靜岡縣位在富士山南側，從伊豆半島、駿河灣到濱名湖，山海景觀都很鮮明。富士山眺望、三保松原、修善寺溫泉、熱海、下田與茶園風景，讓溫泉、海岸散策和自然體驗都容易串聯；春季河津櫻與四季花景也很有名。飲食以靜岡茶、櫻花蝦、鰻魚、海鮮丼、黑輪與蜜柑代表地方風味。從海鮮、茶香到富士山視野，整體印象清爽明亮。很耐探索。',
    region: 'chubu',
    browseArea: 'tokai',
    order: 22,
  },
  {
    key: 'aichi',
    name: { zhTw: '愛知縣', ja: '愛知県', en: 'Aichi' },
    description:
      '愛知縣以名古屋為核心，兼具戰國歷史、製造業文化與海灣風景。名古屋城、德川美術館、犬山城、熱田神宮與有松鳴海絞，展現城下町、武家文化與傳統工藝；知多半島、三河灣與香嵐溪則帶來海景、島嶼與紅葉。美食有味噌豬排、鰻魚飯三吃、手羽先、味噌煮込み烏龍麵、台灣拉麵與茶點文化，城市旅行層次豐富。很適合城市文化與美食探索。',
    region: 'chubu',
    browseArea: 'tokai',
    order: 23,
  },
  {
    key: 'mie',
    name: { zhTw: '三重縣', ja: '三重県', en: 'Mie' },
    description:
      '三重縣位在紀伊半島東側，以伊勢神宮、熊野古道伊勢路與英虞灣海景最具代表。鳥羽、志摩與賢島展現海女文化、珍珠與島灣風景，長島溫泉、鈴鹿、赤目四十八瀑布與御在所岳則提供溫泉、自然與冬季雪景；伊賀上野也保留忍者與城下町印象。飲食包含松阪牛、伊勢烏龍麵、赤福、伊勢龍蝦、牡蠣與海鮮，適合神宮參拜與海山慢旅。節奏沉穩。',
    region: 'chubu',
    browseArea: 'tokai',
    order: 24,
  },
  {
    key: 'shiga',
    name: { zhTw: '滋賀縣', ja: '滋賀県', en: 'Shiga' },
    description:
      '滋賀縣圍繞日本最大湖泊琵琶湖，兼具水岸風景、歷史古城與山區自然。彥根城、近江八幡、比叡山延曆寺、長濱與白鬚神社，呈現湖國文化、商人町與信仰歷史；冬季可在琵琶湖周邊雪場欣賞湖景，春夏秋則適合湖畔散策、花景與紅葉。美食有近江牛、鮒壽司、湖魚料理、赤蒟蒻與在地甜點，適合安靜的關西深度旅行。湖畔四季變化也十分耐看。',
    region: 'kansai-chugoku',
    browseArea: 'kansai',
    order: 25,
  },
  {
    key: 'kyoto',
    name: { zhTw: '京都府', ja: '京都府', en: 'Kyoto' },
    description:
      '京都府不只京都市的寺院、庭園與町家街景，北部丹後半島、天橋立、美山茅葺聚落與伊根舟屋，也展現海岸與山村風情。清水寺、金閣寺、嵐山、伏見稻荷與宇治茶文化是經典，四季櫻花、紅葉、雪景與祭典都很鮮明。飲食可品嚗京料理、湯豆腐、抹茶甜點、鯖壽司與伏見清酒，適合慢慢體會傳統與日常細節。從市區到海岸都能延伸出不同旅行節奏。',
    region: 'kansai-chugoku',
    browseArea: 'kansai',
    order: 26,
  },
  {
    key: 'osaka',
    name: { zhTw: '大阪府', ja: '大阪府', en: 'Osaka' },
    description:
      '大阪府以熱鬧城市、美食與商人文化聞名，也有大阪城、中之島近代建築、四天王寺、住吉大社與堺市古墳群等歷史層次。道頓堀、新世界、黑門市場與梅田夜景呈現活潑街區感，北攝山區與大阪灣沿岸則適合安排自然與親子行程。美食包含章魚燒、大阪燒、串炸、箱壽司、烏龍麵與甜點，適合城市散策、購物與庶民風味探索。夜間氛圍也很迷人。',
    region: 'kansai-chugoku',
    browseArea: 'kansai',
    order: 27,
  },
  {
    key: 'hyogo',
    name: { zhTw: '兵庫縣', ja: '兵庫県', en: 'Hyogo' },
    description:
      '兵庫縣橫跨瀨戶內海與日本海，神戶港灣、姬路城、有馬溫泉、城崎溫泉與但馬高原構成多樣旅行版圖。南部可感受異人館、夜景與灘五鄉清酒文化，中部有丹波篠山古街，北部則適合溫泉、雪場與海岸景觀；姬路城與竹田城跡展現歷史名城魅力。飲食包含神戶牛、明石燒、松葉蟹、丹波黑豆、牡蠣與日本酒，山海味覺完整。適合一次感受關西的港町與雪國面貌。',
    region: 'kansai-chugoku',
    browseArea: 'kansai',
    order: 28,
  },
  {
    key: 'nara',
    name: { zhTw: '奈良縣', ja: '奈良県', en: 'Nara' },
    description:
      '奈良縣是日本古都文化的重要舞台，東大寺、春日大社、興福寺、法隆寺與奈良公園，串起佛教藝術、鹿群與古代都城記憶。吉野山櫻花、飛鳥村、山邊之道、室生寺與曽爾高原，展現山林、農村與古道風景；秋冬的寺院與山谷景色也很有靜謐感。美食包含柿葉壽司、三輪素麵、奈良漬、葛餅與茶粥，適合文化深度旅行。步調安靜，適合放慢欣賞細節。',
    region: 'kansai-chugoku',
    browseArea: 'kansai',
    order: 29,
  },
  {
    key: 'wakayama',
    name: { zhTw: '和歌山縣', ja: '和歌山県', en: 'Wakayama' },
    description:
      '和歌山縣位在紀伊半島南部，熊野古道、高野山、那智瀑布與白濱溫泉，是信仰、海岸與山林交會的代表。紀伊山地的參拜道、溫泉鄉與太平洋海景，讓健行、泡湯與自然巡禮很有層次；友島、串本與勝浦也各有海島與漁港魅力。美食包含紀州梅、鮪魚、柑橘、和歌山拉麵、柿葉壽司與高野豆腐，適合安排慢步調的海山旅行。整體氛圍帶有濃厚修行與海港氣息。',
    region: 'kansai-chugoku',
    browseArea: 'kansai',
    order: 30,
  },
  {
    key: 'tottori',
    name: { zhTw: '鳥取縣', ja: '鳥取県', en: 'Tottori' },
    description:
      '鳥取縣人口不多，卻有鳥取砂丘、大山、浦富海岸與三朝溫泉等鮮明景觀。大山周邊可滑雪、健行與賞紅葉，砂丘與海岸則展現日本少見的沙地與岩岸風景；倉吉白壁土藏群、境港妖怪文化與投入堂，也讓歷史與民俗更有記憶點。飲食以松葉蟹、二十世紀梨、牛骨拉麵、白魷、砂丘蔥與乳製品最具代表。整體旅遊密度舒適，適合喜歡開闊自然的旅人。',
    region: 'kansai-chugoku',
    browseArea: 'chugoku-shikoku',
    order: 31,
  },
  {
    key: 'shimane',
    name: { zhTw: '島根縣', ja: '島根県', en: 'Shimane' },
    description:
      '島根縣面向日本海，以出雲大社、石見銀山、松江城與隱岐群島聞名，神話、歷史與海岸自然交織。宍道湖夕陽、足立美術館庭園、玉造溫泉、津和野街區與石州瓦聚落，呈現安靜而深厚的地方氣質；海岸與離島也適合慢慢欣賞地質景觀。美食包含出雲蕎麥麵、蜆湯、松葉蟹、和菓子、島根牛與在地清酒，適合深度文化旅。步調安穩，餘韻很長。',
    region: 'kansai-chugoku',
    browseArea: 'chugoku-shikoku',
    order: 32,
  },
  {
    key: 'okayama',
    name: { zhTw: '岡山縣', ja: '岡山県', en: 'Okayama' },
    description:
      '岡山縣有晴天之國的形象，後樂園、岡山城、倉敷美觀地區與吉備路古墳群展現歷史與街區風景。北部蒜山高原、湯原溫泉、奧津溫泉與森林溪谷，適合自然散策與溫泉；桃太郎傳說、備前燒與牛仔布產業也很具地方特色。美食包含白桃、麝香葡萄、祭壽司、津山荷爾蒙烏龍麵、牡蠣與高原乳製品，適合城市與鄉間並行的旅行。氣候印象明亮，旅行節奏舒適。',
    region: 'kansai-chugoku',
    browseArea: 'chugoku-shikoku',
    order: 33,
  },
  {
    key: 'hiroshima',
    name: { zhTw: '廣島縣', ja: '広島県', en: 'Hiroshima' },
    description:
      '廣島縣兼具和平記憶、瀨戶內海島嶼與歷史城下町。廣島和平紀念園區、宮島嚴島神社、尾道坡道街景、鞆之浦與瀨戶內島波海景，呈現城市、海島、寺社與港町風情；秋季紅葉谷與島嶼夕景特別迷人。飲食包含廣島燒、牡蠣、檸檬、穴子飯、尾道拉麵與在地清酒，能把文化反思、海景散策與美食安排在一趟旅程。海島與城市之間的反差很迷人。',
    region: 'kansai-chugoku',
    browseArea: 'chugoku-shikoku',
    order: 34,
  },
  {
    key: 'yamaguchi',
    name: { zhTw: '山口縣', ja: '山口県', en: 'Yamaguchi' },
    description:
      '山口縣位在本州西端，萩城下町、錦帶橋、秋吉台與角島海景，展現歷史、地質與海岸風光。下關可感受關門海峽與河豚文化，長門、湯田與川棚等溫泉地則適合放慢步調；元乃隅神社、瑠璃光寺五重塔與秋芳洞也很具代表性。美食包含河豚、瓦片蕎麥麵、夏蜜柑、海鮮、外郎與地酒，適合文化與自然並重的旅程。整體比熱門城市安靜，更適合慢慢探訪。',
    region: 'kansai-chugoku',
    browseArea: 'chugoku-shikoku',
    order: 35,
  },
  {
    key: 'tokushima',
    name: { zhTw: '德島縣', ja: '徳島県', en: 'Tokushima' },
    description:
      '德島縣位在四國東部，以阿波舞、鳴門渦潮與祖谷溪谷最具代表。劍山、祖谷蔓橋、大步危小步危與吉野川展現深山溪谷景觀，海岸則有衝浪與海龜產卵地等自然特色；遍路文化也讓寺院巡禮充滿地方韻味。美食包含德島拉麵、阿波尾雞、鳴門金時地瓜、酢橘、半田素麵與海鮮，適合山谷探訪與節慶旅行。整體帶有四國山海交界的野性魅力。',
    region: 'kansai-chugoku',
    browseArea: 'chugoku-shikoku',
    order: 36,
  },
  {
    key: 'kagawa',
    name: { zhTw: '香川縣', ja: '香川県', en: 'Kagawa' },
    description:
      '香川縣是日本面積最小的縣，卻濃縮瀨戶內海島嶼、藝術與烏龍麵文化。高松栗林公園、金刀比羅宮、小豆島、直島與豐島展現庭園、信仰、海景與當代藝術；瀨戶內溫和氣候也適合花景與島嶼散策。美食以讚岐烏龍麵為代表，還有橄欖牛、骨付鳥、和三盆、醬油與海鮮，適合把藝術、海島和日常飲食排成輕盈旅程。短時間也能感受瀨戶內的精緻感。',
    region: 'kansai-chugoku',
    browseArea: 'chugoku-shikoku',
    order: 37,
  },
  {
    key: 'ehime',
    name: { zhTw: '愛媛縣', ja: '愛媛県', en: 'Ehime' },
    description:
      '愛媛縣位在四國西北側，道後溫泉、松山城、內子町與瀨戶內海島嶼是代表亮點。松山保留文學與城下町氛圍，宇和島、八幡濱與今治則呈現海港、島嶼與工藝文化；石鎚山一帶也適合山岳自然與秋季紅葉。美食包含蜜柑、鯛魚飯、炸魚餅、今治燒鳥、柑橘甜點與海鮮，能感受溫泉、海景與四國生活感。步調親切，很適合溫泉、城下町與島嶼慢旅行。',
    region: 'kansai-chugoku',
    browseArea: 'chugoku-shikoku',
    order: 38,
  },
  {
    key: 'kochi',
    name: { zhTw: '高知縣', ja: '高知県', en: 'Kochi' },
    description:
      '高知縣面向太平洋，以桂濱、四萬十川、足摺岬與室戶岬展現奔放自然。高知城、日曜市、龍馬文化與遍路寺院帶來歷史和庶民生活感，仁淀川藍色溪流、山林溪谷與海岸景觀則適合戶外散策；夏季祭典也很熱鬧。飲食以鰹魚半敲燒、皿鉢料理、柚子、土佐酒、文旦與河川海鮮最具代表，風格豪爽而鮮明。適合喜歡開闊海岸、河川與地方市場的旅人。',
    region: 'kansai-chugoku',
    browseArea: 'chugoku-shikoku',
    order: 39,
  },
  {
    key: 'fukuoka',
    name: { zhTw: '福岡縣', ja: '福岡県', en: 'Fukuoka' },
    description:
      '福岡縣是九州北部門戶，福岡市的屋台、小倉城、太宰府天滿宮、柳川水鄉與門司港，展現城市、歷史與水鄉風景。糸島海岸、宗像大社、秋月與英彦山則帶來海景、信仰與自然層次；祭典、購物與街區散策也很有活力。美食包含博多拉麵、明太子、水炊雞鍋、牛腸鍋、烤雞串、草莓與八女茶，適合第一次深入九州的旅行。城市節奏明快，生活感也強。',
    region: 'kyushu',
    browseArea: 'kyushu',
    order: 40,
  },
  {
    key: 'saga',
    name: { zhTw: '佐賀縣', ja: '佐賀県', en: 'Saga' },
    description:
      '佐賀縣位在九州西北部，以有田、伊萬里、唐津等陶瓷文化聞名，也有嬉野、武雄溫泉與虹之松原等自然風景。吉野里遺跡呈現彌生時代歷史，祐德稻荷神社、呼子朝市與玄界灘海岸則帶來信仰、漁港與海景體驗；秋季熱氣球活動也很具特色。美食包含佐賀牛、呼子活魷魚、嬉野茶、溫泉湯豆腐、竹崎蟹與陶器街甜點。整體安靜細緻，適合陶藝與溫泉慢旅。',
    region: 'kyushu',
    browseArea: 'kyushu',
    order: 41,
  },
  {
    key: 'nagasaki',
    name: { zhTw: '長崎縣', ja: '長崎県', en: 'Nagasaki' },
    description:
      '長崎縣由半島與島嶼組成，融合港口、異國文化、基督教歷史與海景。長崎市的和平公園、哥拉巴園、出島與夜景，搭配平戶、五島列島、雲仙溫泉、島原城與九十九島，展現多元歷史與自然層次。美食包含強棒麵、皿烏龍、長崎蛋糕、土耳其飯、海鮮、佐世保漢堡與島原素麵，適合文化巡禮與島嶼慢遊。山海起伏明顯，城市街景也很有層次。',
    region: 'kyushu',
    browseArea: 'kyushu',
    order: 42,
  },
  {
    key: 'kumamoto',
    name: { zhTw: '熊本縣', ja: '熊本県', en: 'Kumamoto' },
    description:
      '熊本縣位在九州中央，阿蘇火山、草千里、黑川溫泉與天草群島展現火山草原、溫泉與海島風景。熊本城、水前寺成趣園、人吉球磨與菊池溪谷帶來城下町、庭園、溪谷與山村文化；四季皆適合自然散策與泡湯。美食包含馬肉刺身、熊本拉麵、阿蘇牛乳、赤牛、辛蓮藕、太平燕與地方燒酎，風味鮮明又有土地感。能同時感受火山能量與九州人情味。',
    region: 'kyushu',
    browseArea: 'kyushu',
    order: 43,
  },
  {
    key: 'oita',
    name: { zhTw: '大分縣', ja: '大分県', en: 'Oita' },
    description:
      '大分縣以溫泉聞名，別府地獄、由布院、長湯與九重山區，展現多樣泉質、山岳與高原風景。國東半島、宇佐神宮、臼杵石佛、日田豆田町與耶馬溪，則呈現信仰、石佛文化、古街與溪谷紅葉；冬季也能安排雪景與泡湯。美食包含豐後牛、關鯖關竹筴魚、雞天、團子汁、柚子胡椒與地獄蒸，適合溫泉與慢食旅行。整體很適合以泡湯作為旅程主軸。',
    region: 'kyushu',
    browseArea: 'kyushu',
    order: 44,
  },
  {
    key: 'miyazaki',
    name: { zhTw: '宮崎縣', ja: '宮崎県', en: 'Miyazaki' },
    description:
      '宮崎縣面向太平洋，日南海岸、青島、高千穗峽與霧島山麓構成神話、海景與火山自然。鵜戶神宮、都井岬、綾町照葉樹林與西都原古墳群，展現信仰、野生馬、森林與古代文化；溫暖氣候也適合海岸散策與戶外活動。美食包含宮崎牛、炭火地雞、芒果、冷汁、雞南蠻、燒酎與日向夏，整體氛圍明亮悠閒。適合想感受南九州陽光與神話氣息的旅人。',
    region: 'kyushu',
    browseArea: 'kyushu',
    order: 45,
  },
  {
    key: 'kagoshima',
    name: { zhTw: '鹿兒島縣', ja: '鹿児島県', en: 'Kagoshima' },
    description:
      '鹿兒島縣位在九州南端，櫻島火山、霧島連山、指宿砂蒸溫泉與屋久島自然遺產，是火山、溫泉與島嶼景觀的代表。仙巖園、知覽武家屋敷、奄美群島與種子島，展現薩摩歷史、亞熱帶森林與海洋文化；四季都有鮮明自然體驗。美食包含黑豬、黑牛、白熊冰、地瓜燒酎、鰹魚、雞飯與薩摩揚，適合海島與火山旅程。整體氣質熱烈，島嶼選擇也多。',
    region: 'kyushu',
    browseArea: 'kyushu',
    order: 46,
  },
  {
    key: 'okinawa',
    name: { zhTw: '沖繩縣', ja: '沖縄県', en: 'Okinawa' },
    description:
      '沖繩縣由琉球群島組成，擁有珊瑚海、白沙灘、紅瓦聚落與獨特琉球文化。首里城、齋場御嶽、竹富島、石垣島、西表島與慶良間群島，展現歷史信仰、島嶼生活、紅樹林與海洋自然；冬季也能感受溫暖氣候與賞鯨。美食包含沖繩麵、苦瓜炒、海葡萄、阿古豬、泡盛、黑糖與塔可飯，適合海島放鬆與文化散策。整體步調放鬆，適合長時間停留。',
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
