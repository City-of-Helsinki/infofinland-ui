import Head from 'next/head'
import Article from '@/components/article/Article'
import Layout from '@/components/layout/Layout'
import LocalInformation from '@/components/cities/LocalInformation'
import useBreadCrumbs from '@/hooks/useBreadCrumbs'
import useRouterWithLocalizedPath from '@/hooks/useRouterWithLocalizedPath'
import ContentMapper from '@/components/article/ContentMapper'

const ArticlePage = ({ menu, footerMenu, node, color }) => {
  const { localePath } = useRouterWithLocalizedPath()
  const breadcrumbs = useBreadCrumbs({
    items: menu.items,
    path: localePath,
  })
  // console.log({ node })

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
        {content && <ContentMapper content={content} />}
        <p className="font-bold text-neon-pink">DEMO LOCAL INFO BLOCK</p>
        <LocalInformation readMoreUrl={'/test'} />
      </Article>
    </Layout>
  )
}

export default ArticlePage
