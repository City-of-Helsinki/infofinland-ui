import { DrupalJsonApiParams } from 'drupal-jsonapi-params'
import getConfig from 'next/config'
import { CONTENT_TYPES, NODE_TYPES } from './DRUPAL_API_TYPES'
import { getMenuParams, getMunicipalityParams, getThemeHeroParams } from './query-params'
import { getHeroFromNode, getRedirect } from './ssr-helpers'

import { getQueryParamsFor } from './query-params'
import cache from './cacher/server-cache'
import pageCache from './cacher/page-cache'
import menuCache from './cacher/menu-cache'
import logger from '@/logger'
import getDrupalClient from './drupal-client'

export const NO_DEFAULT_LOCALE = 'dont-use'

export const menuErrorResponse = () => ({
  items: [],
  tree: [],
  error: 'menu-error',
})

// Export query params through ssr-api for convenience
export * from './query-params'

export const NOT_FOUND = { notFound: true, revalidate: 3 }

export const getCachedMenus = async ({ locale, withAuth }) => {
  const key = menuCache.getKey({ locale })
  if (menuCache.cache.has(key)) {
    logger.http('Serving menus from cache', { cacheKey: key })
    return menuCache.cache.get(key)
  }

  const menus = await getMainMenus({ locale, withAuth })
  logger.http('Caching menus', { cacheKey: key, locale })
  //Note, withAuth disables cache as it may cause a leak to published site at this point.
  // Needs further refactoring
  if (!withAuth) {
    menuCache.cache.set(key, menus)
  }
  return menus
}

export const getCachedAboutMenus = async ({ locale, withAuth }) => {
  const { DRUPAL_MENUS } = getConfig().serverRuntimeConfig
  const key = `about-menus-${locale}}`
  const drupal = getDrupalClient(withAuth)

  if (cache.has(key)) {
    logger.http('Serving about-menus from cache', { cacheKey: key })
    return cache.get(key)
  }

  const [about, footer] = await Promise.all([
    drupal.getMenu(DRUPAL_MENUS.ABOUT, {
      locale,
      defaultLocale: NO_DEFAULT_LOCALE,
      params: getMenuParams(),
    }),
    drupal.getMenu(DRUPAL_MENUS.FOOTER, {
      locale,
      defaultLocale: NO_DEFAULT_LOCALE,
      params: getMenuParams(),
    }),
  ])

  const menus = { about, footer }
  logger.http('Caching about-menu', { cacheKey: key })
  if (!withAuth) {
    cache.set(key, menus, 600)
  }
  return menus
}

export const getCachedMainMenus = async ({ locale, withAuth }) => {
  const { DRUPAL_MENUS } = getConfig().serverRuntimeConfig
  const key = `main-menus-${locale}}`
  const drupal = getDrupalClient(withAuth)

  if (cache.has(key)) {
    logger.http('Serving main-menus from cache', { cacheKey: key })
    return cache.get(key)
  }

  const [main] = await Promise.all([
    drupal.getMenu(DRUPAL_MENUS.MAIN, {
      locale,
      defaultLocale: NO_DEFAULT_LOCALE,
      params: getMenuParams(),
    }),
  ])

  const menus = { main }
  logger.http('Caching main-menu', { cacheKey: key })
  if (!withAuth) {
    cache.set(key, menus, 600)
  }
  return menus
}

export const getCachedCitiesMenus = async ({ locale, withAuth }) => {
  const { DRUPAL_MENUS } = getConfig().serverRuntimeConfig
  const key = `cities-menus-${locale}}`
  const drupal = getDrupalClient(withAuth)

  if (cache.has(key)) {
    logger.http('Serving cities-menus from cache', { cacheKey: key })
    return cache.get(key)
  }

  const [cities] = await Promise.all([
    drupal.getMenu(DRUPAL_MENUS.CITIES, {
      locale,
      defaultLocale: NO_DEFAULT_LOCALE,
      params: getMenuParams(),
    }),
  ])

  const menus = { cities }
  logger.http('Caching cities-menu', { cacheKey: key })
  if (!withAuth) {
    cache.set(key, menus, 600)
  }
  return menus
}

export const getMainMenus = async ({ locale, withAuth }) => {
  const { DRUPAL_MENUS } = getConfig().serverRuntimeConfig
  const drupal = getDrupalClient(withAuth)
  const [main, citiesLanding, cities, footer] = await Promise.all([
    drupal
      .getMenu(DRUPAL_MENUS.MAIN, {
        locale,
        defaultLocale: NO_DEFAULT_LOCALE,
        params: getMenuParams(),
      })
      .catch((e) => {
        logger.error('Error fetching main menu:', { e, locale })
        return menuErrorResponse()
      }),

    drupal
      .getMenu(DRUPAL_MENUS.CITIES_LANDING, {
        locale,
        defaultLocale: NO_DEFAULT_LOCALE,
        params: getMenuParams(),
      })
      .catch((e) => {
        logger.error('Error fetching cities-main menu:', { e, locale })
        return menuErrorResponse()
      }),

    drupal
      .getMenu(DRUPAL_MENUS.CITIES, {
        locale,
        defaultLocale: NO_DEFAULT_LOCALE,
        params: getMenuParams(),
      })
      .catch((e) => {
        logger.error('Error fetching cities menu:', { e, locale })
        return menuErrorResponse()
      }),

    drupal
      .getMenu(DRUPAL_MENUS.FOOTER, {
        locale,
        defaultLocale: NO_DEFAULT_LOCALE,
        params: getMenuParams(),
      })
      .catch((e) => {
        logger.error('Error fetching footer menu:', { e, locale })
        return menuErrorResponse()
      }),
  ])

  return { main, footer, cities, 'cities-landing': citiesLanding }
}

const RETRY_LIMIT = 10
export const getNode = async ({
  locale,
  localePath,
  type,
  retry = 0,
  withAuth,
  uuid,
}) => {
  const getter = () =>
    getDrupalClient(withAuth)
      .getResource(type, uuid, {
        params: getQueryParamsFor(type),
        locale,
        defaultLocale: NO_DEFAULT_LOCALE,
      })
      .catch((e) => {
        logger.error(`Error requesting node %s`, localePath, {
          type,
          localePath,
          e,
        })
        return null
        // throw e
      })

  if (retry < 1) {
    return getter()
  }

  let node = null
  let attempts = 0
  while (node === null && attempts <= retry - 1 && attempts <= RETRY_LIMIT) {
    if (attempts > 0) {
      logger.warn('Retry attempts %s for %s', attempts, localePath)
      await new Promise((res) => setTimeout(res, 1000))
    }

    node = await getter()
    attempts++
  }
  if (!node) {
    logger.error(
      'Unable to get page %s after %s attempts',
      localePath,
      attempts
    )
    throw `Unable to get page ${localePath} after ${retry} attempts`
  }
  return node
}

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

  logger.http('Caching page %s', localePath, {
    localePath,
    cacheKey: key,
    node: node.id,
  })
  pageCache.cache.set(key, node)
  return node
}

export const getThemeHeroImages = async ({ tree, context, withAuth }) => {
  const drupal = getDrupalClient(withAuth)
  const responses = await Promise.all(
    tree.map((page) => drupal.translatePath(page.url))
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
      drupal
        .getResource(NODE_TYPES.PAGE, id, {
          locale: context.locale,
          params: getThemeHeroParams(),
        })
        .catch((e) => {
          logger.error('Error getting theme images for page %s', id, { id, e })
        })
    )
  )

  if (!nodes) {
    return null
  }

  return nodes.map(getHeroFromNode)
}

// 3  minutes cache for municipalities
const MUNICIPALITIES_CACHE_TTL = 300

export const getCachedMunicipalities = async ({ locale, withAuth }) => {
  let k = `municipalities-${locale}`
  if (cache.has(k)) {
    logger.http('serving municipalities from cache', { key: k })
    return cache.get(k)
  } else {
    const municipalities = await getMunicipalities({ locale, withAuth }).catch(
      (e) => {
        logger.error('Municipalities error', { locale, e })
        return []
      }
    )

    if (municipalities.length > 0) {
      logger.http('caching municipalities', { key: k })
      cache.set(k, municipalities, MUNICIPALITIES_CACHE_TTL)
    }
    return municipalities
  }
}

export const getMunicipalities = async ({ locale, withAuth }) =>
  getDrupalClient(withAuth).getResourceCollection(CONTENT_TYPES.MUNICIPALITY, {
    locale,
    defaultLocale: NO_DEFAULT_LOCALE,
    params: getMunicipalityParams(),
  }).then(
    // Filter unused properties:
    municipalities => municipalities.map(municipality => ({
      id: municipality.id,
      name: municipality.name,
    }))
  )

export const getFeedbackPage = async ({ locale }) => {
  const { FEEDBACK_PAGE_PATH } = getConfig().serverRuntimeConfig
  const path = `/${locale}${FEEDBACK_PAGE_PATH}`
  const nodeMeta = await getDrupalClient().translatePath(path)
  const id = nodeMeta.entity?.uuid
  const node = await getDrupalClient().getResource(NODE_TYPES.PAGE, id, {
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
  const drupal = getDrupalClient()
  const frontPageNode = await drupal
    .translatePath(getConfig().serverRuntimeConfig.DRUPAL_FRONT_PAGE)
    .catch((e) => {
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

  return drupal.getResourceCollection(NODE_TYPES.MESSAGE, {
    locale,
    defaultLocale: NO_DEFAULT_LOCALE,
    params,
  })
}

export const getRedirectFromContext = async (context) => {
  if (!context) {
    logger.error('Error resolving redirect - no context provided')
    return
  }

  const { locale, defaultLocale, params } = context

  // If locale = default locale add it to beggining of slug, otherwise default locale redirections won't work
  if (locale === defaultLocale) {
    params.slug.unshift(locale)
  }

  const pathFromContext = await getDrupalClient()
    .translatePathFromContext(context)
    .catch((e) => {
      logger.error('Error resolving redirect')
      throw e
    })

  return getRedirect(pathFromContext?.redirect, context)
}
