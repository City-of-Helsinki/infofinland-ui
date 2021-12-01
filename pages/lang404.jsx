import Head from 'next/head'
import Layout from '@/components/layout/Layout'
import cls from 'classnames'
import { useTranslation } from 'next-i18next'
import TextLink from '@/components/TextLink'
import * as DrupalApi from '@/lib/ssr-api'

export const LanguageNotFound = (props) => {
  const { t } = useTranslation('common')
  return (
    <Layout {...props}>
      <Head>
        <title>{t('lang404.title')}</title>
      </Head>
      <div
        className={cls(
          'border-s-10 border-neon-pink shadow-404title rounded min-h-lang404',
          ' mt-6 md:mt-12 mx-2 p-8 lg:mx-12  xl:mx-28 2xl:mx-48  3xl:ms-64  3xl:max-w-4xl '
        )}
      >
        <h1 className="mb-10 text-h2">{t('lang404.title')}</h1>
        <p className="mb-4">{t('lang404.text')}</p>
        <TextLink href="/">{t('lang404.link')}</TextLink>
      </div>
    </Layout>
  )
}

export async function getStaticProps(context) {
  const common = await DrupalApi.getCommonApiContent(context)
  return {
    props: {
      ...common,
    },
    revalidate: process.env.REVALIDATE_TIME,
  }
}

export default LanguageNotFound
