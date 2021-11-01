import { useEffect } from 'react'
import { useRouter } from 'next/router'
import useLanguageMessage from './useLanguageMessage'

export default function useSetLocalization() {
  const { showMessage, hideMessage, userLocale, locales } = useLanguageMessage()
  const { locale } = useRouter()
  const direction = process.env.rtlLocales.includes(locale) ? 'rtl' : 'ltr'

  // Show Language message if route's locale doe1s not match user agent locale
  useEffect(() => {
    if (userLocale !== locale && locales.includes(userLocale)) {
      showMessage()
    } else {
      hideMessage()
    }
    // jotai hook methods do not need to be passed to useEffect.
    // Doing so will cause an infinite render loop
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [locale])

  // Set text direction
  useEffect(() => {
    document.querySelector('html').setAttribute('dir', direction)
  }, [direction])
}
