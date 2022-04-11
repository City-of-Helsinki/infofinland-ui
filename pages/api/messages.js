import { getMessages } from '@/lib/ssr-api'
import { CACHE_HEADERS_60S } from '@/cache-headers'
import logger from '@/logger'
import cache from '@/lib/cacher/server-cache'

export default async function handler(req, res) {
  const { id, locale } = req?.query
  const k = `messages-${locale}-${id}`
  // No posts allowed, no missing params-errors revealed.
  if (req.method !== 'GET' || !locale) {
    res.status(400).json(messages)
    return
  }
  let status = 200

  let messages = cache.get(k)
  if (!messages) {
    messages = await getMessages({ locale, id })
      .then((messages) => {
        cache.set(k, messages, 120)
        return messages
      })
      .catch((e) => {
        logger.warn('Messages error', { id, locale, e })
        return []
      })
  }

  res
    .setHeader(...CACHE_HEADERS_60S)
    .status(status)
    .json(messages)
}
