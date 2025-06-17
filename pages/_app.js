import '../styles/main.css'
import 'nprogress/nprogress.css'
import { appWithTranslation } from 'next-i18next'
import useHydratePage from '@/hooks/useHydratePage'
import { pageIsLoadingAtom } from '@/src/store'
import Router from 'next/router'
import NProgress from 'nprogress'
import useAnalytics from '@/hooks/useAnalytics'
import { useSetAtom } from 'jotai'
import { useRouter } from 'next/router'
import { useEffect } from 'react'

/**
 * Subscribe NProgress loader bar to Router events
 *
 */
NProgress.configure({ showSpinner: false })
Router.events.on('routeChangeStart', () => NProgress.start())
Router.events.on('routeChangeComplete', () => NProgress.done())
Router.events.on('routeChangeError', () => NProgress.done())

function App({ Component, pageProps }) {
  useHydratePage(pageProps)
  useAnalytics()

  const router = useRouter()
  const setPageIsLoading = useSetAtom(pageIsLoadingAtom)
  const loadingOn = () => setPageIsLoading(true)
  const loadingOff = () => setPageIsLoading(false)

  useEffect(() => {
    router.events.on('routeChangeStart', loadingOn)
    router.events.on('routeChangeComplete', loadingOff)
    return () => {
      router.events.off('routeChangeStart', loadingOn)
      router.events.off('routeChangeComplete', loadingOff)
    }
  })

  const { key, ...restPageProps } = pageProps
  return (
    <Component key={key} {...restPageProps} />
  )
}

export default appWithTranslation(App)
