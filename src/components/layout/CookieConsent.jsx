import Button from '@/components/Button'
import { useTranslation } from 'next-i18next'
import Link from 'next/link'
import { isCookieConsentSet, cookieConsent } from '@/src/store'
import { useAtomValue, useUpdateAtom } from 'jotai/utils'
import { useRouter } from 'next/router'

export function CookieConsentActions() {
  const { t } = useTranslation('common')
  const isConsentSet = useAtomValue(isCookieConsentSet)
  const setConsent = useUpdateAtom(cookieConsent)
  const allow = () => setConsent(true)
  const deny = () => setConsent(false)
  if (isConsentSet) {
    return null
  }
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
  const { t } = useTranslation('common')
  const isConsentSet = useAtomValue(isCookieConsentSet)
  const isAboutPage =
    useRouter().asPath.match(new RegExp(`^${process.env.COOKIE_PAGE_PATH}`)) !==
    null

  return (
    !isConsentSet &&
    !isAboutPage && (
      <section className="sticky bottom-0 items-center px-6 lg:px-16 pt-6 lg:pt-12 text-center lg:text-left bg-white rounded-t shadow-bottom-bar min-bottom-bar lg:rounded-none">
        <h2 className="mb-4 text-body-large font-bold">{t('cookies.title')}</h2>
        <div className="lg:flex lg:gap-12 pb-6 max-w-topbar">
          <div className="lg:w-1/2">
            <p className="mb-8 text-action lg:text-body">{t('cookies.text')}</p>
          </div>
          <div className="gap-4 justify-items-center items-center">
            <CookieConsentActions />
            <Link passHref href={process.env.COOKIE_PAGE_PATH}>
              <a className="font-bold text-black underline">
                {t('cookies.readMore')}
              </a>
            </Link>
          </div>
        </div>
      </section>
    )
  )
}
