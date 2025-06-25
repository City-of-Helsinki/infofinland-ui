import cls from 'classnames'
import { getSearchResult } from '@/lib/ssr-helpers'
import { useAtomValue } from 'jotai'
import { LinkButton } from '../Button'
import { DotsLoader } from '../Loaders'
import { getSearchResults } from '@/lib/client-api'
import useSWR from 'swr'
import { useDebouncedValue } from 'rooks'
import { useRouter } from 'next/router'
import TextLink from '../TextLink'
import { useTranslation } from 'next-i18next'
import { IconLookingGlass } from '@/components/Icons'
import { searchQueryValue } from '@/src/store'

/**
 * Start search only after search string length is equal or greater to TRESHOLD to reduce
 * ambiquous search terms like 'a'
 */

const TRESHOLD = 2

/** use common cache key for all query terms that do not exceed the TRESHOLD*/
const TRESHOLD_CACHE_KEY = '-'

const SEARCH_BUTTON_LABEL_ID = 'ifu-searchbar__label'

const TopSearchBar = ({ onSubmit, onChange, query }) => {
  const { t } = useTranslation('common')
  return (
    <section>
      <form
        className="pt-4 max-w-topbar bg-white"
        action="/hae"
        onSubmit={onSubmit}
      >
        <label
          htmlFor={SEARCH_BUTTON_LABEL_ID}
          className={cls(' mx-4 md:mx-6 text-gray-dark  transition-opacity ', {
            'opacity-0 duration-50': query.length === 0,
            'opacity-100 duration-150': query.length > 0,
          })}
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
    </section>
  )
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
  const [rawSearch] = useDebouncedValue(_q, 100)
  const search = rawSearch.trim()
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
      : () => getSearchResults({ search, locale })
  const { data, error, isValidating } = useSWR(cacheKey, fetcher)
  const extraResults = data?.hits?.total?.value - data?.size

  if (isValidating) {
    return (
      <div className="flex items-center mx-4 max-w-topbar h-16">
        <DotsLoader />
      </div>
    )
  }
  return (
    <section className="mx-4 md:mx-6 mt-4">
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
    </section>
  )
}

export default TopSearchBar
