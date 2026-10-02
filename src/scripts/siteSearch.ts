import {
  scoreSearchFields,
  splitSearchTokens,
  type SearchFields,
} from '../utils/resortSearch'

type SearchIndexItem = {
  id: string
  name: string
  nameJa: string
  nameEn: string
  prefecture: string
  skiArea: string
  region: string
  fields: SearchFields
}

type IndexedSearchItem = Omit<SearchIndexItem, 'fields'> & {
  fieldTokens: SearchFields
  originalIndex: number
}

type SearchForm = HTMLFormElement & {
  dataset: DOMStringMap & {
    resortsUrl?: string
    searchIndexUrl?: string
  }
}

// 下拉選單只顯示少量結果，完整結果仍交給原本的列表頁處理。
const MAX_SUGGESTIONS = 5

// 兩個搜尋框共用同一個 Promise，因此同一頁只會載入一次 JSON。
let searchIndexPromise: Promise<IndexedSearchItem[]> | undefined
let searchFormId = 0
let siteSearchInitialized = false

const loadSearchIndex = (url: string) => {
  // ??= 會讓第一次呼叫建立 fetch；後續呼叫直接共用相同的 Promise。
  searchIndexPromise ??= fetch(url, { credentials: 'same-origin' })
    .then((response) => {
      if (!response.ok) throw new Error(`Failed to load resort search index: ${response.status}`)

      return response.json() as Promise<SearchIndexItem[]>
    })
    .then((items) =>
      items.map((item, originalIndex) => ({
        ...item,
        originalIndex,
        // JSON 中保留原始文字方便顯示；這裡另外建立標準化 token，
        // 避免每次使用者輸入時重複處理數百筆資料。
        fieldTokens: {
          name: splitSearchTokens(item.fields.name.join(' ')),
          skiArea: splitSearchTokens(item.fields.skiArea.join(' ')),
          prefecture: splitSearchTokens(item.fields.prefecture.join(' ')),
          region: splitSearchTokens(item.fields.region.join(' ')),
        },
      })),
    )

  return searchIndexPromise
}

const buildSearchUrl = (resortsUrl: string, query: string) => {
  const separator = resortsUrl.includes('?') ? '&' : '?'
  return `${resortsUrl}${separator}q=${encodeURIComponent(query)}`
}

// 點擊下拉選單項目時直接前往雪場詳細頁；
// 「查看全部」則會使用下面的搜尋結果頁 URL。
const buildDetailUrl = (resortsUrl: string, resortId: string) =>
  `${resortsUrl.replace(/\/+$/, '')}/${encodeURIComponent(resortId)}/`

const createSuggestionLink = (
  item: IndexedSearchItem,
  resortsUrl: string,
  optionId: string,
) => {
  const link = document.createElement('a')
  link.className = 'search-suggestion'
  link.href = buildDetailUrl(resortsUrl, item.id)
  link.id = optionId
  link.dataset.searchSuggestionOption = 'true'
  link.setAttribute('role', 'option')
  link.setAttribute('aria-selected', 'false')

  const copy = document.createElement('span')
  copy.className = 'search-suggestion__copy'

  const name = document.createElement('strong')
  name.className = 'search-suggestion__name'
  name.textContent = item.name
  copy.append(name)

  const secondaryName = item.nameEn || item.nameJa
  if (secondaryName) {
    const secondary = document.createElement('span')
    secondary.className = 'search-suggestion__secondary'
    secondary.textContent = secondaryName
    copy.append(secondary)
  }

  const meta = document.createElement('span')
  meta.className = 'search-suggestion__meta'
  let hasMetaItem = false
  // 顯示順序很重要：CSS 會在寬度不足時從 skiArea 開始隱藏，
  // 而每個項目的斜線也放在同一個 span 裡，才能一起消失。
  const metaItems = [
    ['region', item.region],
    ['prefecture', item.prefecture],
    ['skiArea', item.skiArea],
  ] as const

  metaItems.forEach(([key, value]) => {
    if (!value) return

    const metaItem = document.createElement('span')
    metaItem.className = `search-suggestion__meta-item search-suggestion__meta-item--${key}`
    if (hasMetaItem) metaItem.append(document.createTextNode(' / '))
    metaItem.append(document.createTextNode(value))
    meta.append(metaItem)
    hasMetaItem = true
  })

  link.append(copy, meta)
  return link
}

const getSuggestionOptions = (suggestions: HTMLElement) =>
  Array.from(suggestions.querySelectorAll<HTMLAnchorElement>('[data-search-suggestion-option]'))

const initializeSearchForm = (formElement: HTMLFormElement) => {
  const form = formElement as SearchForm
  const input = form.querySelector('input[type="search"]') as HTMLInputElement | null
  const suggestions = form.querySelector<HTMLElement>('[data-search-suggestions]')
  const toggle = form.querySelector('.site-search__toggle') as HTMLButtonElement | null
  const resortsUrl = form.dataset.resortsUrl ?? '/resorts/'
  const searchIndexUrl = form.dataset.searchIndexUrl

  if (!input || !suggestions || !searchIndexUrl) return

  const suggestionsId = `search-suggestions-${searchFormId++}`
  let activeIndex = -1
  let renderTimer: number | undefined

  suggestions.id = suggestionsId
  input.setAttribute('role', 'combobox')
  input.setAttribute('aria-autocomplete', 'list')
  input.setAttribute('aria-controls', suggestionsId)
  input.setAttribute('aria-expanded', 'false')

  const hideSuggestions = () => {
    activeIndex = -1
    suggestions.hidden = true
    input.setAttribute('aria-expanded', 'false')
    input.removeAttribute('aria-activedescendant')
  }

  const showSuggestions = () => {
    suggestions.hidden = false
    input.setAttribute('aria-expanded', 'true')
  }

  const updateActiveOption = (nextIndex: number) => {
    const options = getSuggestionOptions(suggestions)
    if (options.length === 0) return

    activeIndex = (nextIndex + options.length) % options.length
    options.forEach((option, index) => {
      const isActive = index === activeIndex
      option.setAttribute('aria-selected', String(isActive))
      option.classList.toggle('search-suggestion--active', isActive)
    })

    const activeOption = options[activeIndex]
    input.setAttribute('aria-activedescendant', activeOption.id)
    activeOption.scrollIntoView({ block: 'nearest' })
  }

  const renderSuggestions = async () => {
    const query = input.value.trim()
    if (!query) {
      hideSuggestions()
      return
    }

    showSuggestions()
    suggestions.replaceChildren()

    try {
      const searchIndex = await loadSearchIndex(searchIndexUrl)
      // 使用者可能在 fetch 期間繼續輸入；舊查詢完成後不能覆蓋新查詢。
      if (input.value.trim() !== query) return

      const queryTokens = splitSearchTokens(query)
      // 每次輸入只在已載入的本機索引中搜尋，不會重新呼叫網站。
      const results = searchIndex
        .map((item) => ({
          item,
          score: scoreSearchFields(item.fieldTokens, queryTokens),
        }))
        .filter((result) => result.score > 0)
        .sort(
          (a, b) => b.score - a.score || a.item.originalIndex - b.item.originalIndex,
        )
        .slice(0, MAX_SUGGESTIONS)

      if (results.length === 0) {
        const empty = document.createElement('p')
        empty.className = 'search-suggestions__empty'
        empty.textContent = '找不到相符的雪場'
        suggestions.append(empty)
        activeIndex = -1
        return
      }

      const list = document.createElement('div')
      list.className = 'search-suggestions__list'
      results.forEach(({ item }, index) => {
        list.append(createSuggestionLink(item, resortsUrl, `${suggestionsId}-option-${index}`))
      })
      suggestions.append(list)

      const allResults = document.createElement('a')
      allResults.className = 'search-suggestions__all'
      allResults.href = buildSearchUrl(resortsUrl, query)
      allResults.textContent = `查看全部「${query}」搜尋結果`
      suggestions.append(allResults)
      activeIndex = -1
    } catch {
      hideSuggestions()
    }
  }

  input.addEventListener('focus', () => {
    // 提前載入索引，讓使用者開始輸入時通常已經準備好資料。
    void loadSearchIndex(searchIndexUrl).catch(() => undefined)
  })

  input.addEventListener('input', () => {
    window.clearTimeout(renderTimer)
    // debounce 避免每打一個字就立刻重新計算和重畫下拉選單。
    renderTimer = window.setTimeout(() => void renderSuggestions(), 120)
  })

  input.addEventListener('keydown', (event) => {
    const options = getSuggestionOptions(suggestions)

    if (event.key === 'ArrowDown' && options.length > 0) {
      event.preventDefault()
      updateActiveOption(activeIndex + 1)
      return
    }

    if (event.key === 'ArrowUp' && options.length > 0) {
      event.preventDefault()
      updateActiveOption(activeIndex <= 0 ? options.length - 1 : activeIndex - 1)
      return
    }

    if (event.key === 'Escape') {
      hideSuggestions()
      return
    }

    if (event.key === 'Enter' && activeIndex >= 0 && options[activeIndex]) {
      event.preventDefault()
      options[activeIndex].click()
    }
  })

  form.addEventListener('submit', (event) => {
    event.preventDefault()

    const query = input.value.trim()
    hideSuggestions()
    // 沒有選取特定建議時，保留原本的完整搜尋結果頁流程。
    window.location.assign(query ? buildSearchUrl(resortsUrl, query) : resortsUrl)
  })

  toggle?.addEventListener('click', () => {
    const isOpen = form.classList.toggle('site-search--open')
    toggle.setAttribute('aria-expanded', String(isOpen))
    toggle.setAttribute('aria-label', isOpen ? '收起搜尋' : '開啟搜尋')

    if (isOpen) {
      input.focus()
      return
    }

    input.value = ''
    hideSuggestions()
  })
}

const initializeSiteSearch = () => {
  // Header 與首頁都可能載入這支 script；避免重複綁定事件。
  if (siteSearchInitialized) return
  siteSearchInitialized = true

  document.querySelectorAll<HTMLFormElement>('[data-site-search]').forEach(initializeSearchForm)

  document.addEventListener('pointerdown', (event) => {
    const target = event.target
    if (!(target instanceof Node)) return

    // 點擊搜尋框外部時關閉所有開啟中的建議選單。
    document.querySelectorAll<HTMLElement>('[data-site-search]').forEach((form) => {
      if (!form.contains(target)) {
        form.querySelector<HTMLElement>('[data-search-suggestions]')?.setAttribute('hidden', '')
        form.querySelector<HTMLInputElement>('input[type="search"]')?.setAttribute('aria-expanded', 'false')
      }
    })
  })
}

export default initializeSiteSearch
