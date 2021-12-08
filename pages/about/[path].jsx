import AboutPage from '@/src/page-templates/AboutPage'
import { getCommonApiContent } from '@/lib/ssr-api'

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
      ...(await getCommonApiContent(context, process.env.DRUPAL_MENUS.ABOUT)),
    },
    revalidate: process.env.REVALIDATE_TIME,
  }
}

export default AboutPage
