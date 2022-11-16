import { NODE_TYPES } from '@/lib/DRUPAL_API_TYPES'
import { getLocalInfoParams } from '@/lib/query-params'
import { CACHE_HEADERS_10M } from '@/cache-headers'
import logger from '@/logger'
import { NO_DEFAULT_LOCALE } from '@/lib/ssr-api'
import getDrupalClient from '@/lib/drupal-client'

export default async function handler(req, res) {
  // No posts allowed
  if (req.method !== 'GET') {
    res.status(400).end()
    return
  }
  const drupal = getDrupalClient()

  const { query } = req
  const { id, locale } = query
  let status = 200
  const node = await drupal
    .getResource(NODE_TYPES.PAGE, id, {
      locale,
      defaultLocale: NO_DEFAULT_LOCALE,
      params: getLocalInfoParams(),
    })
    .catch((e) => {
      if (e.message === 'Not Found') {
        logger.info('No local info found for page %s', id, { id, e })
        return null
      }
      logger.error('Error in local info fetch.', { id, e })

      throw e
    })

  if (node === null) {
    status = 404
    res.status(status).end()
    return
  }

  res
    .setHeader(...CACHE_HEADERS_10M)
    .status(status)
    .json({
      node,
    })
}
