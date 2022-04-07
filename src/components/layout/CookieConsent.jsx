import Button from '@/components/Button'
import { useTranslation } from 'next-i18next'
import Link from 'next/link'
import { isCookieConsentSetAtom, cookieConsentAtom } from '@/src/store'
import { useAtomValue, useUpdateAtom } from 'jotai/utils'
import { useRouter } from 'next/router'
import { CSSTransition } from 'react-transition-group'
import getConfig from 'next/config'
import { isSSR } from '@/hooks/useIsomorphicLayoutEffect'

export function CookieConsentActions() {
  const { t } = useTranslation('common')
  const setConsent = useUpdateAtom(cookieConsentAtom)
  const allow = () => setConsent(true)
  const deny = () => setConsent(false)

  return (
    <>
      <Button
        className="block md:inline-block mx-auto mb-4 md:me-4"
        onClick={deny}
      >
        {t('cookies.deny')}
      </Button>
      <Button
        className="block md:inline-block mx-auto mb-4 md:me-12"
        onClick={allow}
      >
        {t('cookies.allow')}
      </Button>
    </>
  )
}

export default function CookieConsentBar() {
  const { publicRuntimeConfig } = getConfig()
  const { t } = useTranslation('common')
  const isConsentSet = useAtomValue(isCookieConsentSetAtom)
  const { asPath, locale } = useRouter()
  const isAboutPage = asPath.startsWith(publicRuntimeConfig.COOKIE_PAGE_PATH)
  return (
    !isSSR() &&
    !isAboutPage &&
    !isConsentSet && (
      <CSSTransition
        classNames={{
          appear: 'ifu-cookies__banner--appear',
          appearActive: 'ifu-cookies__banner--appear-active',
          appearDone: 'ifu-cookies__banner--appear-done',
          enter: 'ifu-cookies__banner--enter',
          enterActive: 'ifu-cookies__banner--enter-active',
          enterDone: 'ifu-cookies__banner--enter-done',
          exit: 'ifu-cookies__banner--exit',
          exitActive: 'ifu-cookies__banner--exit-active',
          exitDone: 'ifu-cookies__banner--exit-done',
        }}
        timeout={{ appear: 0, enter: 300, exit: 200 }}
        in={!isConsentSet}
        mountOnEnter
        appear
        unmountOnExit
      >
        <section className="sticky bottom-0 items-center px-6 lg:px-16 pt-6 lg:pt-12 text-center lg:text-left bg-white rounded-t shadow-bottom-bar min-bottom-bar lg:rounded-none">
          <h2 className="mb-4 text-body-large font-bold">
            {t('cookies.title')}
          </h2>
          <div className="lg:flex lg:gap-12 pb-6 max-w-topbar">
            <div className="lg:w-1/2">
              <p className="mb-8 text-action lg:text-body">
                {t('cookies.text')}
              </p>
            </div>
            <div className="gap-4 justify-items-center items-center">
              <CookieConsentActions />
              {!isConsentSet && (
                <Link
                  locale={locale}
                  prefetch={false}
                  passHref
                  href={publicRuntimeConfig.COOKIE_PAGE_PATH}
                >
                  <a className="font-bold text-black underline">
                    {t('cookies.readMore')}
                  </a>
                </Link>
              )}
            </div>
          </div>
        </section>
      </CSSTransition>
    )
  )
}
