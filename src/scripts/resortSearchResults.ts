import { getTextLengthBucket, trackEvent } from './analytics'

type SearchField = 'name' | 'skiArea' | 'prefecture' | 'region'

type FieldWeight = {
  exact: number
  startsWith: number
  includes: number
}

type ResortCard = HTMLElement & {
  dataset: DOMStringMap & {
    searchName?: string
    searchSkiArea?: string
    searchPrefecture?: string
    searchRegion?: string
    prefectureKey?: string
    tags?: string
  }
}

type ResortSearchEntry = {
  card: ResortCard
  originalIndex: number
  fieldTokens: Record<SearchField, string[]>
  prefectureKey: string
  tags: Set<string>
}

type ResortSearchIndex = {
  entries: ResortSearchEntry[]
}

type ResortSearchResult = {
  entry: ResortSearchEntry
  isVisible: boolean
  score: number
}

const SEARCH_FIELDS: SearchField[] = ['name', 'skiArea', 'prefecture', 'region']

/*
 * 搜尋流程總覽：
 * 1. Astro 先把每張雪場卡片可搜尋的文字寫進 data-search-*。
 * 2. 前端載入後，把每個欄位正規化並拆成 token，建立一次性的搜尋索引。
 * 3. 使用者輸入的 q 也用同一套規則拆 token；多個 token 採 AND 邏輯。
 * 4. 每個 token 可以跨欄位命中，但每個 token 至少要在某個欄位命中才顯示。
 * 5. 有命中的卡片依分數排序；沒有搜尋字時維持原本的資料順序。
 */

// 權重由精準到寬鬆、由具體到廣泛：雪場名稱 > 雪場區域 > 縣別 > 地方區域。
const SEARCH_FIELD_WEIGHTS: Record<SearchField, FieldWeight> = {
  name: { exact: 120, startsWith: 100, includes: 80 },
  skiArea: { exact: 70, startsWith: 60, includes: 50 },
  prefecture: { exact: 40, startsWith: 35, includes: 30 },
  region: { exact: 25, startsWith: 22, includes: 20 },
}

// NFKC 會把全形/半形等常見輸入差異收斂，讓搜尋不容易被輸入法影響。
const splitSearchTokens = (value: string) =>
  value
    .normalize('NFKC')
    .toLocaleLowerCase()
    .split(/[\s\p{P}\p{S}]+/gu)
    .filter(Boolean)

// 同一欄位內的比對也有排序：完全相同 > 開頭相同 > 包含關鍵字。
const getTokenMatchScore = (
  textToken: string,
  queryToken: string,
  weight: FieldWeight,
) => {
  if (textToken === queryToken) return weight.exact
  if (textToken.startsWith(queryToken)) return weight.startsWith
  if (textToken.includes(queryToken)) return weight.includes

  return 0
}

const getQueryTokenFieldScore = (
  queryToken: string,
  fieldTokens: string[],
  weight: FieldWeight,
) =>
  // 同一欄位可能有中文、日文、英文、key 等多個 token；只取該欄位最佳分數。
  fieldTokens.reduce(
    (bestScore, textToken) =>
      Math.max(bestScore, getTokenMatchScore(textToken, queryToken, weight)),
    0,
  )

const getQueryTokenScore = (entry: ResortSearchEntry, queryToken: string) =>
  // 同一個搜尋 token 可跨欄位加分，例如「妙高」同時命中名稱與雪場區域時會更前面。
  SEARCH_FIELDS.reduce((totalScore, field) => {
    const fieldScore = getQueryTokenFieldScore(
      queryToken,
      entry.fieldTokens[field],
      SEARCH_FIELD_WEIGHTS[field],
    )

    return totalScore + fieldScore
  }, 0)

const scoreEntryForQuery = (entry: ResortSearchEntry, queryTokens: string[]) => {
  if (queryTokens.length === 0) return 0

  let totalScore = 0

  for (const queryToken of queryTokens) {
    const tokenScore = getQueryTokenScore(entry, queryToken)

    // 多字搜尋採 AND：像「妙高 赤倉」必須同時命中「妙高」與「赤倉」才會顯示。
    if (tokenScore === 0) return 0

    totalScore += tokenScore
  }

  return totalScore
}

const buildResortSearchIndex = (cards: ResortCard[]): ResortSearchIndex => ({
  // 預先把 DOM dataset 轉成 token，避免每次篩選都重複 parse 同一批卡片資料。
  entries: cards.map((card, originalIndex) => ({
    card,
    originalIndex,
    fieldTokens: {
      name: splitSearchTokens(card.dataset.searchName ?? ''),
      skiArea: splitSearchTokens(card.dataset.searchSkiArea ?? ''),
      prefecture: splitSearchTokens(card.dataset.searchPrefecture ?? ''),
      region: splitSearchTokens(card.dataset.searchRegion ?? ''),
    },
    prefectureKey: card.dataset.prefectureKey ?? '',
    tags: new Set((card.dataset.tags ?? '').split(' ').filter(Boolean)),
  })),
})

const matchesSelectedPrefectures = (entry: ResortSearchEntry, selectedPrefectures: string[]) =>
  selectedPrefectures.length === 0 || selectedPrefectures.includes(entry.prefectureKey)

const matchesSelectedTags = (entry: ResortSearchEntry, selectedTags: string[]) =>
  selectedTags.length === 0 || selectedTags.every((tag) => entry.tags.has(tag))

const getZeroResultValue = (resultCount: number) => (resultCount === 0 ? 'true' : 'false')

const trackResortSearch = (
  query: string,
  resultCount: number,
  selectedPrefectures: string[],
  selectedTags: string[],
  sourceArea: string,
) => {
  if (!query.trim()) return

  trackEvent('resort_search', {
    result_count: resultCount,
    zero_result: getZeroResultValue(resultCount),
    query_length_bucket: getTextLengthBucket(query),
    filter_prefecture_count: selectedPrefectures.length,
    filter_tag_count: selectedTags.length,
    source_area: sourceArea,
  })
}

const trackAppliedFilters = (
  resultCount: number,
  selectedPrefectures: string[],
  selectedTags: string[],
  sourceArea: string,
) => {
  const selectedFilterCount = selectedPrefectures.length + selectedTags.length
  if (selectedFilterCount === 0) return

  const baseParams = {
    result_count: resultCount,
    zero_result: getZeroResultValue(resultCount),
    selected_filter_count: selectedFilterCount,
    source_area: sourceArea,
  }

  for (const prefecture of selectedPrefectures) {
    trackEvent('filter_apply', {
      ...baseParams,
      filter_type: 'prefecture',
      filter_value: prefecture,
    })
  }

  for (const tag of selectedTags) {
    trackEvent('filter_apply', {
      ...baseParams,
      filter_type: 'tag',
      filter_value: tag,
    })
  }
}

const sortSearchResults = (results: ResortSearchResult[], hasQuery: boolean) =>
  [...results].sort((a, b) => {
    if (a.isVisible !== b.isVisible) return a.isVisible ? -1 : 1
    if (hasQuery && a.score !== b.score) return b.score - a.score

    return a.entry.originalIndex - b.entry.originalIndex
  })

const applyResultOrder = (resultsBlock: HTMLElement | null, results: ResortSearchResult[]) => {
  if (!resultsBlock) return

  for (const result of results) {
    result.entry.card.hidden = !result.isVisible

    // append 已存在的卡片會移動 DOM 位置，可保留原本 HTML，又能依搜尋分數重新排序。
    resultsBlock.append(result.entry.card)
  }
}

const applyResortFilters = () => {
  const startedAt = performance.now()
  const resultsBlock = document.querySelector<HTMLElement>('[data-resort-results]')
  const resortCards = Array.from(document.querySelectorAll<ResortCard>('[data-resort-card]'))
  const searchIndex = buildResortSearchIndex(resortCards)
  const countElement = document.querySelector<HTMLElement>('[data-resort-result-count]')
  const params = new URLSearchParams(window.location.search)
  const query = params.get('q') ?? ''
  const queryTokens = splitSearchTokens(query)
  const selectedPrefectures = params.getAll('prefecture').filter(Boolean)
  const selectedTags = params.getAll('tag').filter(Boolean)
  const sourceArea = resultsBlock?.dataset.sourceArea ?? 'resort_listing'
  const hasQuery = queryTokens.length > 0

  const searchResults = searchIndex.entries.map((entry) => {
    const score = scoreEntryForQuery(entry, queryTokens)
    // 搜尋分數、縣別 filter、標籤 filter 都要通過；沒有 q 時只套用 filter。
    const isVisible =
      (!hasQuery || score > 0) &&
      matchesSelectedPrefectures(entry, selectedPrefectures) &&
      matchesSelectedTags(entry, selectedTags)

    return { entry, isVisible, score }
  })

  const sortedResults = sortSearchResults(searchResults, hasQuery)
  const visibleCount = searchResults.filter((result) => result.isVisible).length

  applyResultOrder(resultsBlock, sortedResults)

  if (countElement) countElement.textContent = `${visibleCount} 座雪場`

  const elapsedMs = Math.max(0, Math.round(performance.now() - startedAt))
  const queryLabel = query.trim() ? `"${query.trim()}"` : 'all resorts'
  console.log(`Resort search ${queryLabel}: ${elapsedMs}ms, ${visibleCount} results`)

  trackResortSearch(query, visibleCount, selectedPrefectures, selectedTags, sourceArea)
  trackAppliedFilters(visibleCount, selectedPrefectures, selectedTags, sourceArea)
}

applyResortFilters()
