import {
  getMenu,
  getResource,
  getResourceCollection,
  translatePath,
} from 'next-drupal'
import { i18n } from '../../next-i18next.config'
import { DrupalJsonApiParams } from 'drupal-jsonapi-params'
import getConfig from 'next/config'
import { CONTENT_TYPES, NODE_TYPES } from './DRUPAL_API_TYPES'
import { getMunicipalityParams, getThemeHeroParams } from './query-params'
import { values } from 'lodash'
import { getHeroFromNode } from './ssr-helpers'

const NO_DEFAULT_LOCALE = 'dont-use'

export const menuErrorResponse = () => ({
  items: [],
  tree: [],
  error: 'menu-error',
})

// Export query params through ssr-api for convenience
export * from './query-params'

export const NOT_FOUND = { notFound: true }

export const getMenus = async ({ locale }) => {
  const { DRUPAL_MENUS } = getConfig().serverRuntimeConfig

  const menuNames = values(DRUPAL_MENUS).filter(
    (menu) => menu !== DRUPAL_MENUS.ABOUT
  )

  const menus = await Promise.all(
    menuNames.map(async (menu) => {
      const menuItems = await getMenu(menu, {
        locale,
        defaultLocale: NO_DEFAULT_LOCALE,
      }).catch((e) => {
        console.error('Error fetching menu:', menu, e)
        return menuErrorResponse()
      })
      return { menuItems: menuItems, menu }
    })
  )

  return menus.reduce((menuObj, { menu, menuItems }) => {
    return { ...menuObj, [menu]: menuItems }
  }, {})
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
    console.error('error resolving front page for messages')
    throw e
  })

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
    .addFilter('field_page.id', [id, frontPageNode.entity.uuid], 'IN')
    .getQueryObject()

  return getResourceCollection(NODE_TYPES.MESSAGE, {
    locale,
    defaultLocale: NO_DEFAULT_LOCALE,
    params,
  })
}
