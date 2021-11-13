import { useAtomValue } from 'jotai/utils'
import { searchQueryValue, getSearchResults } from '../store'
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
  const [q] = useDebouncedValue(_q, 300)
  const cacheKey = () => (q.length < TRESHOLD ? TRESHOLD_CACHE_KEY : q)
  const fetcher = q.length < TRESHOLD ? () => [] : getSearchResults
  const { data: results } = useSWR(cacheKey, fetcher, { suspense: true })
  return results
}
