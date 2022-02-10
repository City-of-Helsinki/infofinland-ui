import { getMenu, getResource, getResourceCollection } from 'next-drupal'
import { i18n } from '../../next-i18next.config'
import axios from 'axios'
import { DrupalJsonApiParams } from 'drupal-jsonapi-params'
import getConfig from 'next/config'
import { CONTENT_TYPES, NODE_TYPES } from './DRUPAL_API_TYPES'
import { getMunicipalityParams, getThemeHeroParams } from './query-params'
const ROUTER_PATH = '/router/translate-path'
const NO_DEFAULT_LOCALE = 'dont-use'
const disableDefaultLocale = (locale) => ({
  locale,
  defaultLocale: NO_DEFAULT_LOCALE,
})

export const menuErrorResponse = () => ({
  items: [],
  tree: [],
  error: 'menu-error',
})

// Export query params through ssr-api for convenience
export * from './query-params'

export const NOT_FOUND = { notFound: true }

export const getHeroFromNode = (node) => {
  const host = getConfig().publicRuntimeConfig.NEXT_PUBLIC_DRUPAL_BASE_URL
  const url = node?.field_hero?.field_hero_image?.field_media_image?.uri?.url
  return {
    src: url ? `${host}${url}` : null,
    title: node?.field_hero?.field_hero_title || null,
    color: node?.field_hero?.field_hero_bg_color || null,
  }
}

export const getImage = (item = {}) => {
  const host = getConfig().publicRuntimeConfig.NEXT_PUBLIC_DRUPAL_BASE_URL
  const url = item.field_image?.field_media_image?.uri?.url
  const caption = item.field_image_caption
  const photographer = item.field_image?.field_photographer
  return {
    src: url ? `${host}${url}` : undefined,
    caption,
    photographer,
    // ...meta:{alt,title,width,height}
    ...item.field_image?.field_media_image.resourceIdObjMeta,
  }
}

export const getVideo = ({
  field_video_url,
  field_remote_video,
  field_video_title,
} = {}) => {
  const url =
    field_video_url?.uri || field_remote_video?.field_media_oembed_video
  const title = field_video_url?.title || field_video_title
  return { url, title }
}

const ERROR_MISSING_LANGUAGE = 'language id missing'
const MISSING_ID_TOKEN = 'missing'

export const getLinks = ({ collection, locale } = {}) => {
  if (!locale) {
    console.error('Cannot resolve main link without locale')
    return
  }
  return collection?.map(
    ({ field_link_target_site: siteName, field_links, title }) => {
      //is there a link that matches request locale
      let mainTranslation = field_links?.find(({ field_language, id }) => {
        if (id === MISSING_ID_TOKEN) {
          console.error(ERROR_MISSING_LANGUAGE)
          return
        }
        return field_language.field_locale === locale
      })
      //if not, is there a link that matches default locale EN
      if (!mainTranslation) {
        mainTranslation = field_links?.find(({ field_language, id }) => {
          if (id === MISSING_ID_TOKEN) {
            console.error(ERROR_MISSING_LANGUAGE)
            return
          }
          return field_language?.field_locale === i18n.defaultLocale
        })
      }
      //if not, is there a link that matches fallback locale FI
      if (!mainTranslation) {
        mainTranslation = field_links?.find(({ field_language, id }) => {
          if (id === MISSING_ID_TOKEN) {
            console.error(ERROR_MISSING_LANGUAGE)
            return
          }
          return field_language?.field_locale === i18n.fallbackLocale
        })
      }
      mainTranslation = {
        locale: mainTranslation?.field_language?.field_locale,
        url: mainTranslation?.field_language_link,
      }

      const languages = field_links
        ?.map(({ field_language, field_language_link }) => {
          return {
            url: field_language_link,
            title: field_language.name,
            locale: field_language.field_locale,
          }
        })
        .sort(
          // According to configured language order, same as in language menu
          (a, b) =>
            i18n.locales.indexOf(a.locale) - i18n.locales.indexOf(b.locale)
        )

      return {
        title,
        siteName,
        mainTranslation,
        languages,
      }
    }
  )
}

export const resolvePath = async ({ path, context }) => {
  const { serverRuntimeConfig } = getConfig()
  const { locale, defaultLocale } = context
  const URL = `${serverRuntimeConfig.NEXT_PUBLIC_DRUPAL_BASE_URL}/${
    locale || defaultLocale
  }${ROUTER_PATH}`
  return axios.get(URL, {
    params: { path, _format: 'json' },
  })
}

export const getMainMenu = async (context) =>
  getMenu(getConfig().serverRuntimeConfig.DRUPAL_MENUS.MAIN, context)

export const getFooterAboutMenu = async ({ locale }) =>
  getMenu(
    getConfig().serverRuntimeConfig.DRUPAL_MENUS.FOOTER,
    disableDefaultLocale(locale)
  )

export const getAboutMenu = async ({ locale }) =>
  getMenu(getConfig().serverRuntimeConfig.DRUPAL_MENUS.ABOUT, {
    locale,
    defaultLocale: NO_DEFAULT_LOCALE,
  })

export const getCommonApiContent = async ({ locale }) => {
  const context = { locale, defaultLocale: NO_DEFAULT_LOCALE }
  const [menu, footerMenu, municipalities] = await Promise.all([
    //Main menu or whatever is called
    getMainMenu(context).catch((e) => {
      console.error('menu error', e)
      return menuErrorResponse(e)
    }),
    //Footer Menu
    getFooterAboutMenu(context).catch((e) => {
      console.error('footerMenu error', e)
      return menuErrorResponse(e)
    }),
    //Municipalities
    getMunicipalities(context).catch((e) => {
      console.error('municipality list error', e)
      return []
    }),
  ]).catch((e) => {
    throw e
  })

  return {
    menu,
    footerMenu,
    municipalities,
  }
}

export const getThemeHeroImages = async ({ tree, context }) => {
  const responses = await Promise.all(
    tree.map((page) => resolvePath({ path: page.url, context }))
  )
  if (!responses) {
    return null
  }
  const ids = responses.map(({ data }) => data?.entity?.uuid)

  if (!ids || ids.length === 0) {
    return null
  }

  const nodes = await Promise.all(
    ids.map((id) =>
      getResource(NODE_TYPES.PAGE, id, {
        locale: context.locale,
        params: getThemeHeroParams(),
      }).catch((e) => {
        console.error(e)
      })
    )
  )

  if (!nodes) {
    return null
  }

  return nodes.map(getHeroFromNode)
}

export const getDefaultLocaleNode = async (id) =>
  getResource(NODE_TYPES.PAGE, id, {
    locale: i18n.fallbackLocale, //fi
    defaultLocale: NO_DEFAULT_LOCALE,
    params: new DrupalJsonApiParams()
      .addFields(NODE_TYPES.PAGE, ['title'])
      .getQueryObject(),
  })

export const addPrerenderLocalesToPaths = (paths) =>
  getConfig()
    .serverRuntimeConfig.PRERENDER_LOCALES.map((locale) =>
      paths.map((path) => ({ ...path, locale }))
    )
    .flat()

export const getMunicipalities = async ({locale}) =>
  getResourceCollection(CONTENT_TYPES.MUNICIPALITY, {
    locale,
    defaultLocale:NO_DEFAULT_LOCALE,
    params: getMunicipalityParams(),
  })
