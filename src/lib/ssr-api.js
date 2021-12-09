import { getMenu, getResource } from 'next-drupal'
import { sample } from 'lodash'
import { i18n } from '../../next-i18next.config'
import axios from 'axios'

//always use locale path for drupal api queries
const NO_DEFAULT_LOCALE = 'dont-use'
const disableDefaultLocale = (locale) => ({
  locale,
  defaultLocale: NO_DEFAULT_LOCALE,
})

const API_URLS = {
  getPage: ({ locale, defaultLocale, id }) =>
    `${process.env.NEXT_PUBLIC_DRUPAL_BASE_URL}/${
      locale || defaultLocale
    }/jsonapi/node/page/${id}`,
}

const menuErrorResponse = () => ({ items: [], tree: [], error: 'menu-error' })

export const resolvePath = async ({ path, context }) => {
  const { locale, defaultLocale } = context
  const URL = `${process.env.NEXT_PUBLIC_DRUPAL_BASE_URL}/${
    locale || defaultLocale
  }/router/translate-path`
  return axios.get(URL, {
    params: { path, _format: 'json' },
  })
}

export const getPageById = async (id, { locale, defaultLocale }) => {
  return await axios.get(API_URLS.getPage({ locale, defaultLocale, id }), {
    params: {
      include: `field_content.field_image.field_media_image,field_content.field_link_collection.field_links`,
    },
  })
}

export const getPageWithContentByPath = async ({ path, context }) => {
  const { data: pathNode } = await resolvePath({ path, context })
  if (!pathNode) {
    throw new Error('unable to resolve path')
  }
  const {
    entity: { uuid: id },
  } = pathNode

  const { data: page } = await getPageById(id, context).catch((e) => {
    console.error(e)
    return null
  })
  if (!page) {
    // throw new Error('unable to get page by uuid')
    return null
  }
  const included = page.included || []
  const content = page.included
    ? included.map((item) => {
        const { type, id, attributes, ...rest } = item
        return { type, id, ...attributes, ...rest }
      })
    : []

  const { attributes, ...restOfNode } = page.data
  const node = { content, included, ...attributes, ...restOfNode }
  let fiNode = { title: node?.title || '' }

  if (context.locale !== i18n.defaultLocale) {
    fiNode = await getDefaultLocaleNode(id).catch(() => ({
      title: node.title,
    }))
  }
  return { ...node, fiTitle: fiNode.title }
}

export const getMainMenu = async (context) =>
  getMenu(process.env.DRUPAL_MENUS.MAIN, context)

export const getContent = ({ field_content }, { locale }) =>
  Promise.all(
    field_content.map(({ type, id }) =>
      getResource(type, id, disableDefaultLocale(locale))
    )
  )

export const getFooterAboutMenu = async ({ locale }) =>
  getMenu(process.env.DRUPAL_MENUS.FOOTER, disableDefaultLocale(locale))

export const getAboutMenu = async ({ locale }) =>
  getMenu(process.env.DRUPAL_MENUS.ABOUT, {
    locale,
    defaultLocale: NO_DEFAULT_LOCALE,
  })

export const getCommonApiContent = async (
  { locale },
  main = process.env.DRUPAL_MENUS.MAIN,
  footer = process.env.DRUPAL_MENUS.FOOTER
) => {
  const context = { locale, defaultLocale: NO_DEFAULT_LOCALE }
  const [menu, footerMenu, translations] = await Promise.all([
    //Main menu or whatever is called
    getMenu(main, context).catch((e) => {
      console.error('menu error', e)
      return menuErrorResponse(e)
    }),
    //Footer Menu
    getMenu(footer, context).catch((e) => {
      console.error('footerMenu error', e)
      return menuErrorResponse(e)
    }),
  ]).catch((e) => {
    throw e
  })

  return {
    menu,
    footerMenu,
    color: sample(process.env.HERO_COLORS),
    ...translations,
  }
}

export const getDefaultLocaleNode = async (id) =>
  getResource('node--page', id, {
    locale: i18n.defaultLocale,
    defaultLocale: NO_DEFAULT_LOCALE,
  })

// export const getPageByPath = async ({ path, context }) => {
//   const localeContext = {
//     locale: context.locale,
//     defaultLocale: NO_DEFAULT_LOCALE,
//   }
//   const node = await getResourceByPath(path, {
//     ...localeContext,
//     params: { include: 'field_content' },
//   })
//   let fiNode = { title: node?.title || '' }
//   let content = []
//   if (node?.field_content?.length > 0) {
//     content = await getContent(node, localeContext)
//   }

//   if (context.locale !== i18n.defaultLocale && node !== null) {
//     fiNode = await getDefaultLocaleNode(node.id).catch(() => ({
//       title: node.title,
//     }))
//   }

//   return { node, content, fiTitle: fiNode.title }
// }

export const addPrerenderLocalesToPaths = (paths) =>
  process.env.PRERENDER_LOCALES.map((locale) =>
    paths.map((path) => ({ ...path, locale }))
  ).flat()
