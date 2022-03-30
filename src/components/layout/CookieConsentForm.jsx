import { CookieConsentActions } from '@/components/layout/CookieConsent'
import Block from '@/components/layout/Block'
import { useTranslation } from 'next-i18next'
import { useAtom } from 'jotai'
import ToggleSwitch from '@/components/ToggleSwitch'
import { cookieConsentAtom, isCookieConsentSetAtom } from '@/src/store'
import cls from 'classnames'
import { useAtomValue } from 'jotai/utils'

const CookieConsentForm = () => {
  const { t } = useTranslation('common')
  const [isAnalyticsAllowed, setConsent] = useAtom(cookieConsentAtom)
  const ack = useAtomValue(isCookieConsentSetAtom)
  const toggleConsent = () => setConsent(!isAnalyticsAllowed)

  return (
    <>
      <Block about>
        <ToggleSwitch
          // type coersion for SSR rendering when value is only in client.
          checked={!!isAnalyticsAllowed}
          text={t('cookies.labels.analytics')}
          id="ifu-cc-analytics"
          value="analytics"
          onChange={toggleConsent}
          className="pb-16"
        />
      </Block>
      <Block about className={cls(' h-42')}>
        <p className="pt-8 text-center border-t border-bodytext-color">
          {!ack && <CookieConsentActions />}
        </p>
      </Block>
    </>
  )
}
export default CookieConsentForm
