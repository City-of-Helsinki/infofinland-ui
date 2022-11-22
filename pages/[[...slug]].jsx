/* eslint-disable no-unreachable */
import getConfig from 'next/config'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'
import { getMenu, getResourceTypeFromContext } from 'next-drupal'
import ArticlePage from '@/src/page-templates/ArticlePage'
import AboutPage from '@/src/page-templates/AboutPage'
import { NODE_TYPES } from '@/lib/DRUPAL_API_TYPES'
import {
  NOT_FOUND,
  menuErrorResponse,
  getThemeHeroImages,
  getCachedMenus,
  getCachedAboutMenus,
  getNode,
  getCachedMunicipalities,
  getRedirectFromContext,
} from '@/lib/ssr-api'
import { addPrerenderLocalesToPaths } from '@/lib/ssr-helpers'
import { LAYOUT_SMALL } from '@/components/layout/Layout'
import { NO_DEFAULT_LOCALE } from '@/lib/ssr-api'
import HomePage from '@/src/page-templates/HomePage'
import { DateTime } from 'luxon'
import logger from '@/logger'

const USE_TIMER = process.env.USE_TIMER || false

export async function getStaticPaths() {
  const { DRUPAL_MENUS, BUILD_ALL } = getConfig().serverRuntimeConfig

  // prerender all theme pages from main menu.
  // any language should do. english should do the most.
  const menus = (
    await Promise.all([
      getMenu(DRUPAL_MENUS.MAIN, {
        locale: 'en',
        defaultLocale: NO_DEFAULT_LOCALE,
      }),
      // getMenu(DRUPAL_MENUS.CITIES, {
      //   locale: 'en',
      //   defaultLocale: NO_DEFAULT_LOCALE,
      // }),
    ])
  ) // items for prerendering all pages in menu, tree for rendering theme (root level) pages
    .map(({ tree, items }) =>
      (BUILD_ALL === '1' ? items : tree).map(({ url }) => {
        //remove root slash and language code
        const [, , ...slug] = url.split('/')
        return {
          params: {
            slug,
          },
        }
      })
    )
    .flat()
  // add predefined prerender locales to urls from mainmenu.
  const paths = addPrerenderLocalesToPaths([
    {
      //prerender frontpage
      params: { slug: [''] },
    },
    ...menus,
  ])

  return {
    paths,
    fallback: 'blocking',
  }
}

// export async function getServerSideProps(context) {
export async function getStaticProps(context) {
  const { BUILD_PHASE } = getConfig().serverRuntimeConfig
  const { params, locale } = context
  params.slug = params.slug || ['/']
  const path =
    params.slug[0] === '/' ? params.slug[0] : `/${params.slug.join('/')}`
  const localePath =
    params.slug[0] === '/'
      ? `/${locale}`
      : ['', locale, ...params.slug].join('/')
  const isNodePath = /node/.test(params.slug[0])
  const T = `pageTimer-for-${localePath}`
  USE_TIMER && console.time(T)
  USE_TIMER && console.timeLog(T)

  if (!BUILD_PHASE) {
    const redirect = await getRedirectFromContext(context)
    if (redirect) {
      return {
        redirect: {
          destination: redirect.to,
          permanent: redirect.status === '301',
        },
      }
    }
  }

  let type = await getResourceTypeFromContext(context)
  type = type ? type : params.slug ? NODE_TYPES.PAGE : NODE_TYPES.LANDING_PAGE

  if (![NODE_TYPES.LANDING_PAGE, NODE_TYPES.PAGE].includes(type)) {
    logger.warn('Invalid node type', { type, localePath })
    return NOT_FOUND
  }

  let node = {}

  if (BUILD_PHASE) {
    //Try a few times, sometimes Drupal router just gives random errors
    node = await getNode({ locale, params, type, localePath, retry: 5 })
  } else {
    node = await getNode({ locale, params, type, localePath })
  }

  USE_TIMER && console.log('node resolved')
  USE_TIMER && console.timeLog(T)

  // Return 404 if node was null
  if (!node || node?.notFound) {
    logger.warn(`No valid node found for %s`, localePath, { type, localePath })
    return NOT_FOUND
  }

  if (isNodePath) {
    if (node.path?.alias) {
      logger.http('Redirecting Node id path to current path alias', {
        requestPath: path,
        redirectPath: node.path?.alias,
      })
      return {
        redirect: {
          permanent: false,
          destination: `/${locale}/${node.path.alias}`,
        },
      }
    } else {
      logger.warn(`Request to direct node %s without path alias.`, localePath, {
        type,
        localePath,
      })
    }
  } else if (
    type !== NODE_TYPES.LANDING_PAGE &&
    node.path?.alias &&
    node.path?.alias !== path
  ) {
    logger.info('Redirecting old node path to current node alias', {
      path,
      alias: node.path?.alias,
    })
    return {
      redirect: {
        permanent: true,
        destination: `/${locale}/${node.path?.alias}`,
      },
    }
  }

  let menus = {}
  if (node.field_layout === 'small') {
    menus = await getCachedAboutMenus(locale)
  } else {
    menus = await getCachedMenus(locale)
  }

  USE_TIMER && console.log('menus resolved')
  USE_TIMER && console.timeLog(T)

  let themeMenu = menuErrorResponse()
  let themes = null
  const { field_theme_menu_machine_name } = node
  if (field_theme_menu_machine_name) {
    themeMenu = menus[field_theme_menu_machine_name]
    if (!themeMenu) {
      themeMenu = await getMenu(field_theme_menu_machine_name, {
        locale,
        defaultLocale: NO_DEFAULT_LOCALE,
      })
      USE_TIMER &&
        console.log(
          'theme menu loaded from drupal',
          field_theme_menu_machine_name
        )
      USE_TIMER && console.timeLog(T)
    }
  }

  const municipalities = await getCachedMunicipalities({ locale })

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

  // Format date in server. Don't load luxon to browser for one single formatting task.
  const lastUpdated = DateTime.fromISO(node.revision_timestamp).toFormat(
    'dd.MM.yyyy'
  )

  USE_TIMER && console.log('page ready')

  USE_TIMER && console.timeEnd(T)

  return {
    props: {
      key: node.id,
      type,
      themes,
      municipalities,
      menus,
      node: { ...node, lastUpdated },
      themeMenu,
      ...(await serverSideTranslations(locale, ['common'])),
    },
  }
}

/***
 * Layout selector
 */
const Page = (props) => {
  if (props?.type === NODE_TYPES.LANDING_PAGE) {
    return <HomePage {...props} />
  }
  if (props?.node?.field_layout === LAYOUT_SMALL) {
    return <AboutPage {...props} />
  }
  return <ArticlePage {...props} />
}
export default Page
