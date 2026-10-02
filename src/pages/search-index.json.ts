import { regions } from '../data/regions'
import { getPrefectureByName } from '../data/prefectures'
import { getPublishedResorts } from '../utils/resortCatalog'
import { sortResortsForListing } from '../utils/resortOrdering'
import { getPublishedSkiAreaMap } from '../utils/skiAreas'
import type { SearchFields } from '../utils/resortSearch'

// 這個 endpoint 會在 Astro 建置時執行，最後輸出成靜態的
// dist/search-index.json，不需要另外啟動後端 API。
export const prerender = true

export async function GET() {
  // 搜尋索引只收錄已發布的雪場，並沿用列表頁的排序，
  // 讓分數相同時仍能維持穩定的顯示順序。
  const resorts = sortResortsForListing(await getPublishedResorts())
  const skiAreaMap = await getPublishedSkiAreaMap()
  const regionByKey = new Map(regions.map((region) => [region.key, region] as const))

  const searchIndex = resorts.map((resort) => {
    const prefecture = getPrefectureByName(resort.data.prefecture)
    const region = regionByKey.get(resort.data.region)
    const skiArea = resort.data.skiArea ? skiAreaMap.get(resort.data.skiArea) : undefined
    const regionName = region?.name.zhTw ?? resort.data.region

    // fields 是「搜尋用資料」，故意和下方的顯示欄位分開。
    // 同一個雪場可以用中文、日文、英文或資料 key 找到。
    const fields: SearchFields = {
      name: [resort.data.name.zhTw, resort.data.name.ja, resort.data.name.en ?? ''],
      skiArea: [
        skiArea?.name.zhTw ?? '',
        skiArea?.name.ja ?? '',
        skiArea?.name.en ?? '',
        skiArea?.key ?? '',
      ],
      prefecture: [
        prefecture?.name.zhTw ?? '',
        prefecture?.name.ja ?? '',
        prefecture?.name.en ?? '',
        prefecture?.key ?? '',
        resort.data.prefecture,
      ],
      region: [
        region?.name.zhTw ?? '',
        region?.name.en ?? '',
        region?.key ?? '',
        resort.data.region,
        regionName,
      ],
    }

    // fields 用來比對；其餘欄位用來建立下拉選單畫面。
    return {
      id: resort.id,
      name: resort.data.name.zhTw,
      nameJa: resort.data.name.ja,
      nameEn: resort.data.name.en ?? '',
      prefecture: resort.data.prefecture,
      skiArea: skiArea?.name.zhTw ?? '',
      region: regionName,
      fields,
    }
  })

  // max-age 只控制瀏覽器/CDN 快取多久需要重新確認，
  // 不代表檔案 3600 秒後會從網站上消失。
  return new Response(JSON.stringify(searchIndex), {
    headers: {
      'Content-Type': 'application/json; charset=utf-8',
      'Cache-Control': 'public, max-age=3600',
    },
  })
}
