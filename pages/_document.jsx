/* eslint-disable @next/next/no-css-tags */
import Document, { Html, Head, Main, NextScript } from 'next/document'
import Favicons from '@/components/layout/Favicons'
import { rtlLocales } from '@/i18n'
class MyDocument extends Document {
  static async getStaticProps(ctx) {
    const initialProps = await Document.getInitialProps(ctx)
    const locale = ctx?.locale || 'fi'
    return { ...initialProps, locale }
  }

  render() {
    const direction = rtlLocales.includes(this.props.locale) ? 'rtl' : 'ltr'
    return (
      <Html dir={direction} lang={this.props.locale}>
        <Head>
          <Favicons />
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
