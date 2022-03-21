import { IconLookingGlass } from '@/components/Icons'
import useSearchRoute from '@/hooks/useSearchRoute'
import { useEffect, useState } from 'react'
import { useTranslation } from 'next-i18next'
import LanguageFilters from '@/components/search/LanguageFilters'
import { IconGlobe } from '../Icons'
import { IconCircleArrowRight } from '../Icons'

const SearchBar = ({ search }) => {
  // Sync search field with URL
  const { t } = useTranslation('common')
  const [qw, setQuery] = useState(search)
  const [show, setShow] = useState(false)
  const goToSearch = useSearchRoute({ search: qw })
  const toggle = () => setShow(!show)
  useEffect(() => {
    setQuery(search)
  }, [search, setQuery])

  return (
    <div className="my-8">
      <form
        className="flex relative items-center mb-24 lg:mb-12 border border-black"
        onSubmit={goToSearch}
      >
        <input
          type="search"
          placeholder={t('search.placeholder')}
          name="search"
          value={qw}
          onChange={({ target: { value } }) => setQuery(value)}
          className="ifu-search__input--page"
        />
        <button className="inline-flex flex-none items-center w-12 h-12">
          <IconLookingGlass className="mx-2" />
        </button>
        <div className="flex absolute -bottom-24 lg:-bottom-10 left-0 flex-wrap items-center">
          <span className="inline-block">
            <IconGlobe
              className="w-6 h-6 me-2"
              title={t('languageMenu.label')}
              disabled
            />
          </span>
          {!show && (
            <button type="button" onClick={toggle}>
              <IconCircleArrowRight className=" w-5 h-5" />
            </button>
          )}
          {show && <LanguageFilters />}
          {show && (
            <button type="button" onClick={toggle}>
              <IconCircleArrowRight className="w-5 h-5 rotate-180" />
            </button>
          )}
        </div>
      </form>
    </div>
  )
}

export default SearchBar
