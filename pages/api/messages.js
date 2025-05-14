import { getMessages } from '@/lib/ssr-api'
import { CACHE_HEADERS_10M } from '@/cache-headers'
import logger from '@/logger'
import cache from '@/lib/cacher/server-cache'

const MESSAGES_CACHE_TTL = 600

export default async function handler(req, res) {
  const { id, locale } = req?.query || {}
  const k = `messages-${locale}-${id}`
  // No posts allowed, no missing params-errors revealed.
  if (req.method !== 'GET' || !locale) {
    res.status(400).json(messages)
    return
  }
  let status = 200
  let messages = []
  if (cache.has(k)) {
    messages = cache.get(k)
  } else {
    messages = await getMessages({ locale, id }).catch((e) => {
      logger.error('Messages error', { id, locale, e })
      throw e
    })

    cache.set(k, messages, MESSAGES_CACHE_TTL)
  }

  res
    .setHeader(...CACHE_HEADERS_10M)
    .status(status)
    .json(messages)
}
