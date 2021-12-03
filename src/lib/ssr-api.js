import { getMenu, getResource, getResourceByPath } from 'next-drupal'
import { sample } from 'lodash'

import { serverSideTranslations } from 'next-i18next/serverSideTranslations'

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

export const getContent = ({ field_content }, { locale, defaultLocale }) =>
  Promise.all(
    field_content.map(({ type, id }) =>
      getResource(type, id, {
        locale,
        defaultLocale,
      })
    )
  )

export const getFooterAboutMenu = async (context) =>
  getMenu(process.env.DRUPAL_MENUS.FOOTER, context)

export const getAboutMenu = async (context) =>
  getMenu(process.env.DRUPAL_MENUS.ABOUT, context)

export const getCommonApiContent = async (context) => {
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

export const getPageByPath = async ({ path, context }) => {
  const { locale, defaultLocale } = context
  const localeContext = { locale, defaultLocale }
  const node = await getResourceByPath(path, localeContext)
  let content = []
  if (node?.field_content?.length > 0) {
    content = await getContent(node, localeContext)
  }

  return { node, content }
}

export const addPrerenderLocalesToPaths = (paths) =>
  process.env.PRERENDER_LOCALES.map((locale) =>
    paths.map((path) => ({ ...path, locale }))
  ).flat()
