import { useTranslation } from 'next-i18next'
import { IconLookingGlass, IconCross } from '@/components/Icons'
import Drawer from '@/components/search/SearchDrawer'
import { useState } from 'react'
import { useAtom } from 'jotai'
import { searchQueryValue } from '@/src/store'
import TextLink from '../TextLink'
import useSearchRoute from '@/hooks/useSearchRoute'
import cls from 'classnames'
import { getSearchResult } from '@/lib/ssr-helpers'
import { useAtomValue } from 'jotai/utils'
import { LinkButton } from '../Button'
import { DotsLoader } from '../Loaders'
import { getSearchResults } from '@/lib/client-api'
import useSWR from 'swr'
import { useDebouncedValue } from 'rooks'
import { useRouter } from 'next/router'
/**
 * Start search only after search string length is equal or greater to TRESHOLD to reduce
 * ambiquous search terms like 'a'
 */
const TRESHOLD = 2

/** use common cache key for all query terms that do not exceed the TRESHOLD*/
const TRESHOLD_CACHE_KEY = '-'

const SEARCH_BUTTON_LABEL_ID = 'ifu-searchbar__label'

const Search = () => {
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
          className=" md:hidden w-8 h-8 text-action"
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

const SearchBar = ({ onSubmit, onChange, query }) => {
  const { t } = useTranslation('common')
  return (
    <>
      <form
        className="pt-4 max-w-topbar bg-white"
        action="/hae"
        onSubmit={onSubmit}
      >
        <label
          htmlFor={SEARCH_BUTTON_LABEL_ID}
          className={cls(
            ' mx-4 md:mx-6 text-gray-medium  transition-opacity ',
            {
              'opacity-0 duration-50': query.length === 0,
              'opacity-100 duration-150': query.length > 0,
            }
          )}
        >
          {t('search.placeholder')}
        </label>
        <div className=" flex items-center mx-2">
          <div className="overflow-hidden flex-grow h-14 border-b border-black-op5">
            <input
              type="search"
              name="search"
              id={SEARCH_BUTTON_LABEL_ID}
              autoComplete="off"
              value={query}
              onChange={onChange}
              placeholder={t('search.placeholder')}
              autoFocus
              className="ifu-search__input--topsearch"
            />
          </div>
          <div className="flex flex-none items-center h-14 border-b border-gray-light">
            <button
              type="submit"
              className="me-2.5 md:pe-2"
              title={t('buttons.search')}
              aria-label={t('buttons.search')}
            >
              <IconLookingGlass className="mx-2 -translate-y-0.5" />
            </button>
          </div>
        </div>
      </form>
      <SWRResults onShowResults={onSubmit} />
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

const Result = ({ title, url }) => (
  <p className="mb-3">
    <TextLink href={url} locale={false}>
      {title}
    </TextLink>
  </p>
)

export const SWRResults = ({ onShowResults }) => {
  const { t } = useTranslation('common')
  const _q = useAtomValue(searchQueryValue)
  const [search] = useDebouncedValue(_q, 100)
  const { locale } = useRouter()
  const cacheKey = () => {
    if (search?.length < TRESHOLD) {
      return TRESHOLD_CACHE_KEY
    }
    return `/${locale}/${search}`
  }

  const fetcher =
    search.length < TRESHOLD
      ? () => ({ results: {} })
      : (search) => getSearchResults({ search, locale })
  const { data, error, isValidating } = useSWR(cacheKey, fetcher)
  const extraResults = data?.hits?.total?.value - data?.size

  if (isValidating) {
    return (
      <div className="flex items-center mx-4 h-16">
        <DotsLoader />{' '}
      </div>
    )
  }
  return (
    <div className="mx-4 md:mx-6 mt-4">
      {data?.hits?.hits?.length < 1 && data.q !== '' && (
        <p className="h-12">{t('search.title.noresults')}</p>
      )}

      {error && <p className="h-12">{t('search.error')}</p>}

      {search.length < TRESHOLD && search.length > 0 && (
        <p className="h-12">{t('search.typemore')}</p>
      )}

      {!error &&
        data?.hits?.hits
          ?.map(getSearchResult)
          .map((r, i) => <Result {...r} key={`r-${i}`} />)}
      {!error && extraResults > 0 && (
        <div className="pt-2 border-t border-gray-hr">
          <LinkButton className="-translate-x-4" onClick={onShowResults}>
            {t('search.showmore', { more: extraResults })}
          </LinkButton>
        </div>
      )}
    </div>
  )
}

export default Search
