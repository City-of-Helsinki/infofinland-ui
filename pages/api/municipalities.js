import { getMunicipalities } from '@/lib/ssr-api'
import { CACHE_HEADERS_10M } from '@/cache-headers'
import logger from '@/logger'
import cache from '@/lib/server-cache'

const cacheKey = (locale) => `municipalities-${locale}`

export default async function handler(req, res) {
  const { locale } = req?.query
  // No posts allowed
  if (req.method !== 'GET' || !locale) {
    res.status(400).end()
    return
  }

  let status = 200
  let municipalities = cache.get(cacheKey(locale))
  if (!municipalities) {
    municipalities = await getMunicipalities({ locale }).catch((e) => {
      logger.error('Municipalities error', { locale, e })
      return []
    })
    cache.set(cacheKey(locale), municipalities, 600)
  }

  res
    .setHeader(...CACHE_HEADERS_10M)
    .status(status)
    .json(municipalities)
}
