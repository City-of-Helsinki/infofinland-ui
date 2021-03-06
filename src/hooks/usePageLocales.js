import { getLocalesForPath } from '@/lib/client-api'
import useSWR from 'swr'

// use404Locales.js
export default function usePageLocales({ path }) {
  const cacheKey = path ? path : null
  const fetcher = () => getLocalesForPath({ path })
  return useSWR(cacheKey, fetcher)
}
