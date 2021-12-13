import ThemePage from '../../src/page-templates/ThemePage'
import {
  getCommonApiContent,
  getMainMenu,
  addPrerenderLocalesToPaths,
  getPageWithContentByPath,
} from '@/lib/ssr-api'
import { map } from 'lodash'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'
export async function getStaticPaths(context) {
  let paths = []

  try {
    const { tree } = await getMainMenu(context)
    // Tree contains array of pages with subpages included inside.
    // Map first level to get all themes
    paths = addPrerenderLocalesToPaths(
      map(tree, ({ url }) => {
        //remove root slash and language code
        const [, , theme] = url.split('/')
        return {
          params: {
            theme,
          },
        }
      })
    )
  } catch (e) {
    const error_message =
      'Error while getting menu paths for prerender in [theme].getStaticPaths'
    console.error(error_message, e)
    const err = new Error(
      'Error while getting menu paths for prerender in [theme].getStaticPaths'
    )
    throw err
  }

  return {
    paths,
    fallback: 'blocking',
  }
}

export async function getStaticProps(context) {
  const path = `/${context.params.theme}`
  const [common, node] = await Promise.all([
    getCommonApiContent(context),
    getPageWithContentByPath({ path, context }),
  ])

  if (node === null) {
    return { notFound: true }
  }

  return {
    props: {
      ...common,
      node,
      ...(await serverSideTranslations(context.locale, ['common'])),
    },
    revalidate: process.env.REVALIDATE_TIME,
  }
}

export default ThemePage
