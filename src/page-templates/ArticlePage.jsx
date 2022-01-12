import ThemeList from '@/components/home/ThemeList'
import Block from '@/components/layout/Block'
import Article from '@/components/article/Article'
import Layout from '@/components/layout/Layout'
import LocalInformation from '@/components/cities/LocalInformation'
import useBreadCrumbs from '@/hooks/useBreadCrumbs'
import useRouterWithLocalizedPath from '@/hooks/useRouterWithLocalizedPath'
import ContentMapper from '@/components/article/ContentMapper'
import useThemeList from '@/hooks/useThemeList'
import { getHeroFromNode } from '@/lib/ssr-api'
import IngressBlock from '@/components/article/IngressBlock'

const ArticlePage = ({ menu, footerMenu, node, color, fiNode }) => {
  console.log({ node })
  const { localePath, locale } = useRouterWithLocalizedPath()
  const breadcrumbs = useBreadCrumbs({
    items: menu.items,
    path: localePath,
  })

  const themes = useThemeList({
    tree: menu.tree,
    path: localePath,
  })

  const { title, revision_timestamp, field_has_hero, field_description } = node
  let hero = null
  if (field_has_hero) {
    hero = getHeroFromNode(node)
  }
  return (
    <Layout menu={menu} footerMenu={footerMenu} node={node}>
      <Article
        title={title}
        color={color}
        breadcrumbs={breadcrumbs}
        date={revision_timestamp}
        fiTitle={fiNode?.title}
        heroImage={hero?.url}
      >
        {themes?.length > 0 && (
          <Block hero>
            <ThemeList themes={themes} />
          </Block>
        )}

        {field_description && (
          <IngressBlock field_description={field_description} />
        )}
        {node.field_content?.length > 0 && (
          <ContentMapper content={node.field_content} locale={locale} />
        )}
        <LocalInformation readMoreUrl={'/test'} />
      </Article>
    </Layout>
  )
}
export default ArticlePage
