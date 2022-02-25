import ThemeList from '@/components/home/ThemeList'
import Block from '@/components/layout/Block'
import Article from '@/components/article/Article'
import Layout from '@/components/layout/Layout'
import useBreadCrumbs from '@/hooks/useBreadCrumbs'
import useRouterWithLocalizedPath from '@/hooks/useRouterWithLocalizedPath'
import ContentMapper from '@/components/article/ContentMapper'
import useThemeList from '@/hooks/useThemeList'
import { getHeroFromNode } from '@/lib/ssr-helpers'
import IngressBlock from '@/components/article/IngressBlock'
import AnchorLinksBlock from '@/components/article/AnchorLinksBlock'
import LocalInformationSelectCity from '@/components/cities/LocalInfoSelectCity'
import { useAtomValue } from 'jotai/utils'
import { themeMenuAtom } from '../store'

const ArticlePage = ({ node, fiNode }) => {
  const { localePath, locale } = useRouterWithLocalizedPath()
  const {
    title,
    revision_timestamp,
    field_description,
    field_use_anchor_links,
    field_municipality_selection,
  } = node

  const themeMenu = useAtomValue(themeMenuAtom)
  const themes = useThemeList({
    tree: themeMenu.tree,
    path: localePath,
  })
  const breadcrumbs = useBreadCrumbs({
    items: themeMenu.items,
    path: localePath,
  })
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

        {field_municipality_selection && (
          <LocalInformationSelectCity
            city={field_municipality_selection.name}
          />
        )}

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
      </Article>
    </Layout>
  )
}
export default ArticlePage
