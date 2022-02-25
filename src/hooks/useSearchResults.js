import { useAtomValue } from 'jotai/utils'
import { searchQueryValue } from '../store'
import { getSearchResults } from '@/lib/client-api'
import useSWR from 'swr'
import { useDebouncedValue } from 'rooks'

/**
 * Start search only after TRESHOLD is exceeded to reduce
 * ambiquous search terms like 'a'
 */
const TRESHOLD = 3

/** use common cache key for all query terms that do not exceed the TRESHOLD*/
const TRESHOLD_CACHE_KEY = '-'

/**
 * get search results based on current searchQueryValue
 *
 * Debounce the keyword value to reduce redundant network load
 *
 * use SWR for caching results to further reduce redundant network load
 * @return {array} list of results
 */
export default function useSearchResults() {
  const _q = useAtomValue(searchQueryValue)
  const [search] = useDebouncedValue(_q, 200)
  const cacheKey = () =>
    search.length < TRESHOLD ? TRESHOLD_CACHE_KEY : search
  const fetcher = search.length < TRESHOLD ? () => [] : getSearchResults
  const { data: results } = useSWR(cacheKey, fetcher, { suspense: true })
  return results
}
