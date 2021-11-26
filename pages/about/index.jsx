import { BlankLayout } from '@/components/layout/Layout'

import {
  getAboutMenu,
  getCommonTranslations,
  getFooterAboutMenu,
} from '@/lib/ssr-api'

// export async function getStaticPaths(context) {
//   const { tree,items } = await getAboutMenu(context)
//   // Tree contains array of pages with subpages included inside.
//   // Map first level to get all themes
//   const items = map(tree, ({ url }) => {
//     //remove root slash and language code
//     const [, , theme] = url.split('/')
//     return {
//       params: {
//         theme,
//       },
//     }
//   })

//   const paths = ['fi']
//     .map((locale) => themes.map((theme) => ({ ...theme, locale })))
//     .flat()
//   return {
//     paths,
//     fallback: 'blocking',
//   }
// }

export async function getStaticProps(context) {
  const [aboutMenu, footerMenu, ...rest] = await Promise.all([
    getAboutMenu(context),
    getCommonTranslations(context.locale),
    getFooterAboutMenu(context),
  ])

  return {
    props: {
      aboutMenu,
      footerMenu,
      ...rest,
    },
    revalidate: process.env.REVALIDATE_TIME,
  }
}
export default function AboutPage({ aboutMenu }) {
  return (
    <BlankLayout>
      About pages test route
      <pre>{JSON.stringify(aboutMenu)}</pre>
    </BlankLayout>
  )
}
