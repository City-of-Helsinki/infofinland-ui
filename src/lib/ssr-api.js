import { getMenu, getResource, getResourceByPath } from 'next-drupal'
import { sample } from 'lodash'
import { i18n } from '../../next-i18next.config'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'

//always use locale path for drupal api queries
const NO_DEFAULT_LOCALE = 'dont-use'
const disableDefaultLocale = (locale) => ({
  locale,
  defaultLocale: NO_DEFAULT_LOCALE,
})

const menuErrorResponse = () => ({ items: [], tree: [], error: 'menu-error' })

export const getCommonTranslations = async (locale) =>
  serverSideTranslations(locale, ['common'])

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
    defaultLocale: NO_DEFAULT_LOCALE,
  })

export const getPageByPath = async ({ path, context: locale }) => {
  const localeContext = disableDefaultLocale(locale)
  const node = await getResourceByPath(path, localeContext)
  let fiNode = { title: node.title }
  let content = []
  if (node?.field_content?.length > 0) {
    content = await getContent(node, localeContext)
  }

  if (locale !== i18n.defaultLocale) {
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
