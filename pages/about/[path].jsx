import AboutPage from '@/src/page-templates/AboutPage'
import { getCommonApiContent } from '@/lib/ssr-api'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'

export async function getStaticPaths() {
  // context
  // const { items } = await getAboutMenu(context)
  // const paths = getRootPages(items)
  return {
    paths: [],
    //  addPrerenderLocalesToPaths(paths),
    fallback: 'blocking',
  }
}

export async function getStaticProps(context) {
  return {
    props: {
      ...(await serverSideTranslations(context.defaultLocale, ['common'])),
      ...(await getCommonApiContent(context, process.env.DRUPAL_MENUS.ABOUT)),
    },
    revalidate: process.env.REVALIDATE_TIME,
  }
}

export default AboutPage
