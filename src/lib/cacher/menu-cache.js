import NodeCache from 'node-cache'
import { getMainMenus } from '../ssr-api'
import logger from '@/logger'
import getConfig from 'next/config'

export const MENU_CACHE_TTL = 120
/**
 *  Cache instance for menus. Cached for two (2)  minutes in production
 *  Could propably  be much longer.
 *  Update any expired entry.
 *
 */

const CACHE_NAME = 'Menu Cache'

const stdTTL = process.env.NODE_ENV !== 'production' ? 10 : MENU_CACHE_TTL
const checkperiod = process.env.NODE_ENV !== 'production' ? 30 : 60

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

//Refresh menu cache entry on expiration
cache.on('expired', async (expiredKey) => {
  if (getConfig().serverRuntimeConfig.CACHE_REPOPULATE === '1') {
    logger.debug(' Menue cache key expired,cache repopulation is ON', {
      cacheRepopulate: '1',
      expiredKey,
    })
    const params = parseKey(expiredKey)
    logger.info('Cache entry expired', {
      cacheKey: expiredKey,
      params,
      cacheName: CACHE_NAME,
    })
    const fresh = await getMainMenus(params)
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

const menuCache = {
  cache,
  getKey,
  parseKey,
}

export default menuCache
