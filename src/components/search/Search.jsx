import useTranslation from 'next-translate/useTranslation'
import { IconLookingGlass } from '@/components/Icons'
import Drawer from '@/components/layout/Drawer'
import { useState } from 'react'
// import { getSearchResults } from '@/src/store'

import { useAtom } from 'jotai'
import { useAtomValue } from 'jotai/utils'
import { searchQueryValue, fetchSearchResults } from '@/src/store'
import { Suspense } from 'react'
import useSWR from 'swr'
const Search = () => {
  const [isOpen, setVisibility] = useState(false)
  const [query, setQuery] = useAtom(searchQueryValue)
  const { t } = useTranslation('common')
  return (
    <>
      <div className=" flex-none 2xl:flex-grow">
        <button
          onClick={() => setVisibility(!isOpen)}
          className=" w-8 md:w-24 h-8 text-action"
          title={t('buttons.search')}
        >
          <span className="px-2 transform translate-y-0.5">
            <IconLookingGlass className="" />
          </span>

          <span className="hidden md:inline-block">{t('buttons.search')}</span>
        </button>
      </div>
      <Drawer close={() => setVisibility(false)} isOpen={isOpen}>
        <form className="bg-white">
          <div className="flex py-4 mx-4 border-gray-lighter">
            <div className="overflow-hidden flex-grow ms-4">
              <input
                type="text"
                value={query}
                onChange={({ target: { value } }) => setQuery(value)}
                name=""
                placeholder="Hae hakusanalla..."
                id=""
                className="py-3 px-1 text-h3 md:text-h3xl outline-none"
              />
            </div>
            <div className="flex-none">
              <button type="submit" className="inline-block">
                <IconLookingGlass className="mx-4" />
              </button>
            </div>
          </div>
        </form>
        <Suspense fallback="loading...">
          <SearchResults />
        </Suspense>
        {/* <Suspense fallback="loading...">
          <SWRResults/>
        </Suspense> */}
      </Drawer>
    </>
  )
}

const Result = ({ title, url }) => (
  <p className="mb-4">
    {title}
    <br />
    {url}
  </p>
)

const SearchResults = () => {
  const results = useAtomValue(fetchSearchResults)
  return results.map((r, i) => <Result {...r} key={`r-${i}`} />)
}

// const SWRResults = () =>{
//   const q = useAtomValue(searchQueryValue)
//   const cacheKey = () => q === '' ? false: q
//   const {data:results } = useSWR(cacheKey,getSearchResults,{suspense:true})

//   return results.map( (r,i) => <Result {...r} key={`r-${i}`}/>    )

// }

export default Search
