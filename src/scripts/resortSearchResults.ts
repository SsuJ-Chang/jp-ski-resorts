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
  value
    .normalize('NFKC')
    .toLocaleLowerCase()
    .split(/[\s\p{P}\p{S}]+/gu)
    .filter(Boolean)

const tokenMatchesQuery = (textToken: string, queryToken: string) =>
  textToken.includes(queryToken) || textToken.startsWith(queryToken)

const buildResortSearchIndex = (cards: ResortCard[]): ResortSearchIndex => {
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
