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
  NOT_FOUND,
} from '@/lib/ssr-api'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'
import getConfig from 'next/config'
import { getResource } from 'next-drupal'
import { NODE_TYPES } from '@/lib/DRUPAL_API_TYPES'
import ContentMapper from '@/components/article/ContentMapper'

export async function getStaticProps(context) {
  const { serverRuntimeConfig } = getConfig()
  const { locale } = context
  const { data } = await resolvePath({
    path: serverRuntimeConfig.DRUPAL_LANDING_PAGE,
    context: { locale },
  }).catch((e) => {
    if (e?.response?.status === 404) {
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
  return {
    props: {
      ...common,
      node,
      ...(await serverSideTranslations(context.locale, ['common'])),
    },
    revalidate: serverRuntimeConfig.REVALIDATE_TIME,
  }
}

const HomePage = ({ menu, footerMenu, node }) => {
  const hero = getHeroFromNode(node)

  return (
    <Layout
      menu={menu}
      footerMenu={footerMenu}
      title={node.title}
      description={node.description}
    >
      <HomeHero
        title={node.title || 'DEMO:Your source for living in Finland'}
        image={hero?.url}
      />

      {node.field_description && (
        <Block>
          <p className="mb-8 text-body text-bodytext-color">
            {node.field_description}
          </p>
        </Block>
      )}

      <Block>
        <ThemeList themes={menu.tree} showImages />
      </Block>

      <CitySelector />

      {node.field_content?.length > 0 && (
        <ContentMapper content={node.field_content} />
      )}
    </Layout>
  )
}

export default HomePage
