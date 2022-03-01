import HomeHero from '@/components/home/HomeHero'
import Layout from '@/components/layout/Layout'
import ThemeList from '@/components/home/ThemeList'
import CitySelector from '@/components/home/CitySelector'
import Block from '@/components/layout/Block'
import {
  getCommonApiContent,
  getLandingPageQueryParams,
  getThemeHeroImages,
  NOT_FOUND,
  getIdFromPath,
} from '@/lib/ssr-api'

import { getHeroFromNode } from '@/lib/ssr-helpers'

import { serverSideTranslations } from 'next-i18next/serverSideTranslations'
import getConfig from 'next/config'
import { getResource } from 'next-drupal'
import { NODE_TYPES } from '@/lib/DRUPAL_API_TYPES'
import ContentMapper from '@/components/article/ContentMapper'
import IngressBlock from '@/components/article/IngressBlock'

export async function getStaticProps(context) {
  const { serverRuntimeConfig } = getConfig()
  const id = await getIdFromPath({
    path: serverRuntimeConfig.DRUPAL_FRONT_PAGE,
    context,
  })

  if (!id) {
    return NOT_FOUND
  }
  const [node, common] = await Promise.all([
    getResource(NODE_TYPES.LANDING_PAGE, id, {
      locale: context.locale,
      params: getLandingPageQueryParams(),
    }),
    getCommonApiContent({ ...context, id }),
  ])

  if (!node) {
    return NOT_FOUND
  }

  const themeImages = await getThemeHeroImages({
    tree: common.menus.main.tree,
    context,
  })

  const themes = common.menus.main.tree.map(({ url, title, id }, i) => {
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
    revalidate: serverRuntimeConfig.REVALIDATE_TIME,
  }
}

const HomePage = ({ node, themes }) => {
  const hero = getHeroFromNode(node)
  const { field_description, field_content, title } = node

  return (
    <Layout
      title={title}
      className="ifu-landing"
      description={node.description || field_description}
    >
      <HomeHero title={node.title} src={hero?.src} />

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
