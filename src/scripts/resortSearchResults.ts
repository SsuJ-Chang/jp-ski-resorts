import { getTextLengthBucket, trackEvent } from './analytics'

type ResortCard = HTMLElement & {
  dataset: DOMStringMap & {
    searchText?: string
    prefectureKey?: string
    tags?: string
  }
}

const splitSearchTokens = (value: string) =>
  value
    .normalize('NFKC')
    .toLocaleLowerCase()
    .split(/[\s\p{P}\p{S}]+/gu)
    .filter(Boolean)

const tokenMatchesQuery = (textToken: string, queryToken: string) =>
  textToken.includes(queryToken) || textToken.startsWith(queryToken)

const searchTokensCache = new WeakMap<ResortCard, string[]>()
const tagSetCache = new WeakMap<ResortCard, Set<string>>()

const getSearchTokens = (card: ResortCard) => {
  const cachedTokens = searchTokensCache.get(card)
  if (cachedTokens) return cachedTokens

  const tokens = splitSearchTokens(card.dataset.searchText ?? '')
  searchTokensCache.set(card, tokens)
  return tokens
}

const matchesSearchQuery = (card: ResortCard, queryTokens: string[]) => {
  if (queryTokens.length === 0) return true

  const textTokens = getSearchTokens(card)
  // Match inside a normalized token only; do not assemble letters across unrelated tokens.
  return queryTokens.every((queryToken) =>
    textTokens.some((textToken) => tokenMatchesQuery(textToken, queryToken)),
  )
}

const getCardTags = (card: ResortCard) => {
  const cachedTags = tagSetCache.get(card)
  if (cachedTags) return cachedTags

  const tags = new Set((card.dataset.tags ?? '').split(' ').filter(Boolean))
  tagSetCache.set(card, tags)
  return tags
}

const matchesSelectedPrefectures = (card: ResortCard, selectedPrefectures: string[]) =>
  selectedPrefectures.length === 0 || selectedPrefectures.includes(card.dataset.prefectureKey ?? '')

const matchesSelectedTags = (card: ResortCard, selectedTags: string[]) =>
  selectedTags.length === 0 || selectedTags.every((tag) => getCardTags(card).has(tag))

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
  const resultsBlock = document.querySelector<HTMLElement>('[data-resort-results]')
  const resortCards = Array.from(document.querySelectorAll<ResortCard>('[data-resort-card]'))
  const countElement = document.querySelector<HTMLElement>('[data-resort-result-count]')
  const params = new URLSearchParams(window.location.search)
  const query = params.get('q') ?? ''
  const queryTokens = splitSearchTokens(query)
  const selectedPrefectures = params.getAll('prefecture').filter(Boolean)
  const selectedTags = params.getAll('tag').filter(Boolean)
  const sourceArea = resultsBlock?.dataset.sourceArea ?? 'resort_listing'

  let visibleCount = 0

  for (const card of resortCards) {
    const isVisible =
      matchesSearchQuery(card, queryTokens) &&
      matchesSelectedPrefectures(card, selectedPrefectures) &&
      matchesSelectedTags(card, selectedTags)

    card.hidden = !isVisible
    if (isVisible) visibleCount += 1
  }

  if (countElement) countElement.textContent = `${visibleCount} 座雪場`

  trackResortSearch(query, visibleCount, selectedPrefectures, selectedTags, sourceArea)
  trackAppliedFilters(visibleCount, selectedPrefectures, selectedTags, sourceArea)
}

applyResortFilters()
