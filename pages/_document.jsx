/* eslint-disable @next/next/no-css-tags */
import Document, { Html, Head, Main, NextScript } from 'next/document'
import { i18nCustom } from '@/next-i18next.config'

class MyDocument extends Document {
  static async getStaticProps(ctx) {
    const initialProps = await Document.getInitialProps(ctx)
    const locale = ctx?.locale || 'fi'
    return { ...initialProps, locale }
  }

  render() {
    const { locale } = this.props
    const direction = i18nCustom.rtlLocales.includes(locale) ? 'rtl' : 'ltr'
    return (
      <Html dir={direction} lang={locale}>
        <Head>
          {/* Always preload these fonts.
           Chinese is set and loaded separately for chinese content only. See CommonHead */}
          <link
            rel="preload"
            href="/fonts/NotoSans/subset-NotoSans.woff2"
            as="font"
            type="font/woff2"
            crossOrigin=""
          />
          <link
            rel="preload"
            href="/fonts/NotoSans/subset-NotoSans-Bold.woff2"
            as="font"
            type="font/woff2"
            crossOrigin=""
          />

          <link
            rel="preload"
            href="/fonts/NotoSans/subset-NotoSansArabic-Regular.woff2"
            as="font"
            type="font/woff2"
            crossOrigin=""
          />
        </Head>
        <body>
          <Main />
          <NextScript />
        </body>
      </Html>
    )
  }
}

export default MyDocument
