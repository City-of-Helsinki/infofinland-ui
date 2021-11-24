import {
  getMenu,
  // getPathsFromContext,
  // getResourceFromContext,
  getResource,
} from 'next-drupal'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'

export const getMainMenu = async (context) => await getMenu('main', context)

// export  getLocalInformationBlock = async (pageId) => await getResource('','')

export const getFooterAboutMenu = async (context) =>
  await getMenu('footer-about', context)

export const getAboutMenu = async (context) => await getMenu('about', context)

// export const getPage = async () => await getMenu('main')

export const getFeedbackInstructionsBlock = async () => await getResource()

// "block_content--basic",
// "97ee0b84-309f-4b5e-b321-042018552428"

export const getCommonApiContent = async (context) => {
  const [mainMenu, aboutMenu,translations] = await Promise.all([
    getMainMenu(context),
    getFooterAboutMenu(context),
    serverSideTranslations(context.locale,['common'])
  ])
  return { mainMenu, aboutMenu,...translations }
}



