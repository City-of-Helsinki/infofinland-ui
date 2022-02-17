import '../styles/main.css'
import 'nprogress/nprogress.css'
import { appWithTranslation } from 'next-i18next'
import useHydratePage from '@/hooks/useHydratePage'

// import App from 'next/app'

function App({ Component, pageProps }) {
  useHydratePage(pageProps)

  return <Component {...pageProps} />
}

export default appWithTranslation(App)
