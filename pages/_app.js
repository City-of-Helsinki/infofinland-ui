import '../styles/main.css'
import 'react-loader-spinner/dist/loader/css/react-spinner-loader.css'
import 'nprogress/nprogress.css'
import { appWithTranslation } from 'next-i18next'

import App from 'next/app'
export default appWithTranslation(App)
// export default appWithTranslation(({ Component, pageProps }) => <Component {...pageProps} />)
