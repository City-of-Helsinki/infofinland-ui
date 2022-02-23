import Head from 'next/head'
import {SecondaryLayout} from '@/components/layout/Layout'
import sitemap from '-!xml-loader!../public/sitemap.xml'

import { useTranslation } from 'next-i18next'
import TextLink from '@/components/TextLink'
import * as DrupalApi from '@/lib/ssr-api'
import Block from '@/components/layout/Block'
import getConfig from 'next/config'

export async function getStaticProps(context) {
  const { serverRuntimeConfig } = getConfig()

  const common = await DrupalApi.getCommonApiContent(context)
  return {
    props: {
      ...common,
    },
    revalidate: serverRuntimeConfig.REVALIDATE_TIME,
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
