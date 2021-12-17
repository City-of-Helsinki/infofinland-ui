import Head from 'next/head'
import ThemeList from '@/components/home/ThemeList'
import Block from '@/components/layout/Block'
import Article from '@/components/article/Article'
import Layout from '@/components/layout/Layout'
import LocalInformation from '@/components/cities/LocalInformation'
import useBreadCrumbs from '@/hooks/useBreadCrumbs'
import useRouterWithLocalizedPath from '@/hooks/useRouterWithLocalizedPath'
import ContentMapper from '@/components/article/ContentMapper'
import useThemeList from '@/hooks/useThemeList'
import getConfig from 'next/config'
const ArticlePage = ({ menu, footerMenu, node, color }) => {
  const { localePath } = useRouterWithLocalizedPath()
  const breadcrumbs = useBreadCrumbs({
    items: menu.items,
    path: localePath,
  })

  const themes = useThemeList({
    tree: menu.tree,
    path: localePath,
  })
  // console.log({ node })
  const { serverRuntimeConfig, publicRuntimeConfig } = getConfig()
  console.log('env.TEST PAGE', {
    ssr: serverRuntimeConfig.TEST,
    public: publicRuntimeConfig.NEXT_PUBLIC_TEST,
    direct: process.env.TEST,
  })
  const { title, revision_timestamp, content, fiTitle, hero } = node
  return (
    <Layout menu={menu} footerMenu={footerMenu} node={node}>
      <Head>
        <title>{title}</title>
      </Head>
      <Article
        title={title}
        color={color}
        breadcrumbs={breadcrumbs}
        date={revision_timestamp}
        fiTitle={fiTitle}
        heroImage={hero?.url}
      >
        {themes?.length > 0 && (
          <Block hero>
            <ThemeList themes={themes} />
          </Block>
        )}

        {content && <ContentMapper content={content} />}
        <p className="font-bold text-neon-pink">DEMO LOCAL INFO BLOCK</p>
        <LocalInformation readMoreUrl={'/test'} />
      </Article>
    </Layout>
  )
}

export default ArticlePage
