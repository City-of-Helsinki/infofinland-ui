import Result from '@/components/search/Result'
import { getSearchResult } from '@/lib/ssr-helpers'
import { useAtomValue } from 'jotai/utils'

import { searchResultsAtom, searchResultsTermAtom } from '@/src/store'

const SearchResults = () => {
  const q = useAtomValue(searchResultsTermAtom)
  const results = useAtomValue(searchResultsAtom)
  if (!results || results?.length < 1) {
    return {}
  }

  return results
    ?.map(getSearchResult)
    .map((r) => <Result key={`result-${q}-${r.id}`} {...r} search={q} />)
}

export default SearchResults
