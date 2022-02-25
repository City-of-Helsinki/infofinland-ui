import { CookieConsentActions } from '@/components/layout/CookieConsent'
import Block from '@/components/layout/Block'
import { useTranslation } from 'next-i18next'
import { useAtomValue, useUpdateAtom } from 'jotai/utils'
import ToggleSwitch from '@/components/ToggleSwitch'
import { cookieConsentAtom } from '@/src/store'
import { isSSR } from '@/hooks/useIsomorphicLayoutEffect'

const CookieConsentForm = () => {
  const { t } = useTranslation('common')
  const isAnalyticsAllowed = useAtomValue(cookieConsentAtom)
  const setConsent = useUpdateAtom(cookieConsentAtom)
  const toggleConsent = () => setConsent(!isAnalyticsAllowed)

  return (
    <form>
      {!isSSR() && (
        <Block about>
          <ToggleSwitch
            checked={isAnalyticsAllowed}
            text={t('cookies.labels.analytics')}
            id="ifu-cc-analytics"
            value="analytics"
            onChange={toggleConsent}
            className="pb-16"
          />
          <span className="inline-block mx-4">
            {t(isAnalyticsAllowed ? 'cookies.allowed' : 'cookies.denied')}
          </span>
        </Block>
      )}
      <Block about>
        <p className="pt-8 text-center border-t border-bodytext-color">
          <CookieConsentActions />
        </p>
      </Block>
    </form>
  )
}
export default CookieConsentForm
