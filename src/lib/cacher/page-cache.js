import NodeCache from 'node-cache'
import { getNode } from '../ssr-api'
import logger from '@/logger'
import getConfig from 'next/config'
/**
 *
 * Cache instance for pages. Updates entry upon expiration to keep it fresh
 *
 */

const CACHE_NAME = 'Page Cache'

const stdTTL = process.env.NODE_ENV !== 'production' ? 10 : 60
const checkperiod = process.env.NODE_ENV !== 'production' ? 30 : 45

const cache = new NodeCache({ stdTTL, checkperiod })

const parseKey = (key) => {
  try {
    return JSON.parse(key)
  } catch (e) {
    logger.error('Error while parsin cache key', e, {
      cacheKey: key,
      CACHE_NAME,
    })
    return []
  }
}

const getKey = (keyObj) => {
  try {
    return JSON.stringify(keyObj)
  } catch (e) {
    logger.error('Error while creating cache key', e, {
      cacheKey: keyObj,
      CACHE_NAME,
    })
    return []
  }
}

//Refresh page cache entry on expiration
cache.on('expired', async (expiredKey) => {
  if (getConfig().serverRuntimeConfig.CACHE_REPOPULATE === '1') {
    console.debug('Page cache key expired,cache repopulation is ON', {
      cacheRepopulate: '1',
      expiredKey,
    })
    const params = parseKey(expiredKey)
    logger.info('Cache entry expired', {
      cacheKey: expiredKey,
      params,
      cacheName: CACHE_NAME,
    })
    const fresh = await getNode(params)
    if (fresh) {
      logger.info('Refreshing entry ', {
        cacheKey: expiredKey,
        cacheName: CACHE_NAME,
      })
      cache.set(expiredKey, fresh)
    } else {
      logger.warn('Unable to refresh expired entry', { cacheKey: expiredKey })
    }
  }
})

const pageCache = {
  cache,
  getKey,
  parseKey,
}

export default pageCache
