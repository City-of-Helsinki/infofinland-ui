import AboutPage from '@/src/page-templates/AboutPage'
import { getCommonApiContent } from '@/lib/ssr-api'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'
import getConfig from 'next/config'

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
  const { serverRuntimeConfig } = getConfig()

  return {
    props: {
      ...(await serverSideTranslations(context.defaultLocale, ['common'])),
      ...(await getCommonApiContent(
        context,
        serverRuntimeConfig.DRUPAL_MENUS.ABOUT
      )),
    },
    revalidate: serverRuntimeConfig.REVALIDATE_TIME,
  }
}

export default AboutPage
