import '../styles/main.css'
import 'nprogress/nprogress.css'
import { appWithTranslation } from 'next-i18next'
import useHydratePage from '@/hooks/useHydratePage'
// import { useAtomDevtools } from 'jotai/devtools'
// import { pageAtom } from '@/src/store'
// import App from 'next/app'

function App({ Component, pageProps }) {
  useHydratePage(pageProps)

  // useAtomDevtools(pageAtom)

  return <Component {...pageProps} />
}

export default appWithTranslation(App)
