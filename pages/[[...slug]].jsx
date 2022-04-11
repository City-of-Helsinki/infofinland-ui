import getConfig from 'next/config'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'
import { getMenu, getResourceTypeFromContext } from 'next-drupal'
import ArticlePage from '@/src/page-templates/ArticlePage'
import AboutPage from '@/src/page-templates/AboutPage'
// import { i18n } from '@/next-i18next.config'
import { NODE_TYPES } from '@/lib/DRUPAL_API_TYPES'
import {
  NOT_FOUND,
  menuErrorResponse,
  getThemeHeroImages,
  getCachedMenus,
  getCachedAboutMenu,
  getCachedNode,
} from '@/lib/ssr-api'
import { addPrerenderLocalesToPaths } from '@/lib/ssr-helpers'
import { LAYOUT_SMALL } from '@/components/layout/Layout'
import { NO_DEFAULT_LOCALE } from '@/lib/ssr-api'
import HomePage from '@/src/page-templates/HomePage'
import { DateTime } from 'luxon'
import logger from '@/logger'
import cache from '@/lib/cacher/server-cache'

const USE_TIMER = process.env.USE_TIMER || false

export async function getStaticPaths() {
  const { DRUPAL_MENUS,BUILD_ALL } = getConfig().serverRuntimeConfig
  // prerender all theme pages from main menu and cities menu
  const menus = (
    await Promise.all([
      getMenu(DRUPAL_MENUS.MAIN, {
        locale: 'en',
        defaultLocale: NO_DEFAULT_LOCALE,
      }),
      getMenu(DRUPAL_MENUS.CITIES, {
        locale: 'en',
        defaultLocale: NO_DEFAULT_LOCALE,
      }),
    ])
  ) // items for all rendering pages, tree for rendering theme pages
    .map(({ tree,items }) => ( BUILD_ALL === '1' ? items : tree).map(({ url }) => {
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
  // any language should do. english should do the most.
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

export async function getStaticProps(context) {
  const { REVALIDATE_TIME, CACHE_REPOPULATE } = getConfig().serverRuntimeConfig
  const { params, locale } = context
  params.slug = params.slug || ['/']
  logger.debug('cache autoupdate status:', { cacheRepopulate: CACHE_REPOPULATE })
  const localePath =
    params.slug[0] === '/'
      ? `/${locale}`
      : ['', locale, ...params.slug].join('/')
  const isNodePath = /node/.test(params.slug[0])
  const T = `pateTimer-for-${localePath}`
  const typeCacheKey = `type-of-${localePath}`
  USE_TIMER && console.time(T)
  let type = cache.get(typeCacheKey)

  if (!type) {
    type = await getResourceTypeFromContext({
      locale,
      defaultLocale: NO_DEFAULT_LOCALE,
      params,
    })
    cache.set(typeCacheKey, type, 1000000)
  }

  USE_TIMER && console.log('type resolved')
  USE_TIMER && console.timeLog(T)

  //Allow only pages and landing pages to be queried
  if (![NODE_TYPES.PAGE, NODE_TYPES.LANDING_PAGE].includes(type)) {
    logger.error(`Error resolving page. Node type not allowed:`, {
      type,
      localePath,
    })
    return NOT_FOUND
  }

  const node = await getCachedNode({ locale,
    params, type, localePath })

  USE_TIMER && console.log('node resolved')
  USE_TIMER && console.timeLog(T)

  // Return 404 if node was null
  if (!node) {
    logger.warn(`Warning: no valid node found`, { type, localePath })
    return NOT_FOUND
  }

  if (isNodePath) {
    if (node.path?.alias) {
      return {
        redirect: {
          permanent: false,
          destination: `/${locale}/${node.path.alias}`,
        },
      }
    } else {
      logger.warn(
        `Warning: request to direct node without path alias blocked. 404 returned `,
        {
          type,
          localePath,
        }
      )
    }
  }

  let fiNode = null // Must be JSON compatible

  // if (type === NODE_TYPES.PAGE) {
  //   // Get finnish title if page is not in finnish
  //   if (context.locale !== i18n.fallbackLocale) {
  //     fiNode = await getDefaultLocaleNode(node.id).catch((e) => {
  //       logger.error('Error while getting Finnish title', {
  //         type,
  //         localePath,
  //         e,
  //       })
  //       return null
  //     })
  //     console.log('fiNode resolved')
  //     console.timeLog(T)
  //     // console.timeEnd(T)
  //   }
  // }

  let menus = {}
  if (node.field_layout === 'small') {
    menus.about = await getCachedAboutMenu(locale)
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
      menus,
      node: { ...node, lastUpdated },
      themeMenu,
      fiNode,
      ...(await serverSideTranslations(locale, ['common'])),
    },
    revalidate: REVALIDATE_TIME,
  }
}

/***
 * Layout selector:
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
