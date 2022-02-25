import AboutPage from '@/src/page-templates/AboutPage'

import Block from '@/components/layout/Block'
import { useTranslation } from 'next-i18next'
import { getCommonApiContent } from '@/lib/ssr-api'
import CookieConsentForm from '@/components/layout/CookieConsentForm'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'
import getConfig from 'next/config'

export async function getStaticProps(context) {
  const { serverRuntimeConfig } = getConfig()

  return {
    props: {
      ...(await serverSideTranslations(context.locale, ['common'])),
      ...(await getCommonApiContent(context)),
    },
    revalidate: serverRuntimeConfig.REVALIDATE_TIME,
  }
}

export default function CookieConsentPage(props) {
  const { t } = useTranslation('common')

  return (
    <AboutPage {...props}>
      <Block about>
        <h1 className="mt-16 mb-8 text-h1 lg:text-h1xl">
          {t('cookies.settings.title')}
        </h1>
        <p className="mb-16">{t('cookies.text')}</p>
      </Block>
      <CookieConsentForm />
    </AboutPage>
  )
}
