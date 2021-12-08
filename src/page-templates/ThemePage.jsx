import Head from 'next/head'
import Article from '../components/article/Article'
import Layout from '../components/layout/Layout'
import ThemeList from '../components/home/ThemeList'
import Block from '../components/layout/Block'
import useRouterWithLocalizedPath from '@/hooks/useRouterWithLocalizedPath'
import useBreadCrumbs from '@/hooks/useBreadCrumbs'
import useThemeList from '@/hooks/useThemeList'
import cls from 'classnames'
import ParseHtml from '@/components/ParseHtml'
const ThemePage = ({ node, content, color, menu, footerMenu }) => {
  const { localePath } = useRouterWithLocalizedPath()
  const breadcrumbs = useBreadCrumbs({
    items: menu.items,
    path: localePath,
  })
  const themes = useThemeList({
    tree: menu.tree,
    path: localePath,
  })
  const { title, revision_timestamp } = node
  return (
    <Layout menu={menu} footerMenu={footerMenu}>
      <Head>
        <title>{title} theme demo page</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Article
        color={color}
        title={title}
        date={revision_timestamp}
        breadcrumbs={breadcrumbs}
      >
        <Block>
          <p className="mb-8 text-body text-bodytext-color">
            <span className="text-neon-pink">DEMO INGRESS PLACEHOLDER: </span>
            The education system includes early childhood education, preschool
            education, comprehensive education, upper secondary education and
            higher education. Adult education is intended for adults and it
            includes a multitude of alternatives from comprehensive to higher
            education.
          </p>
        </Block>
      </Article>
      <Block hero>{themes && <ThemeList themes={themes} />}</Block>
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
    </Layout>
  )
}
export default ThemePage
