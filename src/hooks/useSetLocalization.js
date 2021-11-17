import { useEffect } from 'react'
import { useRouter } from 'next/router'
import { rtlLocales } from '@/i18n'

export default function useSetLocalization() {
  const { locale } = useRouter()
  const direction = rtlLocales.includes(locale) ? 'rtl' : 'ltr'
  // Set text direction
  useEffect(() => {
    document.querySelector('html').setAttribute('dir', direction)
  }, [direction])
}
