import ThemePage from '../../src/page-templates/ThemePage'
import heroImage from '../../public/images/article1-sm.png'
import {
  getCommonApiContent,
  getMainMenu,
  addPrerenderLocalesToPaths,
} from '@/lib/ssr-api'
import { map } from 'lodash'
import { getResourceByPath } from 'next-drupal'
export const PROPS = {
  heroImage,
  title: 'Oleskelulupaongelmat',
  color: 'green',
  date: '23.12.2015',
  category: 'Health and other things',
}

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
    console.error(e)
    const err = new Error(
      'Error while getting menu paths for prerender in [theme].getStaticPaths',
      e
    )
    // if(process.env.production){

    // } else {
    throw err
    // }
  }

  return {
    paths,
    fallback: 'blocking',
  }
}

export async function getStaticProps(context) {
  const { locale, defaultLocale, params } = context
  const path = [params.theme].join('/')
  const common = await getCommonApiContent(context)

  const node = await getResourceByPath(path, {
    locale,
    defaultLocale,
  })

  return {
    props: {
      ...common,
      ...PROPS,
      node,
    },
    revalidate: process.env.REVALIDATE_TIME,
  }
}

export default ThemePage
