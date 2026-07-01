# 雪場資料全欄位範例

這份文件示範 `src/content/resorts/{resort-id}.md` 可以填寫的完整欄位。

實際新增雪場時，不需要每個 optional 欄位都填滿；找不到或尚未整理的資料可以先省略、填 `待補`，或使用空陣列 `[]`。

```yaml
---
id: example-resort
name:
  zhTw: 範例滑雪場
  ja: サンプルスキー場
  en: Example Snow Resort
region: kanto-koshinetsu
prefecture: 長野縣
skiArea: hakuba
tags:
  - beginner_friendly
  - family_friendly
  - good_for_first_japan_trip
  - large_ski_area
  - long_run
  - night_skiing
  - no_car_accessible
  - onsen
  - powder
  - resort_village
  - snowboard_friendly
  - tree_run
visibility:
  status: published
  note: 對外顯示。若資料未完成可改為 draft 或 hidden。
homeRegionExample: true
links:
  official: https://example.com/
  facebook: https://www.facebook.com/example-snow-resort
  instagram: https://www.instagram.com/example-snow-resort/
  threads: https://www.threads.net/@example-snow-resort
  xTwitter: https://x.com/example_snow
  googleMaps: https://www.google.com/maps/search/?api=1&query=Example%20Snow%20Resort
  trailMapPage: https://example.com/trail-map/
  trailMapPdf: https://example.com/trail-map-2025-2026.pdf
  weather: https://weathernews.jp/ski/spot/00000/
  snowReport: https://example.com/snow-report/
  liftStatus: https://example.com/lift-status/
  ticket: https://example.com/tickets/
  access: https://example.com/access/
contact:
  address:
    zhTw: 長野縣北安曇郡範例村 123
    ja: 〒399-0000 長野県北安曇郡サンプル村123
    googleMaps: https://www.google.com/maps/search/?api=1&query=Example%20Snow%20Resort
  phone: 0261-00-0000
season:
  label: 2025-2026
  operatingPeriod: 2025/12/中旬-2026/4/上旬
  hours: 8:30-16:30
  nightSkiingHours: 17:00-21:00
  note: 實際營業期間、營業時間、夜滑日期請以官方公告為準。
  source: https://example.com/season/
trailMaps:
  - label: 範例滑雪場 2025-2026 雪場圖
    language: 日本語
    season: 2025-2026
    url: https://example.com/trail-map-ja.pdf
    sourceLabel: Example Resort Official
  - label: Example Snow Resort Trail Map 2025-2026
    language: English
    season: 2025-2026
    url: https://example.com/trail-map-en.pdf
    sourceLabel: Example Resort Official
tickets:
  season: 2025-2026
  currency: JPY
  source: https://example.com/tickets/
  note: 主要票種摘要；完整票價、線上優惠與 IC 卡規則請以官方頁面為準。
  plans:
    - name: 1 日券
      priceLines:
        - 成人：¥7,000
        - 兒童：¥4,000
        - 敬老：¥6,000
      note: 平日 / 假日價格不同時，可再拆成多行。
    - name: 4 小時券
      priceLines:
        - 成人：¥5,000
        - 兒童：¥3,000
      note: 從首次過閘起算。
    - name: 夜滑券
      priceLines:
        - 成人：¥3,000
        - 兒童：¥2,000
      note: 17:00 ~ 夜滑結束。
snowWeather:
  title: 範例滑雪場雪況天氣
  provider: Weathernews
  url: https://weathernews.jp/ski/spot/00000/
  snowDepth: 200 cm
  updatedAt: 2026/4/30 09:00:00
  forecast:
    - date: 12/27(日)
      weather: 雪
      low: -5°C
      high: 4°C
    - date: 12/28(一)
      weather: 大雪
      low: -8°C
      high: 0°C
    - date: 12/29(二)
      weather: 大雪
      low: -9°C
      high: -2°C
    - date: 12/30(三)
      weather: 雪
      low: -5°C
      high: 0°C
    - date: 12/31(四)
      weather: 陰
      low: -3°C
      high: 3°C
    - date: 1/1(五)
      weather: 雨
      low: -4°C
      high: 1°C
    - date: 1/2(六)
      weather: 晴
      low: 8°C
      high: 3°C
  note: 範例資料。正式資料請手動更新或改成待補。
location:
  latitude: 36.700000
  longitude: 137.850000
mapDisplay:
  showOnRegionGuide: true
  labelPriority: 1
  approximatePosition:
    x: 58
    y: 42
elevation:
  top: 1800
  bottom: 800
  verticalDrop: 1000
courses:
  total: 12
  beginnerRatio: 40
  intermediateRatio: 40
  advancedRatio: 20
  courseInfoPage: https://example.com/courses/
  summary: 範例滑雪場有初級緩坡、中級巡航雪道與進階非壓雪區，適合不同程度的滑雪者。
  details:
    - name: 初級巡航雪道 ビギナーコース
      difficulty: beginner
      length: 1200m
      maxSlope: 15°
      averageSlope: 8°
      note: 寬敞平緩，適合初學者練習轉彎與煞車。
      videoLinks:
        - https://www.youtube.com/watch?v=example001
    - name: 中級景觀雪道 パノラマコース
      difficulty: intermediate
      length: 1800m
      maxSlope: 25°
      averageSlope: 14°
      note: 視野開闊，適合練習連續轉彎與刻滑。
    - name: 非壓雪粉雪區 パウダーエリア
      difficulty: ungroomed
      length: 900m
      maxSlope: 32°
      averageSlope: 20°
      note: 降雪後適合粉雪玩家，需注意雪況與開放狀態。
lifts:
  total: 6
access:
  fromTokyo:
    - label: 東京出發，新幹線加接駁車
      steps:
        - 東京站搭乘北陸新幹線至長野站
        - 長野站轉乘巴士至滑雪場
      estimatedTime: 約 3 小時
      difficulty: easy
      note: 適合不自駕旅客。
      links:
        - label: 官方交通資訊
          url: https://example.com/access/
  fromOsaka:
    - label: 大阪出發，電車加巴士
      steps:
        - 新大阪站搭乘新幹線至名古屋站
        - 名古屋站轉乘特急與巴士前往雪場
      estimatedTime: 約 5-6 小時
      difficulty: medium
      note: 實際班次請另查。
  fromNagoya:
    - label: 名古屋出發，特急加巴士
      steps:
        - 名古屋站搭乘特急至主要轉乘站
        - 轉乘巴士至滑雪場
      estimatedTime: 約 4 小時
      difficulty: medium
  fromSapporo:
    - label: 札幌出發，僅北海道雪場適用
      steps:
        - 札幌站搭乘 JR 或巴士至雪場附近
      estimatedTime: 待補
      difficulty: medium
  fromAirport:
    - label: 機場出發
      steps:
        - 機場搭乘接駁巴士或鐵路至雪場附近
      estimatedTime: 待補
      difficulty: medium
      links:
        - label: 機場交通頁
          url: https://example.com/airport-access/
  car:
    recommended: false
    snowTireRequired: true
    note: 冬季道路可能積雪或結冰，自駕需雪胎或雪鏈。
  rjOpinion: |-
    **如果是我自己排這段交通，會優先確認接駁車班次。**
    從車站轉接雪場不算難，但遇到班次少的時段，整體節奏會差很多。
terrainSummary:
  beginner: 初學者可使用山麓緩坡與長距離初級路線。
  intermediate: 中級者可利用主雪道練習速度控制與連續轉彎。
  advanced: 進階者可挑戰陡坡、非壓雪區與高海拔路線。
  snowboard: 單板玩家可利用寬雪道、地形變化與公園區。
  powder: 降雪後部分區域有粉雪與非壓雪體驗。
rjOpinion: 如果是第一次安排這個雪場，我會把它當成行程中的重點站，原因是雪道辨識清楚、滑行節奏好抓，也比較容易和周邊行程一起安排。
lodgingRecommendations:
  - title: 範例住宿：Example Lodge
    url: https://www.google.com/maps/place/Example+Lodge
    rjOpinion: 可寫你自己的住宿心得，頁面會用類似引用的方式顯示。
externalContent:
  blogs:
    - title: 範例滑雪場遊記：交通、住宿與雪道心得
      url: https://example.com/blog/example-resort-trip
      note: 可放部落格、旅遊文章或個人攻略。
  vlogs:
    - title: 範例滑雪場 VLOG：一日滑行紀錄
      url: https://www.youtube.com/watch?v=example002
      note: 可放 YouTube 或其他影片平台連結。
---

範例滑雪場位於日本中部山區，具有初學者友善的緩坡、中級者可巡航的長距離雪道，以及進階玩家可挑戰的非壓雪區。此段是 Markdown body，可作為雪場頁面的概要說明。
```
## `rjOpinion` Markdown 範例

可以直接寫成：

```yaml
rjOpinion: |-
  **如果是第一次安排這個雪場，我會把它當成行程中的重點站。**

  - 雪道辨識清楚，滑行節奏好抓
  - 也比較容易和周邊行程一起安排

  [交通補充](https://example.com/access)
```

住宿推薦內的 `rjOpinion` 也一樣：

```yaml
lodgingRecommendations:
  - title: Example Lodge
    url: https://www.google.com/maps/place/Example+Lodge
    rjOpinion: |-
      **可寫你自己的住宿心得。**

      - 走到接駁站很近
      - 早餐每天都會換菜色
```
