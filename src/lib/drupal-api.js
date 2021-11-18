import {
  getMenu,
  // getPathsFromContext,
  // getResourceFromContext,
  getResource,
} from 'next-drupal'

export const getMainMenu = async (context) =>
  await getMenu('main', context)

// export  getThemeSubmenu = async (nodeOrSomething) => getMenuMainMenu.tree.filter( with nodeOrSomething)

// export  getLocalInformationBlock = async (pageId) => await getResource('','')

export const getAboutMenu = async () => await getMenu('footer-about')

export const getPage = async () => await getMenu('main')

export const getFeedbackInstructionsBlock = async () =>
  await getResource(
    'feedbac_info_or_something',
    'theidfortheblockhere'
    // "block_content--basic",
    // "97ee0b84-309f-4b5e-b321-042018552428"
  )

export const getCommonApiContent = async () => {
  const mainMenu = await getMainMenu()
  const aboutMenu = await getAboutMenu()
  // const aboutMenu = await getAboutMenu()
  return { mainMenu, aboutMenu }
}
