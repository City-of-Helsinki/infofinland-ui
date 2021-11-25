import {
  getMenu,
  // getResourceFromContext,
  // getResource,
} from 'next-drupal'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'

export const getMainMenu = async (context) => await getMenu('main', context)

export const getFooterAboutMenu = async (context) =>
  await getMenu('footer-about', context)

export const getAboutMenu = async (context) => await getMenu('about', context)

export const getCommonApiContent = async (context) => {
  const [mainMenu, aboutMenu, translations] = await Promise.all([
    getMainMenu(context),
    getFooterAboutMenu(context),
    serverSideTranslations(context.locale, ['common']),
  ])
  return { mainMenu, aboutMenu, ...translations }
}
