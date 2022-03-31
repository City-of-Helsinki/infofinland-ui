import getConfig from 'next/config'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'
import {
  getMenu,
  getResourceFromContext,
  getResourceTypeFromContext,
} from 'next-drupal'
import ArticlePage from '@/src/page-templates/ArticlePage'
import AboutPage from '@/src/page-templates/AboutPage'
import { i18n } from '@/next-i18next.config'
import { NODE_TYPES } from '@/lib/DRUPAL_API_TYPES'
import {
  getMenus,
  NOT_FOUND,
  getQueryParamsFor,
  getDefaultLocaleNode,
  menuErrorResponse,
  getThemeHeroImages,
} from '@/lib/ssr-api'

import { NO_DEFAULT_LOCALE } from '@/lib/ssr-api'
import HomePage from '@/src/page-templates/HomePage'

export async function getStaticPaths() {
  return {
    paths: [],
    fallback: 'blocking',
  }

  // const { DRUPAL_MENUS } = getConfig().serverRuntimeConfig

  // const { items } = await getMenu(DRUPAL_MENUS.MAIN, {
  //   locale:'en',
  //   defaultLocale:'-',
  // })
  // const paths = items
  //   // Filter out theme pages
  //   .filter(({ parent }) => parent !== '')
  //   // Parse to theme and path slug
  //   .map(({ url }) => {
  //     //remove root slash and language code
  //     const [, , ...slug] = url.split('/')
  //     return {
  //       params: {
  //         slug,
  //       },
  //     }
  //   })

  // return {
  //   paths,
  //   // paths: addPrerenderLocalesToPaths(paths),
  //   fallback: 'blocking',
  // }
}

export async function getStaticProps(context) {
  const { serverRuntimeConfig } = getConfig()
  const { params } = context
  params.slug = params.slug || ['/']

  const type = await getResourceTypeFromContext({
    ...context,
    defaultLocale: NO_DEFAULT_LOCALE,
    params,
  })

  //Allow only pages and landing pages to be queried
  if (![NODE_TYPES.PAGE, NODE_TYPES.LANDING_PAGE].includes(type)) {
    console.error('Error resolving page. Node type not allowed:', type)
    return NOT_FOUND
  }

  const node = await getResourceFromContext(
    type,
    {
      ...context,
      //Dont use default locale. Drupal and UI have different default locales.
      //Always explicitly set the locale for drupal queries
      defaultLocale: NO_DEFAULT_LOCALE,
    },
    {
      params: getQueryParamsFor(type),
    }
  ).catch((e) => {
    console.log(e.status)
    console.error(`Error requesting node ${params.slug}`, type, e)
    // throw e
  })

  // Return 404 if node was null
  if (!node) {
    return NOT_FOUND
  }

  let fiNode = null // Must be JSON compatible

  if (type === NODE_TYPES.PAGE) {
    // Get finnish title if page is not in finnish
    if (context.locale !== i18n.fallbackLocale) {
      fiNode = await getDefaultLocaleNode(node.id).catch((e) => {
        console.error('Error while getting Finnish title', e)
        return null
      })
    }
  }

  let menus = {}
  if (node.field_layout === 'small') {
    let menuName = serverRuntimeConfig.DRUPAL_MENUS.ABOUT
    let menu = await getMenu(menuName)
    menus = { [menuName]: menu }
  } else {
    menus = await getMenus({ ...context, id: node.id })
  }

  let themeMenu = menuErrorResponse()
  let themes = null
  const { field_theme_menu_machine_name } = node
  if (field_theme_menu_machine_name) {
    themeMenu = menus[node.field_theme_menu_machine_name]
    if (!themeMenu) {
      themeMenu = await getMenu(field_theme_menu_machine_name)
    }
  }

  if (type === NODE_TYPES.LANDING_PAGE) {
    const themeImages = await getThemeHeroImages({
      tree: menus.main.tree,
      context,
    })

    themes = menus.main.tree.map(({ url, title, id }, i) => {
      const image = themeImages[i]
      return { url, title, id, image: image?.src || null }
    })
  }

  return {
    props: {
      type,
      themes,
      menus,
      node,
      themeMenu,
      fiNode,
      ...(await serverSideTranslations(context.locale, ['common'])),
    },
    revalidate: serverRuntimeConfig.REVALIDATE_TIME,
  }
}

/***
 * Layout selector:
 */
const Page = (props) => {
  if (props?.type === NODE_TYPES.LANDING_PAGE) {
    return <HomePage {...props} />
  }
  if (props?.node?.field_layout === 'small') {
    return <AboutPage {...props} />
  }
  return <ArticlePage {...props} />
}

export default Page
