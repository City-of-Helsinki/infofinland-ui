import { IconLookingGlass } from '@/components/Icons'
import useSearchRoute from '@/hooks/useSearchRoute'
import { useEffect, useState } from 'react'
import { useTranslation } from 'next-i18next'

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
        className="flex items-center border border-black"
        onSubmit={goToSearch}
      >
        <input
          type="search"
          placeholder={t('search.placeholder')}
          name="search"
          value={qw}
          onChange={({ target: { value } }) => setQuery(value)}
          className=" inline-block flex-grow px-2 h-12"
        />
        <button className="flex-none w-12 h-12">
          <IconLookingGlass className="mx-2" />
        </button>
      </form>
    </div>
  )
}

export default SearchBar
