import ArticlePage from '../../src/page-templates/ArticlePage'
import heroImage from '../../public/images/article1-sm.png'
import { getCommonApiContent, getMainMenu } from '@/lib/ssr-api'
import {
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

  const paths = ['fi', 'en', 'sv']
    .map((locale) => pages.map((path) => ({ ...path, locale })))
    .flat()

  return {
    paths,
    fallback: true,
  }
}

export async function getStaticProps(context) {
  const common = await getCommonApiContent(context)
  console.log(context)
  const { locale, defaultLocale } = context
  const node = await getResource(
    'node--page',
    '2228a737-94a7-4aa4-901f-d5d322e25833',
    {
      locale,
      defaultLocale,
    }
  )
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
