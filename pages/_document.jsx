/* eslint-disable @next/next/no-css-tags */
import Document, { Html, Head, Main, NextScript } from 'next/document'
import { i18n } from '@/next-i18next.config'
class MyDocument extends Document {
  static async getStaticProps(ctx) {
    const initialProps = await Document.getInitialProps(ctx)
    const locale = ctx?.locale || 'fi'
    return { ...initialProps, locale }
  }

  render() {
    const direction = i18n.rtlLocales.includes(this.props.locale)
      ? 'rtl'
      : 'ltr'
    return (
      <Html dir={direction} lang={this.props.locale}>
        <Head />
        <body>
          <Main />
          <NextScript />
        </body>
      </Html>
    )
  }
}

export default MyDocument
