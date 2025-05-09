import { IconLookingGlass } from '@/components/Icons'
import useSearchRoute from '@/hooks/useSearchRoute'
import { useEffect, useState } from 'react'
import { useTranslation } from 'next-i18next'
import LanguageFilters from '@/components/search/LanguageFilters'
import DOMPurify from "isomorphic-dompurify";

const SearchBar = ({ search }) => {
  // Sync search field with URL
  const { t } = useTranslation('common')
  const [qw, setQuery] = useState(search)
  const goToSearch = useSearchRoute({ search: qw })
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
          value={qw || ''}
          onChange={({ target: { value } }) => setQuery(DOMPurify.sanitize(value))}
          className="ifu-search__input--page"
        />
        <button className="inline-flex flex-none items-center w-12 h-12">
          <IconLookingGlass className="mx-2" />
        </button>
        <LanguageFilters />
      </form>
    </div>
  )
}

export default SearchBar
