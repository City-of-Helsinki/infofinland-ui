import { getMenu, getResource, getResourceCollection } from 'next-drupal'
import { i18n } from '../../next-i18next.config'
import axios from 'axios'
import { DrupalJsonApiParams } from 'drupal-jsonapi-params'
import getConfig from 'next/config'
import { CONTENT_TYPES, NODE_TYPES } from './DRUPAL_API_TYPES'
import { getMunicipalityParams, getThemeHeroParams } from './query-params'
import { getHeroFromNode } from './ssr-helpers'
const ROUTER_PATH = '/router/translate-path'
const NO_DEFAULT_LOCALE = 'dont-use'
const disableDefaultLocale = (locale) => ({
  locale,
  defaultLocale: NO_DEFAULT_LOCALE,
})

export const menuErrorResponse = () => ({
  items: [],
  tree: [],
  error: 'menu-error',
})

// Export query params through ssr-api for convenience
export * from './query-params'

export const NOT_FOUND = { notFound: true }

export const resolvePath = async ({ path, context }) => {
  const { serverRuntimeConfig } = getConfig()
  const { locale, defaultLocale } = context
  const URL = `${serverRuntimeConfig.NEXT_PUBLIC_DRUPAL_BASE_URL}/${
    locale || defaultLocale
  }${ROUTER_PATH}`
  return axios.get(URL, {
    params: { path, _format: 'json' },
  })
}

export const getMainMenu = async (context) =>
  getMenu(getConfig().serverRuntimeConfig.DRUPAL_MENUS.MAIN, context)

export const getFooterAboutMenu = async ({ locale }) =>
  getMenu(
    getConfig().serverRuntimeConfig.DRUPAL_MENUS.FOOTER,
    disableDefaultLocale(locale)
  )

export const getAboutMenu = async ({ locale }) =>
  getMenu(getConfig().serverRuntimeConfig.DRUPAL_MENUS.ABOUT, {
    locale,
    defaultLocale: NO_DEFAULT_LOCALE,
  })

export const getCitiesMenu = async ({ locale }) =>
  getMenu(getConfig().serverRuntimeConfig.DRUPAL_MENUS.CITIES, {
    locale,
    defaultLocale: NO_DEFAULT_LOCALE,
  })

export const getCommonApiContent = async ({ locale }) => {
  const context = { locale, defaultLocale: NO_DEFAULT_LOCALE }
  const [menu, footerMenu, citiesMenu, municipalities] = await Promise.all([
    //Main menu or whatever is called
    getMainMenu(context).catch((e) => {
      console.error('menu error', e)
      return menuErrorResponse(e)
    }),
    //Footer Menu
    getFooterAboutMenu(context).catch((e) => {
      console.error('footerMenu error', e)
      return menuErrorResponse(e)
    }),
    //Cities menu
    getCitiesMenu(context).catch((e) => {
      console.error('city menu error', e)
      return menuErrorResponse(e)
    }),

    //Municipalities
    getMunicipalities(context).catch((e) => {
      console.error('municipality list error', e)
      return []
    }),
  ]).catch((e) => {
    throw e
  })

  return {
    menu,
    footerMenu,
    citiesMenu,
    municipalities,
  }
}

export const getThemeHeroImages = async ({ tree, context }) => {
  const responses = await Promise.all(
    tree.map((page) => resolvePath({ path: page.url, context }))
  )
  if (!responses) {
    return null
  }
  const ids = responses.map(({ data }) => data?.entity?.uuid)

  if (!ids || ids.length === 0) {
    return null
  }

  const nodes = await Promise.all(
    ids.map((id) =>
      getResource(NODE_TYPES.PAGE, id, {
        locale: context.locale,
        params: getThemeHeroParams(),
      }).catch((e) => {
        console.error(e)
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
