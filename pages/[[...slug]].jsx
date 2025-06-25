/* eslint-disable no-unreachable */
import getConfig from 'next/config'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'
import { getMenu } from 'next-drupal'
import ArticlePage from '@/src/page-templates/ArticlePage'
import AboutPage from '@/src/page-templates/AboutPage'
import { NODE_TYPES } from '@/lib/DRUPAL_API_TYPES'
import {
  NO_DEFAULT_LOCALE,
  NOT_FOUND,
  menuErrorResponse,
  getThemeHeroImages,
  getCachedMenus,
  getCachedAboutMenus,
  getNode,
  getCachedMunicipalities,
  getRedirectFromContext,
  getTranslatedPathFromContext
} from '@/lib/ssr-api'
import { addPrerenderLocalesToPaths } from '@/lib/ssr-helpers'
import { LAYOUT_SMALL } from '@/components/layout/Layout'
import HomePage from '@/src/page-templates/HomePage'
import { DateTime } from 'luxon'
import logger from '@/logger'
import getDrupalClient from '@/lib/drupal-client'
import useAddAskem from '@/hooks/useAddAskem'

const USE_TIMER = process.env.USE_TIMER || false

export async function getStaticPaths() {
  const { DRUPAL_MENUS, BUILD_ALL, BUILD_PHASE } =
    getConfig().serverRuntimeConfig

  if (BUILD_PHASE) {
    return {
      paths: [],
      fallback: 'blocking',
    }
  }

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
  const withAuth = !!context.preview
  const { params, locale } = context
  const { BUILD_PHASE, REVALIDATE_TIME } = getConfig().serverRuntimeConfig
  const drupal = getDrupalClient(withAuth)
  const ctx = { ...context, defaultLocale: NO_DEFAULT_LOCALE }

  if (!('slug' in ctx.params)) {
    ctx.params.slug = ['landingpage']
  }

  const translatedPath = await getTranslatedPathFromContext(ctx)
  if (!translatedPath) {
    return NOT_FOUND
  }

  const entityLangcode = translatedPath?.entity?.langcode
  const isRedirect = translatedPath?.redirect
  // If page doesn't exist on current language.
  if (!isRedirect && locale !== entityLangcode) {
    logger.warn('Requested language version not found', {
      locale,
      entityLangcode,
    })
    return NOT_FOUND
  }

  const localePath = translatedPath?.entity.path
  const path = `/${ctx.params.slug.join('/')}`

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

  let type = translatedPath?.jsonapi?.resourceName
  // await getResourceTypeFromContext(context)
  type = type ? type : params.slug ? NODE_TYPES.PAGE : NODE_TYPES.LANDING_PAGE

  if (![NODE_TYPES.LANDING_PAGE, NODE_TYPES.PAGE].includes(type)) {
    logger.warn('Invalid node type', { type, localePath })
    return NOT_FOUND
  }

  let node = {}
  const uuid = translatedPath.entity.uuid
  if (BUILD_PHASE) {
    //Try a few times, sometimes Drupal router just gives random errors
    node = await getNode({ locale, type, localePath, retry: 5, uuid })
  } else {
    // node = await drupal.getResource(type,translatedPath.entity.uuid,{params:getQueryParamsFor(type),locale,defaultLocale:NO_DEFAULT_LOCALE})
    node = await getNode({ locale, type, localePath, withAuth, uuid })
  }

  USE_TIMER && console.log('node resolved')
  USE_TIMER && console.timeLog(T)

  // Return 404 if node was null
  if (!node || node?.notFound) {
    logger.warn(`No valid node found for %s`, localePath, { type, localePath })
    return NOT_FOUND
  }

  // Does the page have correct url alias if /node/-path is called? if so, go there.
  if (/node/.test(localePath)) {
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
    logger.info('Redirecting old node alias to current node alias', {
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

  // Next.js complains about large page data on every page. The major
  // contributor seems to be huge menu structure that is included on each page.
  // See more info here: https://nextjs.org/docs/messages/large-page-data.
  let menus = {}
  if (node.field_layout === 'small') {
    menus = await getCachedAboutMenus({ locale, withAuth })
  } else {
    //Note, withAuth disables cache as it may cause a leak to published site at this point.
    // Needs further refactoring
    menus = await getCachedMenus({ locale, withAuth })
  }

  USE_TIMER && console.log('menus resolved')
  USE_TIMER && console.timeLog(T)

  let themeMenu = menuErrorResponse()
  let themes = null
  const { field_theme_menu_machine_name } = node
  if (field_theme_menu_machine_name) {
    themeMenu = menus[field_theme_menu_machine_name]
    if (!themeMenu) {
      themeMenu = await drupal.getMenu(field_theme_menu_machine_name, {
        locale,
        withAuth,
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
  // JSON parsing is used to remove any undefined values, as
  // Next.js will not serialize them.
  themeMenu = JSON.parse(JSON.stringify(themeMenu))

  const municipalities = await getCachedMunicipalities({ locale, withAuth })

  if (type === NODE_TYPES.LANDING_PAGE) {
    const themeImages = await getThemeHeroImages({
      tree: menus.main.tree,
      context,
      withAuth,
    })

    themes = menus.main.tree.map(({ url, title, id }, i) => {
      const image = themeImages[i]
      return { url, title, id, image: image?.src || null }
    })
  }

  // Format date in server. Don't load luxon to browser for one single formatting task.
  const lastUpdated = DateTime.fromISO(node.changed).toFormat('dd.MM.yyyy')

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
    revalidate: REVALIDATE_TIME,
  }
}

/***
 * Layout selector
 */
const Page = (props) => {
  const { node } = props
  useAddAskem(node.langcode, node.title)

  if (props?.type === NODE_TYPES.LANDING_PAGE) {
    return <HomePage {...props} />
  }
  if (props?.node?.field_layout === LAYOUT_SMALL) {
    return <AboutPage {...props} />
  }
  return <ArticlePage {...props} />
}
export default Page
