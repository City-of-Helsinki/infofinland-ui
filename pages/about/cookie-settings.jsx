import AboutPage from '@/src/page-templates/AboutPage'
import { CookieConsentActions } from '@/components/layout/CookieConsent'
import Block from '@/components/layout/Block'
import { useTranslation } from 'next-i18next'

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

export default function CookieConsentPage({ children, ...layout }) {
  const { t } = useTranslation('common')

  return (
    <AboutPage {...layout}>
      {children}
      <Block className="mt-16">
        <p className="mb-16">{t('cookies.text')}</p>

        <p className="text-center">
          <CookieConsentActions />
        </p>
      </Block>
    </AboutPage>
  )
}
