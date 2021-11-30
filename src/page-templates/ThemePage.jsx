import Head from 'next/head'
import Article from '../components/article/Article'
import Layout from '../components/layout/Layout'
import ThemeList from '../components/home/ThemeList'
import Block from '../components/layout/Block'
import useRouterWithLocalizedPath from '@/hooks/useRouterWithLocalizedPath'
import useBreadCrumbs from '@/hooks/useBreadCrumbs'
import useThemeList from '@/hooks/useThemeList'

const ThemePage = ({ title, mainMenu, footerMenu, ...articleProps }) => {
  const { localePath } = useRouterWithLocalizedPath()
  const breadcrumbs = useBreadCrumbs({
    items: mainMenu.items,
    path: localePath,
  })
  const themes = useThemeList({
    tree: mainMenu.tree,
    path: localePath,
  })

  return (
    <Layout mainMenu={mainMenu} footerMenu={footerMenu}>
      <Head>
        <title>{title} theme demo page</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Article title={title} {...articleProps} breadcrumbs={breadcrumbs}>
        <Block>
          <p className="mb-8 text-body text-bodytext-color">
            The education system includes early childhood education, preschool
            education, comprehensive education, upper secondary education and
            higher education. Adult education is intended for adults and it
            includes a multitude of alternatives from comprehensive to higher
            education.
          </p>
        </Block>
      </Article>
      <Block hero>{themes && <ThemeList themes={themes} />}</Block>
    </Layout>
  )
}
export default ThemePage
