import { IconLookingGlass } from '@/components/Icons'
import useSearchRoute from '@/hooks/useSearchRoute'
import { useEffect, useState } from 'react'
import { useTranslation } from 'next-i18next'

const SearchBar = ({ qw }) => {
  // Sync search field with URL
  const { t } = useTranslation('common')
  const [search, setQuery] = useState(qw)
  const goToSearch = useSearchRoute({ search })

  useEffect(() => {
    setQuery(qw)
  }, [qw, setQuery])

  return (
    <div className="mt-8 mb-16">
      <form
        className="flex items-center border border-black"
        onSubmit={goToSearch}
      >
        <input
          type="text"
          placeholder={t('search.placeholder')}
          name="search"
          value={search === null ? '' : search}
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
