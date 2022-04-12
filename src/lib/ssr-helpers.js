import getConfig from 'next/config'
import { i18n } from '../../next-i18next.config'

export const addPrerenderLocalesToPaths = (paths) =>
  getConfig()
    .serverRuntimeConfig.PRERENDER_LOCALES.map((locale) =>
      paths.map((path) => ({ ...path, locale }))
    )
    .flat()

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
        id: mainTranslation?.id || MISSING_ID_TOKEN,
        locale: mainTranslation?.field_language?.field_locale,
        url: mainTranslation?.field_language_link,
      }

      const allLanguages = field_links?.map(
        ({ field_language, field_language_link }) => {
          return {
            url: field_language_link,
            title: field_language.name,
            locale: field_language.field_locale,
          }
        }
      )
      // Sort official site languages first,
      // then all locales not in the site locales in alphabetical order
      const languages = allLanguages
        ?.filter(({ locale }) => i18n.locales.indexOf(locale) !== -1)
        .sort(
          (a, b) =>
            i18n.locales.indexOf(a.locale) - i18n.locales.indexOf(b.locale)
        )
        .concat(
          allLanguages
            ?.filter(({ locale }) => i18n.locales.indexOf(locale) === -1)
            .sort()
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

export const getSearchResult = ({ _source, highlight, _id }) => {
  const { _language, url, title } = _source
  const result = {
    language: _language,
    title,
    id: _id,
    url: url[0],
    ...highlight,
  }

  return result
}
