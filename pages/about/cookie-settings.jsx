import AboutPage from '@/src/page-templates/AboutPage'
import { CookieConsentActions } from '@/components/layout/CookieConsent'
import Block from '@/components/layout/Block'
import { useTranslation } from 'next-i18next'

import { getCommonApiContent } from '@/lib/ssr-api'
import { useAtomValue, useUpdateAtom } from 'jotai/utils'
import ToggleSwitch from '@/components/ToggleSwitch'
import { cookieConsent } from '@/src/store'

export async function getStaticProps(context) {
  return {
    props: {
      ...(await getCommonApiContent(context, process.env.DRUPAL_MENUS.ABOUT)),
    },
    revalidate: process.env.REVALIDATE_TIME,
  }
}

export default function CookieConsentPage({ ...layout }) {
  const { t } = useTranslation('common')
  const isAnalyticsAllowed = useAtomValue(cookieConsent)
  const setConsent = useUpdateAtom(cookieConsent)
  const toggleConsent = () => setConsent(!isAnalyticsAllowed)

  return (
    <AboutPage {...layout}>
      <Block about>
        <h1 className="mt-16 mb-8 text-h1 lg:text-h1xl">
          {t('cookies.settings.title')}
        </h1>
        <p className="mb-16">{t('cookies.text')}</p>
      </Block>
      <form>
        <Block className="pb-16 mt-16" about>
          <ToggleSwitch
            checked={isAnalyticsAllowed}
            text={t('cookies.labels.analytics')}
            id="ifu-cc-analytics"
            value="analytics"
            onChange={toggleConsent}
            className=""
          />
          <span className="inline-block mx-4">
            {t(isAnalyticsAllowed ? 'cookies.allowed' : 'cookies.denied')}
          </span>
        </Block>
        <Block about>
          <p className="pt-8 text-center border-t border-bodytext-color">
            <CookieConsentActions />
          </p>
        </Block>
      </form>
    </AboutPage>
  )
}
