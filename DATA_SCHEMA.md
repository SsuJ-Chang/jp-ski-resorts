# Data Schema

本文件是雪場 content schema 的主要說明文件，說明 `src/content/resorts/*.md` 的 YAML frontmatter 欄位。實際驗證規則以 `src/content.config.ts` 為準。

完整填寫範例請看 `RESORT_ENTRY_EXAMPLE.md`。

## 基本規則

- 每筆雪場資料是一個 Markdown 檔，放在 `src/content/resorts/`。
- YAML frontmatter 之外的 Markdown body 會作為雪場概要內容使用。
- 找不到資料時，不要硬補；可以先填 `待補`、`待確認`，或省略 optional 欄位。
- 即時資訊不要當成永久事實保存，例如今日雪況、即時纜車狀態、即時天氣。
- `sources` 目前為必填，至少要放一筆官方來源；可為官方網站或官方社群頁面。

## 頂層欄位

| 欄位 | 必填 | 型別 | 說明 |
|---|---:|---|---|
| `id` | 是 | string | 雪場唯一識別碼，使用小寫英文與連字號，例如 `hakuba-goryu`。 |
| `name` | 是 | object | 雪場名稱，多語系名稱放在此欄。 |
| `region` | 是 | enum | 大區域，必須使用現有 `regionKeys`。 |
| `prefecture` | 是 | string | 都道府縣，建議用繁體中文，例如 `長野縣`。 |
| `skiArea` | 否 | enum | 滑雪旅行區，例如 `hakuba`、`yuzawa`。必須使用現有 `skiAreaKeys`。 |
| `tags` | 否 | array | 雪場特色標籤。未填時預設為空陣列。 |
| `visibility` | 否 | object | 控制是否公開顯示。 |
| `homeRegionExample` | 否 | boolean | 是否作為首頁右側 region 列表的範例雪場候選。 |
| `links` | 是 | object | 官方網站與外部資訊連結。 |
| `contact` | 否 | object | 地址、Google Maps、電話。 |
| `season` | 否 | object | 雪季、營業期間與時間。 |
| `trailMaps` | 否 | array | 官方雪場圖或 PDF 連結。 |
| `tickets` | 否 | object | 主要票種摘要。 |
| `snowWeather` | 否 | object | 雪況天氣區塊資料。 |
| `location` | 否 | object | 經緯度。 |
| `mapDisplay` | 否 | object | 靜態地圖或區域頁標示用位置。 |
| `elevation` | 否 | object | 海拔與落差。 |
| `courses` | 否 | object | 雪道總覽與雪道詳細資料。 |
| `lifts` | 否 | object | 纜車數量。現階段畫面尚未顯示。 |
| `access` | 否 | object | 從主要城市或機場前往的交通摘要。 |
| `terrainSummary` | 否 | object | 不同程度與滑行需求的地形摘要。 |
| `editorial` | 否 | object | 站長補充的編輯註記，例如 RJ 感想。 |
| `externalContent` | 否 | object | 外部遊記與影片連結。 |
| `sources` | 是 | array | 資料來源。 |

## `name`

| 欄位 | 必填 | 型別 | 說明 |
|---|---:|---|---|
| `zhTw` | 是 | string | 繁體中文名稱。 |
| `ja` | 是 | string | 日文名稱。 |
| `en` | 否 | string | 英文名稱。 |

## `region`

可用值：

```txt
hokkaido
tohoku
kanto-koshinetsu
hokuriku
chubu
kansai-chugoku
kyushu
```

### 都道府縣對應規則

本專案的 `region` 以「台灣旅客規劃日本滑雪行程」的動線為主，不完全等同日本行政、氣象或傳統地方區分。新增雪場時優先依下表填寫：

| 都道府縣 | `region` | 顯示區域 | 備註 |
|---|---|---|---|
| 北海道 | `hokkaido` | 北海道 | 北海道獨立成區。 |
| 青森縣、岩手縣、宮城縣、秋田縣、山形縣、福島縣 | `tohoku` | 東北 | 東北地方雪場與溫泉旅遊圈。 |
| 茨城縣、栃木縣、群馬縣、埼玉縣、千葉縣、東京都、神奈川縣、山梨縣、長野縣、新潟縣 | `kanto-koshinetsu` | 關東甲信越 | 新潟縣雖可被視為北陸或信越，但本專案以東京出發滑雪動線為主，湯澤、苗場、妙高等維持歸在關東甲信越。 |
| 富山縣、石川縣、福井縣 | `hokuriku` | 北陸 | 北陸核心三縣；石川縣白山、金澤周邊雪場歸在北陸。 |
| 岐阜縣、靜岡縣、愛知縣、三重縣 | `chubu` | 中部 | 岐阜縣高鷲、飛驒等雪場以名古屋與中部行程視角歸類。 |
| 滋賀縣、京都府、大阪府、兵庫縣、奈良縣、和歌山縣、鳥取縣、島根縣、岡山縣、廣島縣、山口縣、德島縣、香川縣、愛媛縣、高知縣 | `kansai-chugoku` | 關西 / 中國 | 目前沒有獨立四國 `region`，四國雪場暫歸在關西 / 中國。 |
| 福岡縣、佐賀縣、長崎縣、熊本縣、大分縣、宮崎縣、鹿兒島縣、沖繩縣 | `kyushu` | 九州 | 九州與沖繩歸同一區；若未來需要沖繩特殊內容再另行討論。 |

如果某座雪場的旅遊動線與上表明顯不同，先在 issue、PR 或資料備註中說明原因，不要自行新增 `region` enum。

## `skiArea`

可用值：

```txt
niseko
furano
rusutsu
zao
appi
nozawa-onsen
yuzawa
hakuba
shiga-kogen
```

如果雪場不屬於現有 `skiArea`，先省略此欄，不要自行新增 enum 值。

## `tags`

可用值：

```txt
beginner_friendly
family_friendly
good_for_first_japan_trip
large_ski_area
long_run
night_skiing
no_car_accessible
onsen
powder
resort_village
snowboard_friendly
tree_run
```

`long_run` 使用規則：

- 前台標籤顯示為「長雪道」。
- 只用於官方或可信資料標示最長滑走距離達 `3,000m` 以上，或至少有一條可連續滑行的命名雪道 / route 達 `3,000m` 以上的滑雪場。
- 只看「總滑走距離」不算，必須能對應到最長滑走距離或具體雪道長度。

## `visibility`

| 欄位 | 必填 | 型別 | 說明 |
|---|---:|---|---|
| `status` | 否 | enum | `published`、`draft`、`hidden`。預設為 `published`。 |
| `note` | 否 | string | 狀態備註。 |

建議用法：

- `published`：公開顯示。
- `draft`：資料仍在整理。
- `hidden`：保留資料，但前台不顯示。

## `homeRegionExample`

| 欄位 | 必填 | 型別 | 說明 |
|---|---:|---|---|
| `homeRegionExample` | 否 | boolean | 設為 `true` 時，此雪場會成為首頁右側 region 列表的範例雪場候選。 |

使用規則：

- 首頁每個 region 最多顯示 2 座範例雪場。
- 只會取 `visibility.status` 為 `published` 的雪場。
- 建議每個 region 只標記 2 座，避免實際顯示結果不符合預期。
- 若同一 region 標記超過 2 座，畫面會依已發布 `skiArea.featuredResorts` 的順序優先顯示；未列在 `featuredResorts` 的雪場再依繁中名稱排序補上。

## `links`

| 欄位 | 必填 | 型別 | 說明 |
|---|---:|---|---|
| `official` | 否 | URL | 官方網站；不可放 Facebook、Instagram、Threads、X（Twitter）等官方社群。 |
| `facebook` | 否 | URL | 官方 Facebook 頁面。 |
| `instagram` | 否 | URL | 官方 Instagram 頁面。 |
| `threads` | 否 | URL | 官方 Threads 頁面。 |
| `xTwitter` | 否 | URL | 官方 X（Twitter）頁面，可使用 `x.com` 或 `twitter.com`。 |
| `googleMaps` | 否 | URL | Google Maps 連結。 |
| `trailMapPage` | 否 | URL | 官方雪場圖頁面。 |
| `trailMapPdf` | 否 | URL | 官方雪場圖 PDF。 |
| `weather` | 否 | URL | 天氣頁，例如 Weathernews。 |
| `snowReport` | 否 | URL | 官方雪況頁。 |
| `liftStatus` | 否 | URL | 纜車運行狀態頁。 |
| `ticket` | 否 | URL | 票價頁。 |
| `access` | 否 | URL | 交通資訊頁。 |

官方網站與官方社群要嚴格分開。若官方入口是上述社群，請放到對應社群欄位；若是其他非上述社群的官方入口，才放回 `official`。

## `contact`

| 欄位 | 必填 | 型別 | 說明 |
|---|---:|---|---|
| `address.zhTw` | 是 | string | 繁體中文地址。 |
| `address.ja` | 是 | string | 日文地址。 |
| `address.googleMaps` | 是 | URL | Google Maps 連結。 |
| `phone` | 否 | string | 電話。 |

`contact` 整個區塊是 optional；但只要填 `contact`，`address` 內三個欄位都要填。

## `season`

| 欄位 | 必填 | 型別 | 說明 |
|---|---:|---|---|
| `label` | 是 | string | 雪季標籤，例如 `2025-2026`。 |
| `operatingPeriod` | 否 | string | 營業期間。 |
| `hours` | 否 | string | 日間營業時間。 |
| `nightSkiingHours` | 否 | string | 夜滑時間。 |
| `note` | 否 | string | 營業相關備註。 |
| `source` | 否 | URL | 資料來源。 |

## `trailMaps`

`trailMaps` 是陣列，可放多筆不同語言或不同年度的官方雪場圖。

| 欄位 | 必填 | 型別 | 說明 |
|---|---:|---|---|
| `label` | 是 | string | 顯示標題。 |
| `language` | 是 | string | 語言，例如 `日本語`、`English`。 |
| `season` | 否 | string | 適用雪季。 |
| `url` | 是 | URL | 官方頁面或 PDF URL。 |
| `sourceLabel` | 否 | string | 來源名稱。 |

## `tickets`

| 欄位 | 必填 | 型別 | 說明 |
|---|---:|---|---|
| `season` | 是 | string | 票價所屬雪季。 |
| `currency` | 否 | string | 幣別，預設 `JPY`。 |
| `source` | 是 | URL | 官方票價來源。 |
| `note` | 否 | string | 票價備註。 |
| `plans` | 是 | array | 主要票種，至少一筆。 |

### `tickets.plans`

| 欄位 | 必填 | 型別 | 說明 |
|---|---:|---|---|
| `name` | 是 | string | 票種名稱。 |
| `audience` | 否 | string | 適用對象，例如大人、兒童、敬老。 |
| `price` | 是 | string | 價格。 |
| `note` | 否 | string | 票種備註。 |

票價只建議放主要票種，不需要把官方完整票價表全部搬進來。

## `snowWeather`

| 欄位 | 必填 | 型別 | 說明 |
|---|---:|---|---|
| `title` | 是 | string | 雪況天氣標題。 |
| `provider` | 否 | string | 來源名稱，例如 `Weathernews`。 |
| `url` | 是 | URL | 天氣或雪況頁。 |
| `snowDepth` | 否 | string | 積雪量。 |
| `updatedAt` | 否 | string | 更新時間。 |
| `forecast` | 否 | array | 一週天氣。 |
| `note` | 否 | string | 備註。 |

### `snowWeather.forecast`

| 欄位 | 必填 | 型別 | 說明 |
|---|---:|---|---|
| `date` | 是 | string | 日期，例如 `12/27(日)`。 |
| `weather` | 是 | string | 天氣，例如 `晴`、`陰`、`雪`。 |
| `low` | 是 | string 或 number | 最低溫。 |
| `high` | 是 | string 或 number | 最高溫。 |

## `location`

| 欄位 | 必填 | 型別 | 說明 |
|---|---:|---|---|
| `latitude` | 是 | number | 緯度。 |
| `longitude` | 是 | number | 經度。 |

`location` 整個區塊是 optional；但只要填 `location`，兩個欄位都要填。

## `mapDisplay`

| 欄位 | 必填 | 型別 | 說明 |
|---|---:|---|---|
| `showOnRegionGuide` | 否 | boolean | 是否顯示在區域導覽圖。 |
| `labelPriority` | 否 | `1`、`2`、`3` | 標籤優先度。 |
| `approximatePosition.x` | 否 | number | 靜態地圖上的 x 位置。 |
| `approximatePosition.y` | 否 | number | 靜態地圖上的 y 位置。 |

## `elevation`

| 欄位 | 必填 | 型別 | 說明 |
|---|---:|---|---|
| `top` | 否 | number | 最高海拔，單位通常為公尺。 |
| `bottom` | 否 | number | 最低海拔，單位通常為公尺。 |
| `verticalDrop` | 否 | number | 標高差，單位通常為公尺。 |

## `courses`

| 欄位 | 必填 | 型別 | 說明 |
|---|---:|---|---|
| `total` | 否 | number | 雪道總數。 |
| `beginnerRatio` | 否 | number | 初級比例。 |
| `intermediateRatio` | 否 | number | 中級比例。 |
| `advancedRatio` | 否 | number | 進階比例。 |
| `courseInfoPage` | 否 | URL | 官方雪道資訊頁。填此欄會產生雪道詳細資訊頁。 |
| `summary` | 否 | string | 雪道整體摘要。 |
| `details` | 否 | array | 每條雪道資料。 |

### `courses.details`

| 欄位 | 必填 | 型別 | 說明 |
|---|---:|---|---|
| `name` | 是 | string | 雪道名稱。 |
| `difficulty` | 是 | enum | 難度。 |
| `length` | 否 | string | 長度，例如 `1200m` 或 `1,200m`。 |
| `maxSlope` | 否 | string | 最大坡度，例如 `25°`。 |
| `averageSlope` | 否 | string | 平均坡度，例如 `13°`。 |
| `videoLinks` | 否 | URL[] | 相關影片連結。頁面會依陣列順序顯示為 `參考影片1`、`參考影片2`。 |
| `note` | 否 | string | 雪道說明。 |

`difficulty` 可用值：

```txt
beginner
intermediate
advanced
expert
ungroomed
mixed
```

### `courses.details.videoLinks`

| 欄位 | 必填 | 型別 | 說明 |
|---|---:|---|---|
| item | 是 | URL | 影片連結字串，不需要填標題；前端會依順序產生顯示名稱。 |

## `lifts`

| 欄位 | 必填 | 型別 | 說明 |
|---|---:|---|---|
| `total` | 否 | number | 纜車、吊椅、廂型纜車等總數。 |

目前前台尚未顯示 `lifts`。

## `access`

| 欄位 | 必填 | 型別 | 說明 |
|---|---:|---|---|
| `fromTokyo` | 否 | array | 東京出發交通。 |
| `fromOsaka` | 否 | array | 大阪出發交通。 |
| `fromNagoya` | 否 | array | 名古屋出發交通。 |
| `fromSapporo` | 否 | array | 札幌出發交通。 |
| `fromAirport` | 否 | array | 機場出發交通。 |
| `car` | 否 | object | 自駕資訊。 |

### `access` 路線

| 欄位 | 必填 | 型別 | 說明 |
|---|---:|---|---|
| `label` | 是 | string | 路線名稱。 |
| `steps` | 是 | string[] | 交通步驟，至少一筆。 |
| `estimatedTime` | 否 | string | 預估時間。 |
| `difficulty` | 是 | enum | `easy`、`medium`、`hard`。 |
| `note` | 否 | string | 備註。 |
| `links` | 否 | array | 相關連結。 |

### `access.car`

| 欄位 | 必填 | 型別 | 說明 |
|---|---:|---|---|
| `recommended` | 是 | boolean | 是否建議自駕。 |
| `snowTireRequired` | 是 | boolean | 是否需要雪胎或雪鏈。 |
| `note` | 否 | string | 自駕備註。 |

## `terrainSummary`

| 欄位 | 必填 | 型別 | 說明 |
|---|---:|---|---|
| `beginner` | 否 | string | 初學者適合度。 |
| `intermediate` | 否 | string | 中級者適合度。 |
| `advanced` | 否 | string | 進階者適合度。 |
| `snowboard` | 否 | string | 單板適合度。 |
| `powder` | 否 | string | 粉雪適合度。 |

## `editorial`

| 欄位 | 必填 | 型別 | 說明 |
|---|---:|---|---|
| `rjOpinion` | 否 | string | 顯示在雪場頁「概要」卡片正文下方的 RJ 個人感想。 |

建議寫法：

- 使用 1-3 句的第一人稱或整理後觀察都可以，但要保持簡潔。
- 內容偏向個人滑行感受、適合族群或補充提醒，不要重複官方基本資料。
- 這個欄位不顯示標題，前端會用接近 Markdown `>` 的引用樣式呈現。

## `externalContent`

| 欄位 | 必填 | 型別 | 說明 |
|---|---:|---|---|
| `blogs` | 否 | array | 外部遊記或文章。 |
| `vlogs` | 否 | array | 外部影片。 |

### `externalContent.blogs` / `externalContent.vlogs`

| 欄位 | 必填 | 型別 | 說明 |
|---|---:|---|---|
| `title` | 是 | string | 顯示標題。 |
| `url` | 是 | URL | 外部連結。 |
| `note` | 否 | string | 備註，例如作者、頻道或用途。 |

## `sources`

| 欄位 | 必填 | 型別 | 說明 |
|---|---:|---|---|
| `label` | 是 | string | 來源名稱。 |
| `url` | 是 | URL | 來源網址。 |
| `note` | 否 | string | 來源備註。 |

建議每個重要事實都能回到某個 `sources` 或欄位內的 `source` URL。
