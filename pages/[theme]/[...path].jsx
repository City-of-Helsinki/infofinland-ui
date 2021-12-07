import ArticlePage from '../../src/page-templates/ArticlePage'
import {
  getCommonApiContent,
  getMainMenu,
  addPrerenderLocalesToPaths,
  getPageByPath,
} from '@/lib/ssr-api'

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
  const { params } = context
  const path = [params.theme, ...params.path].join('/')
  const common = await getCommonApiContent(context)
  const { content, node, fiNode } = await getPageByPath({ path, context })
  if (node === null) {
    return { notFound: true }
  }
  return {
    props: {
      ...common,
      content,
      node,
      fiNode,
    },
    revalidate: process.env.REVALIDATE_TIME,
  }
}
export default ArticlePage
