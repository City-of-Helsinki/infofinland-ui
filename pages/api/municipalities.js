import { getMunicipalities } from '@/lib/ssr-api'
import { CACHE_HEADERS_10M } from '@/cache-headers'
import logger from '@/logger'
import cache from '@/lib/cacher/server-cache'

const MUNICIPALITIES_CACHE_TTL = 300

export default async function handler(req, res) {
  const { locale } = req?.query
  // No posts allowed
  if (req.method !== 'GET' || !locale) {
    res.status(400).end()
    return
  }
  let municipalities = []
  let status = 200
  let k = `municipalities-${locale}`

  if (cache.has(k)) {
    municipalities = cache.get(k)
  } else {
    municipalities = await getMunicipalities({ locale }).catch((e) => {
      logger.error('Municipalities error', { locale, e })
      throw e
    })
    cache.set(k, municipalities, MUNICIPALITIES_CACHE_TTL)
  }

  res
    .setHeader(...CACHE_HEADERS_10M)
    .status(status)
    .json(municipalities)
}
