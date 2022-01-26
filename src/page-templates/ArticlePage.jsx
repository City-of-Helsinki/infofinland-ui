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
import AnchorLinksBlock from '@/components/article/AnchorLinksBlock'
import VideoBlock from '@/components/article/VideoBlock'

const ArticlePage = ({ menu, footerMenu, node, fiNode, municipalities }) => {
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
    <Layout
      menu={menu}
      footerMenu={footerMenu}
      node={node}
      municipalities={municipalities}
    >
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

        <LocalInformation readMoreUrl={'/test'} />
        <VideoBlock url={'https://www.youtube.com/watch?v=efkqpext2Ik'} />
        <VideoBlock
          url={
            'https://icareus-eu1-progressive.secure2.footprint.net/10154/31238760/285903.mp4/1.0.mp4'
          }
        />
      </Article>
    </Layout>
  )
}
export default ArticlePage
