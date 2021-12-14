import Head from 'next/head'
import Article from '../components/article/Article'
import Layout from '../components/layout/Layout'
import ThemeList from '../components/home/ThemeList'
import Block from '../components/layout/Block'
import useRouterWithLocalizedPath from '@/hooks/useRouterWithLocalizedPath'
import useBreadCrumbs from '@/hooks/useBreadCrumbs'
import useThemeList from '@/hooks/useThemeList'
import ContentMapper from '@/components/article/ContentMapper'

const ThemePage = ({ node, color, menu, footerMenu }) => {
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
  const { title, revision_timestamp, content, fiTitle, hero } = node

  return (
    <Layout menu={menu} footerMenu={footerMenu}>
      <Head>
        <title>{title}</title>
      </Head>
      <Article
        color={color}
        title={title}
        date={revision_timestamp}
        breadcrumbs={breadcrumbs}
        fiTitle={fiTitle}
        heroImage={hero?.url}
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
        <Block hero>{themes && <ThemeList themes={themes} />}</Block>

        {content && <ContentMapper content={content} />}
      </Article>
    </Layout>
  )
}
export default ThemePage
