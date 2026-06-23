import { getTextLengthBucket, trackEvent } from './analytics'

type ResortCard = HTMLElement & {
  dataset: DOMStringMap & {
    searchText?: string
    prefectureKey?: string
    tags?: string
  }
}

type ResortSearchEntry = {
  card: ResortCard
  searchTokens: string[]
  prefectureKey: string
  tags: Set<string>
}

type ResortSearchIndex = {
  entries: ResortSearchEntry[]
  tokenToCardIndexes: Map<string, number[]>
  allCardIndexes: number[]
}

const splitSearchTokens = (value: string) =>
  // 先把全形半形、大小寫、標點空白都整理掉，再切成可比對的小單位。
  // 這樣使用者輸入 `HA`、`ha`、`ｈａ`，結果都會落到同一組 token。
  value
    .normalize('NFKC')
    .toLocaleLowerCase()
    .split(/[\s\p{P}\p{S}]+/gu)
    .filter(Boolean)

const tokenMatchesQuery = (textToken: string, queryToken: string) =>
  // 這裡不是只做「完全相等」比對，而是允許包含/前綴命中。
  // 所以搜尋 `ha` 可以找到 `hakuba`、`hakka` 這種完整字串裡含有該片段的結果。
  textToken.includes(queryToken) || textToken.startsWith(queryToken)

const buildResortSearchIndex = (cards: ResortCard[]): ResortSearchIndex => {
  // 先把每張卡片的可搜尋文字拆成 token，並反向建立 token -> 卡片索引的表。
  // 之後每次輸入變更，就不用再把所有卡片全文掃一遍。
  const entries = cards.map((card) => ({
    card,
    searchTokens: splitSearchTokens(card.dataset.searchText ?? ''),
    prefectureKey: card.dataset.prefectureKey ?? '',
    tags: new Set((card.dataset.tags ?? '').split(' ').filter(Boolean)),
  }))

  const tokenToCardIndexes = new Map<string, number[]>()

  entries.forEach((entry, cardIndex) => {
    for (const token of entry.searchTokens) {
      const cardIndexes = tokenToCardIndexes.get(token)
      if (cardIndexes) {
        cardIndexes.push(cardIndex)
        continue
      }

      tokenToCardIndexes.set(token, [cardIndex])
    }
  })

  return {
    entries,
    tokenToCardIndexes,
    allCardIndexes: entries.map((_, cardIndex) => cardIndex),
  }
}

const queryTokenMatchesCache = new Map<string, number[]>()

const getCardIndexesForQueryToken = (queryToken: string, searchIndex: ResortSearchIndex) => {
  // 同一個 query token 如果重複出現，直接重用上次算過的結果。
  const cachedCardIndexes = queryTokenMatchesCache.get(queryToken)
  if (cachedCardIndexes) return cachedCardIndexes

  const matchedCardIndexes = new Set<number>()

  for (const [textToken, cardIndexes] of searchIndex.tokenToCardIndexes) {
    if (!tokenMatchesQuery(textToken, queryToken)) continue

    for (const cardIndex of cardIndexes) {
      matchedCardIndexes.add(cardIndex)
    }
  }

  const cardIndexes = [...matchedCardIndexes]
  queryTokenMatchesCache.set(queryToken, cardIndexes)
  return cardIndexes
}

const getMatchingCardIndexes = (queryTokens: string[], searchIndex: ResortSearchIndex) => {
  if (queryTokens.length === 0) return searchIndex.allCardIndexes

  // 使用者輸入多個字時，代表每個 token 都要命中，才算符合搜尋。
  // 例如 `hakuba east` 會要求同時符合 `hakuba` 與 `east`。
  const matchingLists = queryTokens
    .map((queryToken) => getCardIndexesForQueryToken(queryToken, searchIndex))
    .sort((a, b) => a.length - b.length)

  if (matchingLists.length === 0 || matchingLists[0].length === 0) return []

  let matchingIndexes = new Set(matchingLists[0])

  for (const cardIndexes of matchingLists.slice(1)) {
    const cardIndexSet = new Set(cardIndexes)
    matchingIndexes = new Set(
      [...matchingIndexes].filter((cardIndex) => cardIndexSet.has(cardIndex)),
    )

    if (matchingIndexes.size === 0) return []
  }

  return [...matchingIndexes]
}

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

const applyResortFilters = () => {
  // 這個函式只做一件事：把目前 URL 上的搜尋條件套到卡片顯示狀態。
  // 頁面一載入就執行一次，所以分享連結時會直接還原成對應結果。
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
  const matchingCardIndexes = new Set(getMatchingCardIndexes(queryTokens, searchIndex))

  let visibleCount = 0

  for (const [cardIndex, entry] of searchIndex.entries.entries()) {
    const isVisible =
      matchingCardIndexes.has(cardIndex) &&
      matchesSelectedPrefectures(entry, selectedPrefectures) &&
      matchesSelectedTags(entry, selectedTags)

    entry.card.hidden = !isVisible
    if (isVisible) visibleCount += 1
  }

  if (countElement) countElement.textContent = `${visibleCount} 座雪場`

  const elapsedMs = Math.max(0, Math.round(performance.now() - startedAt))
  const queryLabel = query.trim() ? `［${query.trim()}］` : '［全部］'
  console.log(`搜尋${queryLabel}，花費時間：${elapsedMs}ms，命中 ${visibleCount} 筆`)

  trackResortSearch(query, visibleCount, selectedPrefectures, selectedTags, sourceArea)
  trackAppliedFilters(visibleCount, selectedPrefectures, selectedTags, sourceArea)
}

applyResortFilters()
