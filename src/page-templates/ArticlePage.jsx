import Head from 'next/head'
import Article from '@/components/article/Article'
import Layout from '@/components/layout/Layout'
import ParseHtml from '../components/ParseHtml'
import LocalInformation from '@/components/cities/LocalInformation'
import Block from '@/components/layout/Block'
import ReadMoreBlock from '@/components/article/ReadMoreBlock'
import useBreadCrumbs from '@/hooks/useBreadCrumbs'
import useRouterWithLocalizedPath from '@/hooks/useRouterWithLocalizedPath'
import cls from 'classnames'
const ArticlePage = ({
  mainMenu,
  footerMenu,
  content,
  node,
  color,
  fiNode,
}) => {
  const { localePath } = useRouterWithLocalizedPath()
  const breadcrumbs = useBreadCrumbs({
    items: mainMenu.items,
    path: localePath,
  })
  const { title, revision_timestamp } = node
  return (
    <Layout mainMenu={mainMenu} footerMenu={footerMenu}>
      <Head>
        <title>{title}</title>
      </Head>
      <Article
        title={title}
        color={color}
        breadcrumbs={breadcrumbs}
        date={revision_timestamp}
        fiTitle={fiNode.title}
      >
        {content
          .filter(({ type }) => type === 'paragraph--text')
          .map(({ field_text: { format, processed } }, i) => (
            <Block
              key={[format, i].join('-')}
              className={cls('my-8 ifu-article__bodyblock', format)}
            >
              <ParseHtml html={processed} />
            </Block>
          ))}
        {/* <Block className="my-8 ifu-article__bodyblock">

        </Block> */}
        <ReadMoreBlock />
        <LocalInformation readMoreUrl={'/test'} />
        <ReadMoreBlock />
      </Article>
    </Layout>
  )
}

export default ArticlePage
