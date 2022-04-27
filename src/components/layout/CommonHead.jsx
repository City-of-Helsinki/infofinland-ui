import { getHeroFromNode } from '@/lib/ssr-helpers'
import Head from 'next/head'
import getConfig from 'next/config'
import useRouterWithLocalizedPath from '@/hooks/useRouterWithLocalizedPath'
export const FALLBACK_TITLE = 'infofinland.fi'

const CommonHead = ({ node }) => {
  const { title, field_description, id, field_meta } = node
  const { src = '' } = getHeroFromNode(node)
  const { SITE_HOST } = getConfig().publicRuntimeConfig
  const { localePath } = useRouterWithLocalizedPath()
  let url
  const description = field_meta?.description || field_description || ''
  const idKey = (token) => `${token}-${id}`
  try {
    url = new URL(localePath, SITE_HOST).toString()
  } catch (e) {
    console.warn('Error while making OpenGraph siteURL', {
      SITE_HOST,
      localePath,
    })
    console.warn(e)
    url = SITE_HOST
  }
const isZh =node.langcode === 'zh'
  return (<>
    <Head>
      <title key="title">{field_meta?.title || title || FALLBACK_TITLE}</title>
      <meta
        name="viewport"
        content="width=device-width, initial-scale=1"
        key={idKey('viewport')}
      />
      <meta charSet="utf-8" key="charset" />
      <meta
        name="description"
        content={description}
        key={idKey('description')}
      />
      <meta name="theme-color" content="#000000" key={idKey('theme')} />
      <meta name="og:type" content="article" key={idKey('ogtype')} />
      <meta name="og:title" content={title} key={idKey('ogtitle')} />
      <meta key={idKey('ogurl')} name="og:url" content={url} />
      <meta
        name="og:description"
        content={description}
        key={idKey('ogdescription')}
      />
      <meta name="og:image" content={src} key={idKey('ogimage')} />
      <meta name="theme-color" content="#ffffff" />
      {/* Do not set chinese font face and link reload unless page is chinese
      Chinese font is really big.
      */}

    {isZh &&   <link
      rel="preload"
      href="/fonts/NotoSans/subset-NotoSansSC-Regular.woff2"
      as="font"
      type="font/woff2"
      crossOrigin=""
    />}

    </Head>
    {/* Must be outside of <Head/> to work */}
    {isZh &&   <style global jsx>{`
      @font-face {
        font-family: 'Noto Sans Chinese';
        src:  url('/fonts/NotoSans/subset-NotoSansSC-Regular.woff2') format('woff2'),
              url('/fonts/NotoSans/subset-NotoSansSC-Regular.woff') format('woff');
        font-display: swap;
      }
    `}</style>}
    </>
  )
}

export default CommonHead
