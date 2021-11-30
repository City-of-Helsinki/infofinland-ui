import AboutPage from '@/src/page-templates/AboutPage'

import {
  getAboutMenu,
  getCommonTranslations,
  getFooterAboutMenu,
} from '@/lib/ssr-api'

export async function getStaticPaths() {
  // const { tree,items } = await getAboutMenu(context)
  // // Tree contains array of pages with subpages included inside.
  // // Map first level to get all themes
  // const items = map(tree, ({ url }) => {
  //   //remove root slash and language code
  //   const [, , theme] = url.split('/')
  //   return {
  //     params: {
  //       theme,
  //     },
  //   }
  // })

  // const paths = ['fi']
  //   .map((locale) => themes.map((theme) => ({ ...theme, locale })))
  //   .flat()
  return {
    paths: [],
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
