import { useEffect } from 'react'
import { i18n } from '@/next-i18next.config'

export default function useSetLocalization(locale) {
  const direction = i18n.rtlLocales.includes(locale) ? 'rtl' : 'ltr'
  // Set text direction
  useEffect(() => {
    document.querySelector('html').setAttribute('dir', direction)
  }, [direction])
}
