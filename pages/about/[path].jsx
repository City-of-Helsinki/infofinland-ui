import AboutPage from '@/src/page-templates/AboutPage'

import {
  getAboutMenu,
  getCommonTranslations,
  getFooterAboutMenu,
  addPrerenderLocalesToPaths,
} from '@/lib/ssr-api'

import { getRootPages } from '@/lib/menu-utils'

export async function getStaticPaths(context) {
  const { items } = await getAboutMenu(context)
  const paths = getRootPages(items)
  return {
    paths: addPrerenderLocalesToPaths(paths),
    fallback: 'blocking',
  }
}
export async function getStaticProps(context) {
  const [aboutMenu, footerMenu, translations] = await Promise.all([
    getAboutMenu(context),
    getFooterAboutMenu(context),
    getCommonTranslations(context.locale),
  ])

  return {
    props: {
      aboutMenu,
      footerMenu,
      ...translations,
    },
    revalidate: process.env.REVALIDATE_TIME,
  }
}

export default AboutPage
