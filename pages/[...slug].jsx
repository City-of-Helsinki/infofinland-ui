import ArticlePage from '@/src/page-templates/ArticlePage'
import getConfig from 'next/config'

import {
  getCommonApiContent,
  // getMainMenu,
  // addPrerenderLocalesToPaths,
  // getPageByPath,
  getPageWithContentByPath,
} from '@/lib/ssr-api'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'

export async function getStaticPaths() {
  const { serverRuntimeConfig, publicRuntimeConfig } = getConfig()
  console.log('env.TEST PRERENDER PATHS', {
    ssr: serverRuntimeConfig.TEST,
    public: publicRuntimeConfig.NEXT_PUBLIC_TEST,
    direct: process.env.TEST,
  })
  return {
    paths: [],
    fallback: 'blocking',
  }

  // const { items } = await getMainMenu(context).catch((e) => {
  //   console.error('Error while getting main menu', e)
  //   // if (process.env.development) {
  //   //   console.error(e)
  //   // }
  //   return { items: [] }
  // })
  // const paths = items
  //   // Filter out theme pages
  //   .filter(({ parent }) => parent !== '')
  //   // Parse to theme and path slug
  //   .map(({ url }) => {
  //     //remove root slash and language code
  //     const [, , ...path] = url.split('/')
  //     return {
  //       params: {
  //         path,
  //       },
  //     }
  //   })

  // return {
  //   paths: addPrerenderLocalesToPaths(paths),
  //   fallback: 'blocking',
  // }
}

export async function getStaticProps(context) {
  const { serverRuntimeConfig } = getConfig()
  // console.log('env.TEST SSR', {
  //   ssr: serverRuntimeConfig.TEST,
  //   public: publicRuntimeConfig.NEXT_PUBLIC_TEST,
  //   direct: process.env.TEST,
  // })
  const { params, locale } = context

  const path = params.slug?.join('/') || params.slug

  // else get Basic Page
  const [common, node] = await Promise.all([
    getCommonApiContent(context),
    getPageWithContentByPath({ path, context }),
  ])
  // console.log({node})

  if (node === null) {
    return { notFound: true }
  }
  return {
    props: {
      locale,
      ...common,
      node,
      ...(await serverSideTranslations(context.locale, ['common'])),
    },
    revalidate: serverRuntimeConfig.REVALIDATE_TIME,
  }
}
export default ArticlePage
