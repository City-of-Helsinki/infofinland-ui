import ArticlePage from '../../src/page-templates/ArticlePage'
import heroImage from '../../public/images/article1-sm.png'
import {
  getCommonApiContent,
  getMainMenu,
  addPrerenderLocalesToPaths,
  resolvePath,
} from '@/lib/ssr-api'
import {
  // getResourceByPath,
  // getResourceCollection,
  // getResourceFromContext,
  getResource,
} from 'next-drupal'

export const PROPS = {
  heroImage,
  color: 'orange',
  date: '?23.12.2015',
  category: '?Health and other things',
}

export async function getStaticPaths(context) {
  const { items } = await getMainMenu(context)
  const paths = items
    // Filter out theme pages
    .filter(({ parent }) => parent !== '')
    // Parse to theme and path slug
    .map(({ url }) => {
      //remove root slash and language code
      const [, , ...parts] = url.split('/')
      const [theme, ...path] = parts
      return {
        params: {
          theme,
          path,
        },
      }
    })

  return {
    paths: addPrerenderLocalesToPaths(paths),
    fallback: 'blocking',
  }
}

export async function getStaticProps(context) {
  const { locale, defaultLocale, params } = context
  const common = await getCommonApiContent(context)
  // const path = [ params.theme, ...params.path].join('/')
  const localePath = ['', locale, params.theme, ...params.path].join('/')
  const { data: page } = await resolvePath(localePath)

  const node = await getResource('node--page', page.entity.uuid, {
    locale,
    defaultLocale,
  })

  // // TODO content type resolvers in ssr-api?

  const { title, field_content } = node
  const content = await Promise.all(
    field_content.map(({ type, id }) =>
      getResource(type, id, {
        locale,
        defaultLocale,
      })
    )
  )

  return {
    props: {
      ...common,
      ...PROPS,
      title,
      node,
      content,
    },
    revalidate: process.env.REVALIDATE_TIME,
  }
}
export default ArticlePage
