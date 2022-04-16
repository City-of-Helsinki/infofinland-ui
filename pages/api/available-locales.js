import { i18n } from '@/next-i18next.config'
import { translatePath } from 'next-drupal'
import { CACHE_HEADERS_10M } from '@/cache-headers'
import logger from '@/logger'
import cache from '@/lib/cacher/server-cache'

const LOCALES_CACHE_TTL = 300

export default async function handler(req, res) {
  // No posts allowed
  if (req.method !== 'GET') {
    res.status(400).end()
    return
  }
  const { query } = req
  const { path } = query
  const k = `locales-for-${path}`
  let status = 200
  let response = []
  let nodes = cache.get(k)
  if (!nodes) {
    nodes = await Promise.all(
      i18n.locales.map(async (locale) => {
        const localePath = `/${locale}${path}`
        const node = await translatePath(localePath)
        return { locale, node }
      })
    ).catch((e) => {
      logger.error('API error while resolving locales.', { path }, e)
      throw e
    })
    cache.set(k, nodes, LOCALES_CACHE_TTL)
  }
  if (nodes === null) {
    status = 404
  } else {
    response = nodes
      .map(({ locale, node }) => {
        if (!node || locale !== node.entity.langcode) {
          return null
        }

        return { locale: node.entity.langcode, id: node.entity.id, path }
      })
      .filter((l) => l !== null)
  }

  res
    .setHeader(...CACHE_HEADERS_10M)
    .status(status)
    .json(response)
}
