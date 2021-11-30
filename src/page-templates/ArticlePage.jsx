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
  title,
  mainMenu,
  footerMenu,
  content,
  ...articleProps
}) => {
  const { localePath } = useRouterWithLocalizedPath()
  const breadcrumbs = useBreadCrumbs({
    items: mainMenu.items,
    path: localePath,
  })

  return (
    <Layout mainMenu={mainMenu} footerMenu={footerMenu}>
      <Head>
        <title>{title}</title>
      </Head>
      <Article title={title} breadcrumbs={breadcrumbs} {...articleProps}>
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
