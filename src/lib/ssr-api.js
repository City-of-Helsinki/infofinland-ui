import {
  getMenu,
  getResource,
  getResourceCollection,
  // getResourceFromContext,
  getResourceByPath,
  translatePath,
} from 'next-drupal'
import { i18n } from '../../next-i18next.config'
import { DrupalJsonApiParams } from 'drupal-jsonapi-params'
import getConfig from 'next/config'
import { CONTENT_TYPES, NODE_TYPES } from './DRUPAL_API_TYPES'
import { getMunicipalityParams, getThemeHeroParams } from './query-params'
import { getHeroFromNode } from './ssr-helpers'

import { getQueryParamsFor } from './query-params'
import cache from './cacher/server-cache'
import pageCache from './cacher/page-cache'
import menuCache from './cacher/menu-cache'
import logger from '@/logger'

export const NO_DEFAULT_LOCALE = 'dont-use'

export const menuErrorResponse = () => ({
  items: [],
  tree: [],
  error: 'menu-error',
})

// Export query params through ssr-api for convenience
export * from './query-params'

export const NOT_FOUND = { notFound: true, }

export const getCachedMenus = async (locale) => {
  const key = menuCache.getKey({ locale })
  if (menuCache.cache.has(key)) {
    logger.http('Serving menus from cache', { cacheKey: key })
    return menuCache.cache.get(key)
  }

  const menus = await getMainMenus({ locale })
  logger.http('Caching menus', { cacheKey: key, locale })
  menuCache.cache.set(key, menus)

  return menus
}

export const getCachedAboutMenu = async (locale) => {
  //Use generic cold cache for about-menu
  const menuName = getConfig().serverRuntimeConfig.DRUPAL_MENUS.ABOUT
  const key = `${menuName}-${locale}}`
  if (cache.has(key)) {
    return cache.get(key)
  }
  logger.http('Caching about-menu', { cacheKey: key })
  const menu = await getMenu(menuName, {
    locale,
    defaultLocale: NO_DEFAULT_LOCALE,
  })

  cache.set(key, menu, 600)

  return menu
}

export const getMainMenus = async ({ locale }) => {
  const { DRUPAL_MENUS } = getConfig().serverRuntimeConfig

  const [main, citiesLanding, cities, footer] = await Promise.all([
    getMenu(DRUPAL_MENUS.MAIN, {
      locale,
      defaultLocale: NO_DEFAULT_LOCALE,
    }).catch((e) => {
      logger.error('Error fetching main menu:', { e })
      return menuErrorResponse()
    }),

    getMenu(DRUPAL_MENUS.CITIES_LANDING, {
      locale,
      defaultLocale: NO_DEFAULT_LOCALE,
    }).catch((e) => {
      logger.error('Error fetching cities-main menu:', { e })
      return menuErrorResponse()
    }),

    getMenu(DRUPAL_MENUS.CITIES, {
      locale,
      defaultLocale: NO_DEFAULT_LOCALE,
    }).catch((e) => {
      logger.error('Error fetching cities menu:', { e })
      return menuErrorResponse()
    }),

    getMenu(DRUPAL_MENUS.FOOTER, {
      locale,
      defaultLocale: NO_DEFAULT_LOCALE,
    }).catch((e) => {
      logger.error('Error fetching footer menu:', { e })
      return menuErrorResponse()
    }),
  ])

  return { main, footer, cities, 'cities-landing': citiesLanding }
}

export const getNode = ({ locale, localePath, type }) =>
  getResourceByPath(localePath, {
    locale,
    defaultLocale: NO_DEFAULT_LOCALE,
    params: getQueryParamsFor(type),
  }).catch((e) => {
    logger.error(`Error requesting node %s`, localePath, {
      type,
      localePath,
      e,
    })
    // throw e
  })

export const getCachedNode = async ({ locale, localePath, type }) => {
  const key = pageCache.getKey({ locale, localePath, type })

  if (pageCache.cache.has(key)) {
    logger.http('Serving page %s from cache', localePath, {
      localePath,
      locale,
      type,
    })
    return pageCache.cache.get(key)
  }

  const node = await getNode({ locale, localePath, type })

  if (!node) {
    return null
  }

  logger.http('Caching page %s', localePath, { localePath, cacheKey: key })
  pageCache.cache.set(key, node)
  return node
}

export const getThemeHeroImages = async ({ tree, context }) => {
  const responses = await Promise.all(
    tree.map((page) => translatePath(page.url))
  )

  if (!responses) {
    return null
  }
  const ids = responses.map((node) => node?.entity?.uuid)
  if (!ids || ids.length === 0) {
    return null
  }

  const nodes = await Promise.all(
    ids.map((id) =>
      getResource(NODE_TYPES.PAGE, id, {
        locale: context.locale,
        params: getThemeHeroParams(),
      }).catch((e) => {
        logger.error('Error getting theme images for page %s', id, { id, e })
      })
    )
  )

  if (!nodes) {
    return null
  }

  return nodes.map(getHeroFromNode)
}

export const getDefaultLocaleNode = async (id) =>
  getResource(NODE_TYPES.PAGE, id, {
    locale: i18n.fallbackLocale, //fi
    defaultLocale: NO_DEFAULT_LOCALE,
    params: new DrupalJsonApiParams()
      .addFields(NODE_TYPES.PAGE, ['title'])
      .getQueryObject(),
  })

export const getMunicipalities = async ({ locale }) =>
  getResourceCollection(CONTENT_TYPES.MUNICIPALITY, {
    locale,
    defaultLocale: NO_DEFAULT_LOCALE,
    params: getMunicipalityParams(),
  })

export const getFeedbackPage = async ({ locale }) => {
  const { FEEDBACK_PAGE_PATH } = getConfig().serverRuntimeConfig
  const path = `/${locale}${FEEDBACK_PAGE_PATH}`
  const nodeMeta = await translatePath(path)
  const id = nodeMeta.entity?.uuid
  const node = await getResource(NODE_TYPES.PAGE, id, {
    locale: locale,
    defaultLocale: NO_DEFAULT_LOCALE,
    params: new DrupalJsonApiParams()
      .addInclude(['field_content'])
      .addFields(NODE_TYPES.PAGE, ['title', 'field_content'])
      .getQueryObject(),
  })

  return node
}

export const getMessages = async ({ locale, id }) => {
  const frontPageNode = await translatePath(
    getConfig().serverRuntimeConfig.DRUPAL_FRONT_PAGE
  ).catch((e) => {
    logger.error('Error resolving front page for messages', { locale, id })
    throw e
  })

  const idlist = [frontPageNode.entity.uuid]

  if (id) {
    idlist.push(id)
  }

  const params = new DrupalJsonApiParams()
    .addFields(NODE_TYPES.MESSAGE, [
      'body',
      'field_page',
      'title',
      'field_message_type',
    ])
    .addFields(NODE_TYPES.PAGE, ['title', 'field_content'])
    // Show warnings first, then notifications
    .addSort('field_message_type', 'DESC')
    .addSort('id', 'ASC')
    .addFilter('field_page.id', idlist, 'IN')
    .getQueryObject()

  return getResourceCollection(NODE_TYPES.MESSAGE, {
    locale,
    defaultLocale: NO_DEFAULT_LOCALE,
    params,
  })
}
