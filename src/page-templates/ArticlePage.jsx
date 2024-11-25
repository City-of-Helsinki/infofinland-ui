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
import { isRootPage } from '@/lib/menu-utils'
import getConfig from 'next/config'
import CommonHead from '@/components/layout/CommonHead'
import Askem from '@/components/Askem'

const ArticlePage = ({ node, themeMenu, menus }) => {
  const { CITIES_PAGE_PATH } = getConfig().publicRuntimeConfig
  const { localePath, locale, asPath } = useRouterWithLocalizedPath()
  const {
    title,
    lastUpdated,
    field_description,
    field_use_anchor_links,
    field_municipality_selection,
    field_finnish_title,
  } = node

  const themes = useThemeList({
    tree: themeMenu.tree,
    path: localePath,
  })

  const breadcrumbs = useBreadCrumbs({
    //Cringe
    items:
      asPath === CITIES_PAGE_PATH
        ? menus['cities-landing'].items
        : themeMenu.items,
    path: localePath,
  })

  const hero = getHeroFromNode(node)
  //Cringe....
  const showThemes =
    asPath === CITIES_PAGE_PATH ||
    isRootPage({ tree: themeMenu.tree, path: localePath })

  return (
    <>
      <CommonHead key={`head-article-${node?.id}`} node={node} />
      <Layout menus={menus}>
        <Article
          title={title}
          breadcrumbs={breadcrumbs}
          date={lastUpdated}
          fiTitle={field_finnish_title}
          color={hero.color}
          heroImage={hero.src}
        >
          {field_description && (
            <IngressBlock field_description={field_description} />
          )}

          {field_municipality_selection && (
            <LocalInformationSelectCity {...field_municipality_selection} />
          )}

          {field_use_anchor_links && (
            <AnchorLinksBlock field_content={node.field_content} />
          )}

          {showThemes && themes?.length > 0 && (
            <Block hero>
              <ThemeList themes={themes} />
            </Block>
          )}

          {node.field_content?.length > 0 && (
            <ContentMapper content={node.field_content} locale={locale} />
          )}
        </Article>
        <Askem locale={locale} title={title} />
      </Layout>
    </>
  )
}
export default ArticlePage
