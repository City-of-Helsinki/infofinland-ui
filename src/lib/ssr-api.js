import {
  getMenu,
  // getResourceFromContext,
  // getResource,
} from 'next-drupal'

import { serverSideTranslations } from 'next-i18next/serverSideTranslations'

import axios from 'axios'

const menuErrorResponse = () => ({ items: [], tree: [], error: 'menu-error' })

export const getCommonTranslations = async (locale) =>
  serverSideTranslations(locale, ['common'])

export const getMainMenu = async (context) =>
  getMenu(process.env.DRUPAL_MENUS.MAIN, context)

export const resolvePath = async (path) => {
  const URL =
    'https://nginx-infofinland-drupal-dev.agw.arodevtest.hel.fi/en/router/translate-path'
  return axios.get(URL, {
    params: { path, _format: 'json' },
  })
}

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

  const common = { mainMenu, footerMenu, ...translations }
  console.log({ common })
  return common
}

export const addPrerenderLocalesToPaths = (paths) =>
  process.env.PRERENDER_LOCALES.map((locale) =>
    paths.map((path) => ({ ...path, locale }))
  ).flat()
