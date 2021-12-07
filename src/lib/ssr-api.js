import { getMenu, getResource, getResourceByPath } from 'next-drupal'
import { sample } from 'lodash'
import { i18n } from '../../next-i18next.config'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'
const NO_DEFAULT_LOCALE = 'dont-use'
// import axios from 'axios'

const menuErrorResponse = () => ({ items: [], tree: [], error: 'menu-error' })

export const getCommonTranslations = async (locale) =>
  serverSideTranslations(locale, ['common'])

export const getMainMenu = async (context) =>
  getMenu(process.env.DRUPAL_MENUS.MAIN, context)

// export const resolvePath = async (path) => {
//   const URL =
//     'https://nginx-infofinland-drupal-dev.agw.arodevtest.hel.fi/en/router/translate-path'
//   return axios.get(URL, {
//     params: { path, _format: 'json' },
//   })
// }

export const getContent = ({ field_content }, { locale }) =>
  Promise.all(
    field_content.map(({ type, id }) =>
      getResource(type, id, {
        locale,
        defaultLocale: NO_DEFAULT_LOCALE,
      })
    )
  )

export const getFooterAboutMenu = async ({ locale }) =>
  getMenu(process.env.DRUPAL_MENUS.FOOTER, {
    locale,
    defaultLocale: NO_DEFAULT_LOCALE,
  })

export const getAboutMenu = async ({ locale }) =>
  getMenu(process.env.DRUPAL_MENUS.ABOUT, {
    locale,
    defaultLocale: NO_DEFAULT_LOCALE,
  })

export const getCommonApiContent = async ({ locale }) => {
  const context = { locale, defaultLocale: NO_DEFAULT_LOCALE }
  const [mainMenu, footerMenu, translations] = await Promise.all([
    getMenu(process.env.DRUPAL_MENUS.MAIN, context).catch((e) => {
      console.error('mainMenu error', e)
      return menuErrorResponse(e)
    }),
    getMenu(process.env.DRUPAL_MENUS.FOOTER, context).catch((e) => {
      console.error('footerMenu error', e)
      return menuErrorResponse(e)
    }),
    getCommonTranslations(context.locale).catch((e) => {
      console.error('translation error', e)
      return { error: e }
    }),
  ]).catch((e) => {
    throw e
  })

  return {
    mainMenu,
    footerMenu,
    color: sample(process.env.HERO_COLORS),
    ...translations,
  }
}

export const getDefaultLocaleNode = async (id) =>
  getResource('node--page', id, {
    locale: i18n.defaultLocale,
    //always use locale path for drupal api queries
    defaultLocale: 'dont-use',
  })

export const getPageByPath = async ({ path, context }) => {
  const localeContext = {
    locale: context.locale,
    defaultLocale: NO_DEFAULT_LOCALE,
  }
  const node = await getResourceByPath(path, localeContext)
  let fiNode = { title: node.title }
  let content = []
  if (node?.field_content?.length > 0) {
    content = await getContent(node, localeContext)
  }

  if (context.locale !== i18n.defaultLocale) {
    fiNode = await getDefaultLocaleNode(node.id).catch(() => ({
      title: node.title,
    }))
  }

  return { node, content, fiNode }
}

export const addPrerenderLocalesToPaths = (paths) =>
  process.env.PRERENDER_LOCALES.map((locale) =>
    paths.map((path) => ({ ...path, locale }))
  ).flat()
