import '../styles/main.css'
import 'nprogress/nprogress.css'
import { appWithTranslation } from 'next-i18next'
import useHydratePage from '@/hooks/useHydratePage'
import { useAtomDevtools } from 'jotai-devtools'
import { pageAtom, pageIsLoadingAtom } from '@/src/store'
import Router from 'next/router'
import NProgress from 'nprogress'
import useAnalytics from '@/hooks/useAnalytics'
import { useUpdateAtom } from 'jotai/utils'
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
  // Check if window is defined before using useAtomDevtools
  if (typeof window !== 'undefined') {
    // only works if process.env.NODE_ENV !== 'production'
    useAtomDevtools(pageAtom, 'ssr props');
  }

  useHydratePage(pageProps)

  useAnalytics()

  const router = useRouter()
  const setPageIsLoading = useUpdateAtom(pageIsLoadingAtom)
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

  return <Component {...pageProps} />
}

export default appWithTranslation(App)
