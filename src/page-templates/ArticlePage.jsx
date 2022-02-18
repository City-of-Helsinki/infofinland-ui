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

import { NODE_TYPES } from '@/lib/DRUPAL_API_TYPES'
import LocalInformationSelectCity from '@/components/cities/LocalInfoSelectCity'

const ArticlePage = ({ menu, citiesMenu, node, fiNode }) => {
  const { localePath, locale } = useRouterWithLocalizedPath()
  const {
    title,
    revision_timestamp,
    field_description,
    field_use_anchor_links,
    field_municipality_selection,
  } = node

  console.log({ node })

  const themes = useThemeList({
    tree: menu.tree,
    path: localePath,
  })
  // first page is landing page, skip it

  const breadcrumbs = useBreadCrumbs({
    items: !field_municipality_selection ? menu.items : citiesMenu.items,
    path: localePath,
  })

  let cityThemes = useThemeList({
    tree: citiesMenu.tree,
    path: localePath,
  })

  // (City) landingpage shows liftup cards from city menu
  // Assumes there is only one landing page available and that it is the cities page

  cityThemes = node.type === NODE_TYPES.LANDING_PAGE ? citiesTree : cityThemes
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

        {cityThemes?.length > 0 && (
          <Block hero>
            <ThemeList themes={cityThemes} />
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
