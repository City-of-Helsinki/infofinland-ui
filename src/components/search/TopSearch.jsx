import { useTranslation } from 'next-i18next'
import { IconLookingGlass, IconCross } from '@/components/Icons'
import Drawer from '@/components/search/SearchDrawer'
import { useState } from 'react'
import { useAtom } from 'jotai'
import { searchQueryValue } from '@/src/store'
import useSearchRoute from '@/hooks/useSearchRoute'
import dynamic from 'next/dynamic'

const SearchBar = dynamic(() => import('./TopSearchBar'), { ssr: false })

const TopSearch = () => {
  const [isSearchOpen, setVisibility] = useState({
    desktop: false,
    mobile: false,
  })
  const [query, setQuery] = useAtom(searchQueryValue)
  const { t } = useTranslation('common')

  const closeAll = () => {
    setVisibility({ desktop: false, mobile: false })
  }
  const reset = () => {
    closeAll()
    // And reset top menu search bar query word
    setQuery('')
  }
  const onSubmit = useSearchRoute({ onSubmit: reset, search: query })

  const onChange = ({ target: { value } }) => setQuery(value)

  return (
    <>
      <div className="flex-none text-right md:w-26 md:pe-4">
        <button
          onClick={() =>
            setVisibility({ desktop: false, mobile: !isSearchOpen.mobile })
          }
          className=" md:hidden w-8 ms-2 h-8 text-action"
          title={t('buttons.search')}
          aria-expanded={isSearchOpen.mobile}
          aria-haspopup="dialog"
        >
          <span className="px-2 transform translate-y-0.5">
            {!isSearchOpen.mobile && <IconLookingGlass className="" />}
            {isSearchOpen.mobile && <IconCross className="me-2" />}
          </span>
        </button>
        <button
          onClick={() =>
            setVisibility({ desktop: !isSearchOpen.desktop, mobile: false })
          }
          className=" hidden md:inline-block h-8 text-action text-right"
          title={
            isSearchOpen.desktop ? t('buttons.close') : t('buttons.search')
          }
        >
          <span className="px-2 transform translate-y-0.5">
            {!isSearchOpen.desktop && <IconLookingGlass className="" />}
            {isSearchOpen.desktop && <IconCross className="me-2" />}
          </span>
          {!isSearchOpen.desktop && (
            <span className="hidden md:inline-block">
              {t('buttons.search')}
            </span>
          )}
        </button>
      </div>
      {/* Mobile */}
      <Drawer close={closeAll} isOpen={isSearchOpen.mobile}>
        <SearchBar onSubmit={onSubmit} onChange={onChange} query={query} />
      </Drawer>

      {/* Desktop */}
      <SearchDesktopBar close={closeAll} isOpen={isSearchOpen.desktop}>
        <SearchBar onSubmit={onSubmit} onChange={onChange} query={query} />
      </SearchDesktopBar>
    </>
  )
}

const SearchDesktopBar = ({ children, isOpen }) => {
  return isOpen ? (
    <div className=" hidden md:block overflow-visible absolute top-20 right-0 left-0 pb-2 h-24 md:h-auto bg-white shadow-topbar">
      <div className="">{children}</div>
    </div>
  ) : null
}

export default TopSearch
