import '../styles/main.css'
import 'nprogress/nprogress.css'
import { appWithTranslation } from 'next-i18next'
import useHydratePage from '@/hooks/useHydratePage'
import { useAtomDevtools } from 'jotai/devtools'
import { pageAtom } from '@/src/store'
import Router from 'next/router'
import NProgress from 'nprogress'
import useAnalytics from '@/hooks/useAnalytics'

// import App from 'next/app'
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

  useAtomDevtools(pageAtom)

  useAnalytics()

  return <Component {...pageProps} />
}

export default appWithTranslation(App)
