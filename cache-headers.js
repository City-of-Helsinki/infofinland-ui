export const CACHE_HEADERS_30S = [
  'Cache-Control',
  'public, s-maxage=30, stale-while-revalidate=60',
]

export const CACHE_HEADERS_60S = [
  'Cache-Control',
  'public, s-maxage=60, stale-while-revalidate=100',
]
export const CACHE_HEADERS_10M = ['Cache-Control', 'public, s-maxage=600']
