import ArticlePage from '../../src/page-templates/ArticlePage'
import heroImage from '../../public/images/article1-sm.png'
import { getCommonApiContent, getMainMenu } from '@/lib/ssr-api'
import {
  // getResourceByPath,
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
  const pages = items
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

  // Add list of prerendered languages for pages
  const paths = ['fi']
    .map((locale) => pages.map((path) => ({ ...path, locale })))
    .flat()

  return {
    paths,
    fallback: 'blocking',
  }
}

export async function getStaticProps(context) {
  const common = await getCommonApiContent(context)

  const { locale, defaultLocale /*params*/ } = context
  // const path = ['', params.theme, ...params.path].join('/')
  // const localePath = ['', locale, params.theme, ...params.path].join('/')
  // const page = common.mainMenu.items.find(({ url }) => url === localePath)
  const node = await getResource(
    'node--page',
    '2228a737-94a7-4aa4-901f-d5d322e25833',
    {
      locale,
      defaultLocale,
    }
  )

  // const node = await getResourceByPath(
  //   path,
  //   {
  //     locale,
  //     defaultLocale,
  //   }
  // )
  // TODO content type resolvers in ssr-api?
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
