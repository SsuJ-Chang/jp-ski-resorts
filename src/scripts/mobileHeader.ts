const header = document.querySelector<HTMLElement>('.site-header')
const menuToggle = header?.querySelector<HTMLButtonElement>('[data-menu-toggle]')
const nav = header?.querySelector<HTMLElement>('#site-header-nav')
const searchForm = header?.querySelector<HTMLElement>('[data-site-search]')
const searchToggle = searchForm?.querySelector<HTMLButtonElement>('.site-search__toggle')

if (header && menuToggle && nav) {
  const mobileLayout = window.matchMedia('(max-width: 820px)')

  const setMenuOpen = (open: boolean) => {
    header.classList.toggle('site-header--menu-open', open)
    menuToggle.setAttribute('aria-expanded', String(open))
    menuToggle.setAttribute('aria-label', open ? '關閉選單' : '開啟選單')
  }

  const closeSearch = () => {
    if (searchForm?.classList.contains('site-search--open')) searchToggle?.click()
  }

  menuToggle.addEventListener('click', () => {
    const opening = !header.classList.contains('site-header--menu-open')
    if (opening) closeSearch()
    setMenuOpen(opening)
  })

  searchToggle?.addEventListener('click', () => setMenuOpen(false), { capture: true })

  nav.addEventListener('click', (event) => {
    if ((event.target as Element).closest('a, button')) setMenuOpen(false)
  })

  document.addEventListener('pointerdown', (event) => {
    if (!mobileLayout.matches || header.contains(event.target as Node)) return
    setMenuOpen(false)
    closeSearch()
  })

  document.addEventListener('keydown', (event) => {
    if (event.key !== 'Escape' || !mobileLayout.matches) return

    if (header.classList.contains('site-header--menu-open')) {
      setMenuOpen(false)
      menuToggle.focus()
    } else if (searchForm?.classList.contains('site-search--open')) {
      closeSearch()
      searchToggle?.focus()
    }
  })

  mobileLayout.addEventListener('change', () => {
    setMenuOpen(false)
    closeSearch()
  })
}
