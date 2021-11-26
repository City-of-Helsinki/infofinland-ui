import {
  getMenu,
  // getResourceFromContext,
  // getResource,
} from 'next-drupal'

import { serverSideTranslations } from 'next-i18next/serverSideTranslations'

export const getCommonTranslations = async (locale) =>
  serverSideTranslations(locale, ['common'])
export const getMainMenu = async (context) =>
  getMenu(process.env.DRUPAL_MENUS.MAIN, context)

export const getFooterAboutMenu = async (context) =>
  getMenu(process.env.DRUPAL_MENUS.FOOTER, context)

export const getAboutMenu = async (context) =>
  getMenu(process.env.DRUPAL_MENUS.ABOUT, context)

export const getCommonApiContent = async (context) => {
  const [mainMenu, footerMenu, translations] = await Promise.all([
    getMainMenu(context),
    getFooterAboutMenu(context),
    getCommonTranslations(context.locale),
  ])
  return { mainMenu, footerMenu, ...translations }
}
