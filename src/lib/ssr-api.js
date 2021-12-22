import { getMenu, getResource } from 'next-drupal'
import { i18n } from '../../next-i18next.config'
import axios from 'axios'
import { DrupalJsonApiParams } from 'drupal-jsonapi-params'
import getConfig from 'next/config'

export const NOT_FOUND = { notFound: true }
export const NODE_TYPES = {
  PAGE: 'node--page',
  LANDING_PAGE: 'node--landing_page',
  PVT_NODE: 'node--office_contact_info',
}
export const CONTENT_TYPES = {
  TEXT: 'paragraph--text',
  HEADING: 'paragraph--heading',
  PARAGRAPH_IMAGE: 'paragraph--image',
  ACCORDION: 'accordion',
  HERO: 'paragraph--hero',
  COLUMNS: 'columns',
  READMORE: 'paragraph--language_link_collection',
  READMORE_LINK_COLLECTION: 'node--link',
  READMORE_LINK: 'paragraph--language_link',
  LANGUAGE: 'taxonomy_term--language',
  LOCALINFO: 'local',
  FILE: 'file--file',
  PVT: 'paragraph--ptv_contact',
  PVT_NODE: 'node--office_contact_info',
  MEDIA_IMAGE: 'media--image',
}

export const getHeroFromNode = (node) => ({
  url: `${getConfig().publicRuntimeConfig.NEXT_PUBLIC_DRUPAL_BASE_URL}${
    node.field_hero?.field_hero_image.field_media_image.uri.url
  }`,
  title: node.field_hero?.field_hero_title,
})

export const getImage = (item) => ({
  src: `${getConfig().publicRuntimeConfig.NEXT_PUBLIC_DRUPAL_BASE_URL}${
    item.field_image?.field_media_image.uri.url
  }`,
  caption: item.field_image?.field_image_caption,
  //alt,title,width,height
  ...item.field_image?.field_media_image.resourceIdObjMeta,
})

export const getLinks = ({ collection, locale }) => {
  // let content
  return collection.map(
    ({ field_link_target_site: siteName, field_links, title }) => {
      //is there a link that matches request locale
      let mainTranslation = field_links.find(
        ({ field_language }) => field_language.field_locale === locale
      )
      //if not, is there a link that matches default locale EN
      if (!mainTranslation) {
        mainTranslation = field_links.find(
          ({ field_language }) =>
            field_language.field_locale === i18n.defaultLocale
        )
      }
      //if not, is there a link that matches fallback locale FI
      if (!mainTranslation) {
        mainTranslation = field_links.find(
          ({ field_language }) =>
            field_language.field_locale === i18n.fallbackLocale
        )
      }

      const languages = field_links
        .filter(({ field_language }) => field_language.field_locale !== locale)
        .map(({ field_language, field_language_link }) => {
          return {
            url: field_language_link,
            title: field_language.name,
            locale: field_language.field_locale,
          }
        })
        .sort(
          (a, b) =>
            i18n.locales.indexOf(a.locale) - i18n.locales.indexOf(b.locale)
        )
      return {
        title,
        siteName,
        mainTranslation: {
          locale: mainTranslation.field_language?.field_locale,
          url: mainTranslation.field_language_link,
        },
        languages,
      }
    }
  )
}

export const getLandingPageQueryParams = () =>
  new DrupalJsonApiParams()
    .addInclude([
      'field_content',
      'field_content.field_image.field_media_image',
      'field_hero.field_hero_image.field_media_image',
    ])
    .addFields(NODE_TYPES.LANDING_PAGE, [
      'id',
      'title',
      'revision_timestamp',
      'langcode',
      'field_content',
      'field_hero',
      'field_description',
      'field_has_hero',
      'field_metatags',
    ])
    .addFields(CONTENT_TYPES.MEDIA_IMAGE, ['field_media_image'])
    .addFields(CONTENT_TYPES.HERO, ['field_hero_title', 'field_hero_image'])
    .addFields(CONTENT_TYPES.FILE, ['uri', 'url'])
    .getQueryObject()

export const getPageQueryParams = () =>
  new DrupalJsonApiParams()
    // const queryString = new DrupalJsonApiParams()
    // //published pages only
    // .addFilter("status", "1")
    //Relations
    .addInclude([
      // Image
      'field_content.field_image.field_media_image',
      // Link Collectin
      'field_content.field_link_collection.field_links.field_language',
      // Hero
      'field_hero.field_hero_image.field_media_image',
      // PVT contact
      'field_content.field_contact_data',
    ])
    .addFields(NODE_TYPES.PAGE, [
      'id',
      'title',
      'revision_timestamp',
      'langcode',
      'field_content',
      'field_hero',
      'field_description',
      'field_has_hero',
      'field_metatags',
    ])
    // .addFields('node--page', ['id', 'title', 'revision_timestamp','langcode'])
    .addFields(CONTENT_TYPES.TEXT, ['field_text'])
    .addFields(CONTENT_TYPES.HEADING, ['field_title'])
    .addFields(CONTENT_TYPES.MEDIA_IMAGE, ['field_media_image'])
    .addFields(CONTENT_TYPES.HERO, ['field_hero_title', 'field_hero_image'])
    .addFields(CONTENT_TYPES.FILE, ['uri', 'url'])
    .addFields(CONTENT_TYPES.PVT, ['field_contact_data'])
    .addFields(CONTENT_TYPES.PVT_NODE, [
      'field_email_address',
      'field_office_id',
      'field_phonenumber',
      'field_postal_address',
      'field_postal_address_additional',
      'field_service_hours',
      'field_visiting_address',
      'field_visiting_address_additional',
      'title',
    ])
    //Link  relations
    .addFields(CONTENT_TYPES.READMORE, ['field_link_collection'])
    .addFields(CONTENT_TYPES.READMORE_LINK_COLLECTION, [
      'field_link_target_site',
      'title',
      'field_links',
    ])
    .addFields(CONTENT_TYPES.READMORE_LINK, [
      'field_language_link',
      'field_language',
    ])
    .addFields(CONTENT_TYPES.LANGUAGE, ['name', 'field_locale'])
    //DO not encode! Axios will do that
    .getQueryObject()

//always use locale path for drupal api queries
const NO_DEFAULT_LOCALE = 'dont-use'
// const LINK_TRANSLATION_MISSING = '--missing--'
const disableDefaultLocale = (locale) => ({
  locale,
  defaultLocale: NO_DEFAULT_LOCALE,
})

const menuErrorResponse = () => ({ items: [], tree: [], error: 'menu-error' })

export const resolvePath = async ({ path, context }) => {
  const { serverRuntimeConfig } = getConfig()
  const { locale, defaultLocale } = context
  const URL = `${serverRuntimeConfig.NEXT_PUBLIC_DRUPAL_BASE_URL}/${
    locale || defaultLocale
  }/router/translate-path`
  return axios.get(URL, {
    params: { path, _format: 'json' },
  })
}

export const getMainMenu = async (context) =>
  getMenu(getConfig().serverRuntimeConfig.DRUPAL_MENUS.MAIN, context)

export const getContent = ({ field_content }, { locale }) =>
  Promise.all(
    field_content.map(({ type, id }) =>
      getResource(type, id, disableDefaultLocale(locale))
    )
  )

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
  const [menu, footerMenu] = await Promise.all([
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
  ]).catch((e) => {
    throw e
  })

  return {
    menu,
    footerMenu,
  }
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
