import { getResource } from 'next-drupal'
import { NODE_TYPES } from '@/lib/DRUPAL_API_TYPES'
import { getLocalInfoParams } from '@/lib/query-params'
import { CACHE_HEADERS_60S } from '@/cache-headers'
import logger from '@/logger'

export default async function handler(req, res) {
  // No posts allowed
  if (req.method !== 'GET') {
    res.status(400).end()
    return
  }

  const { query } = req
  const { id } = query

  let status = 200
  const node = await getResource(NODE_TYPES.PAGE, id, {
    params: getLocalInfoParams(),
  }).catch((e) => {
    if (e.message === 'Not Found') {
      logger.warn('No local info found for page %s', id, { id, e })
      return null
    }
    logger.error('Error in local info fetch.', { id, e })

    throw e
  })

  if (node === null) {
    status = 404
  }

  res
    .setHeader(...CACHE_HEADERS_60S)
    .status(status)
    .json({
      node,
    })
}
