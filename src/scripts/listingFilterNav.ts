type FilterOptionInput = HTMLInputElement & {
  dataset: DOMStringMap & {
    filterParam?: string
    optionLabel?: string
  }
}

type FilterLabel = HTMLElement & {
  dataset: DOMStringMap & {
    filterParam?: string
    allLabel?: string
  }
}

const getFilterParams = (options: FilterOptionInput[]) =>
  Array.from(
    new Set(
      options
        .map((option) => option.dataset.filterParam)
        .filter((param): param is string => Boolean(param)),
    ),
  )

const getOptionsByParam = (options: FilterOptionInput[], param: string) =>
  options.filter((option) => option.dataset.filterParam === param)

const getLabelByParam = (labels: FilterLabel[], param: string) =>
  labels.find((label) => label.dataset.filterParam === param)

const updateLabel = (
  param: string,
  labels: FilterLabel[],
  options: FilterOptionInput[],
) => {
  const label = getLabelByParam(labels, param)
  if (!label) return

  const optionsByParam = getOptionsByParam(options, param)
  const selectedOptions = optionsByParam.filter((option) => option.checked)
  const allLabel = label.dataset.allLabel ?? ''

  if (selectedOptions.length === 0 || selectedOptions.length === optionsByParam.length) {
    label.textContent = allLabel
    return
  }

  const selectedNames = selectedOptions.map((option) => option.dataset.optionLabel ?? option.value)
  const visibleNames = selectedNames.slice(0, 2).join('、')
  const hiddenCount = selectedNames.length - 2
  const suffix = hiddenCount > 0 ? ` +${hiddenCount}` : ''

  label.textContent = `${visibleNames}${suffix}`
}

const updateLabels = (
  filterParams: string[],
  labels: FilterLabel[],
  options: FilterOptionInput[],
) => {
  for (const param of filterParams) updateLabel(param, labels, options)
}

const buildFilterUrl = (
  basePath: string,
  filterParams: string[],
  options: FilterOptionInput[],
) => {
  const currentParams = new URLSearchParams(window.location.search)
  const nextParams = new URLSearchParams()
  const currentSearchQuery = currentParams.get('q')

  if (currentSearchQuery) nextParams.set('q', currentSearchQuery)

  for (const param of filterParams) {
    const optionsByParam = getOptionsByParam(options, param)
    const selectedOptions = optionsByParam.filter((option) => option.checked)

    if (selectedOptions.length === optionsByParam.length) continue

    for (const option of selectedOptions) {
      nextParams.append(param, option.value)
    }
  }

  const queryString = nextParams.toString()
  return queryString ? `${basePath}?${queryString}` : basePath
}

const hydrateSelectedOptions = (
  filterParams: string[],
  options: FilterOptionInput[],
) => {
  const currentParams = new URLSearchParams(window.location.search)
  const selectedValuesByParam = new Map(
    filterParams.map((param) => [param, new Set(currentParams.getAll(param).filter(Boolean))]),
  )

  for (const option of options) {
    const selectedValues = selectedValuesByParam.get(option.dataset.filterParam ?? '')
    option.checked = selectedValues?.has(option.value) ?? false
  }
}

const initListingFilter = (block: HTMLElement) => {
  const basePath = block.dataset.filterBasePath ?? window.location.pathname
  const menus = Array.from(block.querySelectorAll<HTMLDetailsElement>('[data-filter-menu]'))
  const forms = Array.from(block.querySelectorAll<HTMLFormElement>('[data-filter-form]'))
  const labels = Array.from(block.querySelectorAll<FilterLabel>('[data-filter-label]'))
  const clearButtons = Array.from(block.querySelectorAll<HTMLButtonElement>('[data-filter-clear]'))
  const options = Array.from(block.querySelectorAll<FilterOptionInput>('[data-filter-option]'))
  const filterParams = getFilterParams(options)

  hydrateSelectedOptions(filterParams, options)
  updateLabels(filterParams, labels, options)

  for (const option of options) {
    option.addEventListener('change', () =>
      updateLabel(option.dataset.filterParam ?? '', labels, options),
    )
  }

  for (const clearButton of clearButtons) {
    clearButton.addEventListener('click', () => {
      const param = clearButton.dataset.filterParam ?? ''

      for (const option of getOptionsByParam(options, param)) {
        option.checked = false
      }

      updateLabel(param, labels, options)
    })
  }

  for (const form of forms) {
    form.addEventListener('submit', (event) => {
      event.preventDefault()
      window.location.assign(buildFilterUrl(basePath, filterParams, options))
    })
  }

  for (const menu of menus) {
    menu.addEventListener('toggle', () => {
      if (!menu.open) return

      for (const otherMenu of menus) {
        if (otherMenu !== menu) otherMenu.open = false
      }
    })
  }

  document.addEventListener('click', (event) => {
    for (const menu of menus) {
      if (!menu.open) continue
      if (event.target instanceof Node && menu.contains(event.target)) continue
      menu.open = false
    }
  })
}

const initializeListingFilterNav = () => {
  for (const block of document.querySelectorAll<HTMLElement>('[data-listing-filter]')) {
    initListingFilter(block)
  }
}

export default initializeListingFilterNav
