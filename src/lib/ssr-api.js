import { getMenu, getResource } from 'next-drupal'
import { sample } from 'lodash'
import { i18n } from '../../next-i18next.config'
import axios from 'axios'
import { DrupalJsonApiParams } from 'drupal-jsonapi-params'
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
  LOCALINFO: 'local',
  FILE: 'file--file',
  MEDIA_IMAGE: 'media--image',
}

//always use locale path for drupal api queries
const NO_DEFAULT_LOCALE = 'dont-use'
const disableDefaultLocale = (locale) => ({
  locale,
  defaultLocale: NO_DEFAULT_LOCALE,
})

const API_URLS = {
  uriFromFile: (file) =>
    `${process.env.NEXT_PUBLIC_DRUPAL_BASE_URL}${file.uri.url}`,
  getPage: ({ locale, defaultLocale, id, queryString }) =>
    `${process.env.NEXT_PUBLIC_DRUPAL_BASE_URL}/${
      locale || defaultLocale
    }/jsonapi/node/page/${id}?${queryString || ''}`,
}

const menuErrorResponse = () => ({ items: [], tree: [], error: 'menu-error' })
const AXIOS_ERROR_RESPONSE = { data: null }

export const resolvePath = async ({ path, context }) => {
  const { locale, defaultLocale } = context
  const URL = `${process.env.NEXT_PUBLIC_DRUPAL_BASE_URL}/${
    locale || defaultLocale
  }/router/translate-path`
  return axios.get(URL, {
    params: { path, _format: 'json' },
  })
}

export const getPageById = async (id, { locale, defaultLocale }) => {
  const queryString = new DrupalJsonApiParams()
    //Relations
    .addInclude([
      'field_content.field_image.field_media_image',
      'field_content.field_link_collection.field_links',
      'field_hero.field_hero_image.field_media_image',
    ])
    // Page data
    .addFields('node--page', ['id', 'title', 'revision_timestamp'])
    // image file data
    .addFields('file--file', ['uri', 'url'])
    // .addFields('paragraph--hero', ['title, field_hero_image'])
    // .addFields('paragrap--language_link',['name'])
    //DO not encode! Axios will do that
    .getQueryString({ encode: false })
  return axios.get(API_URLS.getPage({ locale, defaultLocale, id, queryString }))
}

export const getPageWithContentByPath = async ({ path, context }) => {
  const { data: pathNode } = await resolvePath({ path, context }).catch((e) => {
    console.error(e)
    return AXIOS_ERROR_RESPONSE
  })
  // Error in resolving path. return 404 in getStaticProps
  if (!pathNode) {
    return null
  }
  const {
    entity: { uuid: id },
  } = pathNode

  const { data: page } = await getPageById(id, context).catch((e) => {
    console.error(e)
    return AXIOS_ERROR_RESPONSE
  })
  // Error in resolving page node. return 404 in getStaticProps
  if (!page) {
    return null
  }
  const included = page.included || []
  let content = []
  if (page.included) {
    content = await resolveContent(
      page.included.map((item) => {
        const { type, id, attributes, ...rest } = item
        return { type, id, ...attributes, ...rest }
      })
    )
  }

  const hero = content.find(({ type }) => type === CONTENT_TYPES.HERO) || null
  const { attributes, ...restOfNode } = page.data
  const node = { content, included, ...attributes, ...restOfNode, hero }
  let fiNode = { title: node?.title || '' }

  if (context.locale !== i18n.defaultLocale) {
    fiNode = await getDefaultLocaleNode(id).catch(() => ({
      // error in retriving finnish title.
      // Ignore and return current language title.
      title: node.title,
    }))
  }
  return { ...node, fiTitle: fiNode.title }
}

export const getMainMenu = async (context) =>
  getMenu(process.env.DRUPAL_MENUS.MAIN, context)

export const getContent = ({ field_content }, { locale }) =>
  Promise.all(
    field_content.map(({ type, id }) =>
      getResource(type, id, disableDefaultLocale(locale))
    )
  )

export const getFooterAboutMenu = async ({ locale }) =>
  getMenu(process.env.DRUPAL_MENUS.FOOTER, disableDefaultLocale(locale))

export const getAboutMenu = async ({ locale }) =>
  getMenu(process.env.DRUPAL_MENUS.ABOUT, {
    locale,
    defaultLocale: NO_DEFAULT_LOCALE,
  })

export const getCommonApiContent = async (
  { locale },
  main = process.env.DRUPAL_MENUS.MAIN,
  footer = process.env.DRUPAL_MENUS.FOOTER
) => {
  const context = { locale, defaultLocale: NO_DEFAULT_LOCALE }
  const [menu, footerMenu, translations] = await Promise.all([
    //Main menu or whatever is called
    getMenu(main, context).catch((e) => {
      console.error('menu error', e)
      return menuErrorResponse(e)
    }),
    //Footer Menu
    getMenu(footer, context).catch((e) => {
      console.error('footerMenu error', e)
      return menuErrorResponse(e)
    }),
  ]).catch((e) => {
    throw e
  })

  return {
    menu,
    footerMenu,
    color: sample(process.env.HERO_COLORS),
    ...translations,
  }
}

export const getDefaultLocaleNode = async (id) =>
  getResource('node--page', id, {
    locale: i18n.defaultLocale,
    defaultLocale: NO_DEFAULT_LOCALE,
  })

// export const getPageByPath = async ({ path, context }) => {
//   const localeContext = {
//     locale: context.locale,
//     defaultLocale: NO_DEFAULT_LOCALE,
//   }
//   const node = await getResourceByPath(path, {
//     ...localeContext,
//     params: { include: 'field_content' },
//   })
//   let fiNode = { title: node?.title || '' }
//   let content = []
//   if (node?.field_content?.length > 0) {
//     content = await getContent(node, localeContext)
//   }

//   if (context.locale !== i18n.defaultLocale && node !== null) {
//     fiNode = await getDefaultLocaleNode(node.id).catch(() => ({
//       title: node.title,
//     }))
//   }

//   return { node, content, fiTitle: fiNode.title }
// }

const getReadMoreLinks = async ({
  item: { relationships },
  linkCollections,
  links,
}) => {
  let content = []
  const linksIds = relationships.field_link_collection.data.map(({ id }) => id)
  const linkCollection = linkCollections.filter(({ id }) =>
    linksIds.includes(id)
  )

  content = await Promise.all(
    linkCollection.map(
      async ({
        relationships,
        title,
        field_link_target_site: siteName,
        langcode: reqLang,
      }) => {
        const relatedLinksIds = relationships.field_links.data.map(
          ({ id }) => id
        )

        const relatedLinks = links.filter(({ id }) =>
          relatedLinksIds.includes(id)
        )

        const translations = await Promise.all(
          relatedLinks.map(
            async ({ field_language_link: url, relationships }) => {
              const queryString = new DrupalJsonApiParams()
                .addFields('taxonomy_term--language', ['name', 'field_locale'])
                .getQueryString({ encode: false })

              const { data: translation } = await axios.get(
                `${relationships.field_language.links.related.href}?${queryString}`
              )
              return {
                url,
                text: translation.data.attributes.name,
                locale: translation.data.attributes.field_locale,
              }
            }
          )
        )

        let mainTranslation
        let languages

        if (translations.length === 1) {
          mainTranslation = translations.at(0)
          languages = []
        } else {
          // Prefer link with current language
          mainTranslation = translations.find(
            ({ locale }) => locale === reqLang
          )
          // if not, use fallback locale (en)
          if (!mainTranslation) {
            mainTranslation = translations.find(
              ({ locale }) => locale === i18n.fallbackLocale
            )
          }
          // if not, use default locale (fi)
          if (!mainTranslation) {
            mainTranslation = translations.find(
              ({ locale }) => locale === i18n.defaultLocale
            )
          }

          languages = translations.filter(
            ({ locale }) => locale !== mainTranslation?.locale
          )
        }

        return {
          pageName: title,
          siteName,
          mainTranslation,
          languages,
        }
      }
    )
  )
  return content
}

export const addPrerenderLocalesToPaths = (paths) =>
  process.env.PRERENDER_LOCALES.map((locale) =>
    paths.map((path) => ({ ...path, locale }))
  ).flat()

const getImageForParagraphImage = ({
  item: { relationships },
  media,
  files,
}) => {
  const mediaId = relationships?.field_image?.data?.id
  const mediaItem = media.find(({ id }) => id === mediaId).relationships
    ?.field_media_image?.data
  const file = files.find(({ id }) => id === mediaItem.id)
  const src = API_URLS.uriFromFile(file)

  return { ...mediaItem.meta, src }
}

const getHeroUrl = ({ item: { relationships }, media, files }) => {
  const mediaId = relationships.field_hero_image.data.id
  const mediaItem = media.find(({ id }) => id === mediaId)
  const fileId = mediaItem.relationships.field_media_image.data.id
  const file = files.find(({ id }) => id === fileId)
  return API_URLS.uriFromFile(file)
}
export const resolveContent = async (content) => {
  if (content?.length === 0) {
    return null
  }

  const media = content.filter(({ type }) => type == CONTENT_TYPES.MEDIA_IMAGE)
  const files = content.filter(({ type }) => type === CONTENT_TYPES.FILE)
  const linkCollections = content.filter(
    ({ type }) => type === CONTENT_TYPES.READMORE_LINK_COLLECTION
  )
  const links = content.filter(
    ({ type }) => type === CONTENT_TYPES.READMORE_LINK
  )

  const paragraphs = content.filter(({ type }) =>
    [
      CONTENT_TYPES.READMORE,
      CONTENT_TYPES.PARAGRAPH_IMAGE,
      CONTENT_TYPES.TEXT,
      CONTENT_TYPES.HEADING,
      CONTENT_TYPES.HERO,
    ].includes(type)
  )

  return await Promise.all(
    paragraphs.map(async (item) => {
      const { type } = item
      switch (type) {
        case CONTENT_TYPES.PARAGRAPH_IMAGE:
          return {
            ...item,
            ...(await getImageForParagraphImage({ item, media, files })),
          }
        case CONTENT_TYPES.READMORE:
          return {
            ...item,
            content: await getReadMoreLinks({ item, linkCollections, links }),
          }

        case CONTENT_TYPES.HERO:
          return {
            type: item.type,
            url: getHeroUrl({ item, media, files }),
          }

        default:
          return item
      }
    })
  )
}
