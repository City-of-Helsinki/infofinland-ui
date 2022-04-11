import NodeCache from 'node-cache'
import { getMainMenus } from '../ssr-api'
import logger from '@/logger'
import getConfig from 'next/config'

// export const MENU_CACHE_TTL = 120
export const MENU_CACHE_TTL = 600
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
    logger.error('Error while parsin cache key',  {
      cacheKey: key,
      CACHE_NAME,
      e
    })
    return []
  }
}

const getKey = (keyObj) => {
  try {
    return JSON.stringify(keyObj)
  } catch (e) {
    logger.error('Error while creating cache key',{
      cacheKey: keyObj,
      CACHE_NAME,
      e
    })
    return []
  }
}

//Refresh menu cache entry on expiration
cache.on('expired', async (expiredKey) => {
  if (getConfig().serverRuntimeConfig.CACHE_REPOPULATE === '1') {
    const params = parseKey(expiredKey)
    logger.verbose('Menu Cache entry expired', {
      cacheKey: expiredKey,
      params,
      cacheName: CACHE_NAME,
    })
    const fresh = await getMainMenus(params)
    if (fresh) {
      logger.http('Refreshing menus ', {
        cacheKey: expiredKey,
        cacheName: CACHE_NAME,
      })
      cache.set(expiredKey, fresh)
    } else {
      logger.warn('Unable to refresh expired menu', { cacheKey: expiredKey,params })
    }
  }
})

const menuCache = {
  cache,
  getKey,
  parseKey,
}

export default menuCache
