import {
  getMenu,
  getResource,
  getResourceCollection,
  getResourceTypeFromContext,
} from 'next-drupal'
import { i18n } from '../../next-i18next.config'
import axios from 'axios'
import { DrupalJsonApiParams } from 'drupal-jsonapi-params'
import getConfig from 'next/config'
import { CONTENT_TYPES, NODE_TYPES } from './DRUPAL_API_TYPES'
import {
  getMunicipalityParams,
  getThemeHeroParams,
  getQueryParamsFor,
} from './query-params'
import { values } from 'lodash'
import { getHeroFromNode } from './ssr-helpers'

const ROUTER_PATH = '/router/translate-path'
const NO_DEFAULT_LOCALE = 'dont-use'
// const disableDefaultLocale = (locale) => ({
//   locale,
//   defaultLocale: NO_DEFAULT_LOCALE,
// })

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

export const getIdFromPath = async ({ path, context: { locale } }) => {
  const { data } = await resolvePath({
    path,
    context: { locale },
  }).catch((e) => {
    if (e?.response?.status === 404) {
      console.error('Error resolving path', { path })
      return { data: null }
    }
    console.error(e)
    throw new Error('Unable to resolve path')
  })

  return data?.entity?.uuid
}

export const getNodeFromPath = async ({ path, context, type }) => {
  const id = await getIdFromPath({ path, context })
  const _type = type || (await getResourceTypeFromContext(context))
  const node = await getResource(_type, id, {
    locale: context.locale,
    defaultLocale: NO_DEFAULT_LOCALE,
    params: getQueryParamsFor(type),
  }).catch((e) => {
    console.error('Error requesting node ', id, e)
    throw e
  })
  return node
}

export const getMenus = async ({ locale }) => {
  const { DRUPAL_MENUS } = getConfig().serverRuntimeConfig

  const menuNames = values(DRUPAL_MENUS)
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

export const getCommonApiContent = async ({ locale, id }) => {
  const context = { locale, defaultLocale: NO_DEFAULT_LOCALE }

  const menus = await getMenus(context)

  const municipalities = await getMunicipalities(context).catch((e) => {
    console.error('municipality list error', e)
    return []
  })

  const feedback = await getFeedbackPage(context).catch((e) => {
    console.error('Feedback content error', e)
    return null
  })

  const messages = await getMessages({ ...context, id }).catch((e) => {
    console.error('Messages error', e)
    return []
  })

  // const [menus, municipalities, feedback, messages] = await Promise.all([
  //   getMenus(context),
  //   getMunicipalities(context).catch((e) => {
  //     console.error('municipality list error', e)
  //     return []
  //   }),
  //   getFeedbackPage(context).catch((e) => {
  //     console.error('Feedback content error', e)
  //     return null
  //   }),
  //   getMessages({ ...context, id }).catch((e) => {
  //     console.error('Messages error', e)
  //     return []
  //   }),
  // ]).catch((e) => {
  //   throw e
  // })
  return {
    menus,
    municipalities,
    feedback,
    messages,
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

export const getFeedbackPage = async (context) => {
  const { data } = await resolvePath({
    path: getConfig().serverRuntimeConfig.FEEDBACK_PAGE_PATH,
    context,
  })
  if (!data) {
    return null
  }
  const id = data?.entity?.uuid
  const node = await getResource(NODE_TYPES.PAGE, id, {
    locale: context.locale,
    defaultLocale: NO_DEFAULT_LOCALE,
    params: new DrupalJsonApiParams()
      .addInclude(['field_content'])
      .addFields(NODE_TYPES.PAGE, ['title', 'field_content'])
      .getQueryObject(),

    // params:  getPageQueryParams()
  })

  return node
}

export const getMessages = async ({ locale, id }) => {
  const { data: globalsId } = await resolvePath({
    path: getConfig().serverRuntimeConfig.DRUPAL_FRONT_PAGE,
    context: { locale },
  }).catch((e) => {
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
    .addFilter('field_page.id', [id, globalsId?.entity.uuid], 'IN')
    .getQueryObject()

  return getResourceCollection(NODE_TYPES.MESSAGE, {
    locale,
    defaultLocale: NO_DEFAULT_LOCALE,
    params,
  })
}
