import AboutPage from '@/src/page-templates/AboutPage'

import {
  getAboutMenu,
  getCommonTranslations,
  getFooterAboutMenu,
} from '@/lib/ssr-api'

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
