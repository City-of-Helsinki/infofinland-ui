import HomeHero from '@/components/home/HomeHero'
import Layout from '@/components/layout/Layout'
import ThemeList from '@/components/home/ThemeList'
import CitySelector from '@/components/home/CitySelector'
import Block from '@/components/layout/Block'
import {
  getCommonApiContent,
  getHeroFromNode,
  resolvePath,
  getLandingPageQueryParams,
  getThemeHeroImages,
  NOT_FOUND,
} from '@/lib/ssr-api'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'
import getConfig from 'next/config'
import { getResource } from 'next-drupal'
import { NODE_TYPES } from '@/lib/DRUPAL_API_TYPES'
import ContentMapper from '@/components/article/ContentMapper'
import IngressBlock from '@/components/article/IngressBlock'

export async function getStaticProps(context) {
  const { serverRuntimeConfig } = getConfig()
  const { locale } = context
  const { data } = await resolvePath({
    path: serverRuntimeConfig.DRUPAL_FRONT_PAGE,
    context: { locale },
  }).catch((e) => {
    if (e?.response?.status === 404) {
      console.error(
        `Landing page error for /${locale}/:`,
        // Data can be a string or object apparently
        e.response?.data?.message || e.response?.data,
        e.response?.status
      )
      return { data: null }
    }
    console.error(e)
    throw new Error('Unable to resolve landing page')
  })
  if (!data) {
    return NOT_FOUND
  }

  const [node, common] = await Promise.all([
    getResource(NODE_TYPES.LANDING_PAGE, data.entity.uuid, {
      locale: context.locale,
      params: getLandingPageQueryParams(),
    }),
    getCommonApiContent(context),
  ])

  if (!node) {
    return NOT_FOUND
  }

  const themeImages = await getThemeHeroImages({
    tree: common.menu.tree,
    context,
  })

  const themes = common.menu.tree.map(({ url, title, id }, i) => {
    const image = themeImages[i]
    return { url, title, id, image: image?.src || null }
  })

  return {
    props: {
      ...common,
      themes,
      node,
      ...(await serverSideTranslations(context.locale, ['common'])),
    },
    // revalidate: serverRuntimeConfig.REVALIDATE_TIME,
    revalidate: 10,
  }
}

const HomePage = ({ menu, footerMenu, node, themes, municipalities }) => {
  const hero = getHeroFromNode(node)
  const { field_description, field_content, title } = node

  return (
    <Layout
      node={node}
      menu={menu}
      municipalities={municipalities}
      footerMenu={footerMenu}
      title={title}
      className="ifu-landing"
      description={node.description || field_description}
    >
      <HomeHero
        title={node.title || 'DEMO:Your source for living in Finland'}
        src={hero?.src}
      />

      {field_description && (
        <IngressBlock field_description={field_description} />
      )}

      <Block>
        <ThemeList themes={themes} showImages />
      </Block>

      <CitySelector />

      {field_content?.length > 0 && <ContentMapper content={field_content} />}
    </Layout>
  )
}

export default HomePage
