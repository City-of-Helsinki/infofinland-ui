import Head from 'next/head'
import { SecondaryLayout } from '@/components/layout/Layout'
import sitemap from '-!xml-loader!../public/sitemap.xml'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'
import { NOT_FOUND } from '@/lib/ssr-api'
import { useTranslation } from 'next-i18next'
import TextLink from '@/components/TextLink'
import * as DrupalApi from '@/lib/ssr-api'
import Block from '@/components/layout/Block'
import getConfig from 'next/config'
import { NODE_TYPES } from '@/lib/DRUPAL_API_TYPES'

export async function getServerSideProps(context) {
  const { serverRuntimeConfig } = getConfig()
  const path = serverRuntimeConfig.SITEMAP_PAGE_PATH
  const common = await DrupalApi.getCommonApiContent(context)
  const node = await DrupalApi.getNodeFromPath({
    path,
    context,
    type: NODE_TYPES.PAGE,
  })

  // Return 404 if node was null or sitemap doesnt exist
  if (!node || !sitemap) {
    return NOT_FOUND
  }

  return {
    props: {
      node,
      ...common,
      ...(await serverSideTranslations(context.locale, ['common'])),
    },
    // revalidate: serverRuntimeConfig.REVALIDATE_TIME,
  }
}

export default function SiteMap(props) {
  const { t } = useTranslation('common')

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
          {sitemap.urlset.url.map(({ loc }, i) => (
            <li key={`page-${i}`}>
              <TextLink href={loc}>{loc}</TextLink>
            </li>
          ))}
        </ul>
      </Block>
    </SecondaryLayout>
  )
}
