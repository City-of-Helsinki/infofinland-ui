import { useAtomValue } from 'jotai/utils'
import { searchQueryValue, getSearchResults } from '../store'
import useSWR from 'swr'
export default function useSearchResults() {
  const q = useAtomValue(searchQueryValue)
  const cacheKey = () => (q.length < 3 ? '-' : q)
  const fetcher = q.length < 3 ? () => [] : getSearchResults
  const { data: results } = useSWR(cacheKey, fetcher, { suspense: true })
  return results
}
