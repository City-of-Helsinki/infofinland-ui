import Head from 'next/head'
import { SecondaryLayout } from '@/components/layout/Layout'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'
import { useTranslation } from 'next-i18next'
import TextLink from '@/components/TextLink'
import * as DrupalApi from '@/lib/ssr-api'
import Block from '@/components/layout/Block'
// import getConfig from 'next/config'
import { getMenus } from '@/lib/ssr-api'
import { i18n } from '@/next-i18next.config'
import { siteUrl } from '@/next-sitemap'
import { useRouter } from 'next/router'

export async function getServerSideProps(context) {
  // const { serverRuntimeConfig } = getConfig()
  // const path = serverRuntimeConfig.SITEMAP_PAGE_PATH

  const allmenus = (
    await Promise.all(
      i18n.locales.map((locale) => {
        return getMenus({ locale })
      })
    )
  )
    .map((menu) => {
      return [
        ...menu.main.items,
        ...menu['cities-landing'].items,
        ...menu.cities.items,
        ...menu.about.items,
      ].map(({ url }) => url)
    })
    .flat()

  const urls = allmenus.flat().map((path) => new URL(path, siteUrl).toString())

  const menus = await DrupalApi.getMenus(context)
  // const node = await DrupalApi.getNodeFromPath({
  //   path,
  //   context,
  //   type: NODE_TYPES.PAGE,
  // })
  // if (!node) {
  //   return NOT_FOUND
  // }
  // Return 404 if node was null or sitemap doesnt exist

  // if (!node || !sitemap) {
  //   return NOT_FOUND
  // }
  // TODO Dont fetch common, only about-menu and footer menu and municipalities
  return {
    props: {
      urls,
      menus,
      ...(await serverSideTranslations(context.locale, ['common'])),
    },
    // revalidate: serverRuntimeConfig.REVALIDATE_TIME,
  }
}

export default function SiteMap(props) {
  const { t } = useTranslation('common')
  const { locale } = useRouter()
  const localeTester = new RegExp(`/${locale}/`)
  return (
    <SecondaryLayout {...props}>
      <Head>
        <title>{t('sitemap.title')}</title>
      </Head>
      <Block>
        <ul>
          <h1 className="mt-8 mb-16 text-h1 md:text-h1xl">
            {t('sitemap.title')}
          </h1>
          {props?.urls
            .filter((url) => localeTester.test(url))
            .map((url) => (
              <li key={`page-${url}`}>
                <TextLink href={url}>{url}</TextLink>
              </li>
            ))}
        </ul>
      </Block>
    </SecondaryLayout>
  )
}
