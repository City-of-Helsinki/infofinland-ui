import ThemeList from '@/components/home/ThemeList'
import Block from '@/components/layout/Block'
import Article from '@/components/article/Article'
import Layout from '@/components/layout/Layout'
import useBreadCrumbs from '@/hooks/useBreadCrumbs'
import useRouterWithLocalizedPath from '@/hooks/useRouterWithLocalizedPath'
import ContentMapper from '@/components/article/ContentMapper'
import useThemeList from '@/hooks/useThemeList'
import { getHeroFromNode } from '@/lib/ssr-api'
import IngressBlock from '@/components/article/IngressBlock'
import AnchorLinksBlock from '@/components/article/AnchorLinksBlock'
import useHydratePage from '@/hooks/useHydratePage'
// import Button from '@/components/Button'

const ArticlePage = ({ menu, footerMenu, node, fiNode, municipalities }) => {
  useHydratePage({ node, municipalities, footerMenu, menu })

  const { localePath, locale } = useRouterWithLocalizedPath()

  const breadcrumbs = useBreadCrumbs({
    items: menu.items,
    path: localePath,
  })

  const themes = useThemeList({
    tree: menu.tree,
    path: localePath,
  })

  const {
    title,
    revision_timestamp,
    field_description,
    field_use_anchor_links,
  } = node

  const hero = getHeroFromNode(node)

  return (
    <Layout>
      <Article
        title={title}
        breadcrumbs={breadcrumbs}
        date={revision_timestamp}
        fiTitle={fiNode?.title}
        color={hero.color}
        heroImage={hero.src}
      >
        {field_description && (
          <IngressBlock field_description={field_description} />
        )}

        <Block className="mb-16 text-center">
          <button className="p-2 w-full font-bold bg-green-white rounded border border-green-lighter">
            Valitse tämä kunta{' '}
          </button>
        </Block>

        {field_use_anchor_links && (
          <AnchorLinksBlock field_content={node.field_content} />
        )}

        {themes?.length > 0 && (
          <Block hero>
            <ThemeList themes={themes} />
          </Block>
        )}

        {node.field_content?.length > 0 && (
          <ContentMapper content={node.field_content} locale={locale} />
        )}

        {/* <LocalInformation readMoreUrl={'/test'} /> */}
      </Article>
    </Layout>
  )
}
export default ArticlePage
