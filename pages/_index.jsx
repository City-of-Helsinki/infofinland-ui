import HomeHero from '@/components/home/HomeHero'
import Layout from '@/components/layout/Layout'
import ThemeList from '@/components/home/ThemeList'
import CitySelector from '@/components/home/CitySelector'
import Block from '@/components/layout/Block'
import {
  getMenus,
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
import Columns from '@/components/article/Columns'
import Image from 'next/image'

export async function getStaticProps(context) {
  const { serverRuntimeConfig } = getConfig()

  const id = await getIdFromPath({
    path: serverRuntimeConfig.DRUPAL_FRONT_PAGE,
    context,
  })

  if (!id) {
    return NOT_FOUND
  }
  const [node, menus] = await Promise.all([
    getResource(NODE_TYPES.LANDING_PAGE, id, {
      locale: context.locale,
      params: getLandingPageQueryParams(),
    }),
    getMenus({ locale: context.locale }),
  ])

  if (!node) {
    return NOT_FOUND
  }

  const themeImages = await getThemeHeroImages({
    tree: menus.main.tree,
    context,
  })

  const themes = menus.main.tree.map(({ url, title, id }, i) => {
    const image = themeImages[i]
    return { url, title, id, image: image?.src || null }
  })

  return {
    props: {
      menus,
      themes,
      node,
      ...(await serverSideTranslations(context.locale, ['common'])),
    },
    revalidate: serverRuntimeConfig.REVALIDATE_TIME,
  }
}

const AboutImage = () => (
  <div className="flex justify-center items-center pt-8 mx-auto lg:mt-0">
    <Image
      src="/images/logo-verticalpng-2.png"
      alt="Infofinland.fi"
      width={155}
      height={125}
      layout="fixed"
    />
  </div>
)

const HomePage = ({ node, themes }) => {
  const hero = getHeroFromNode(node)
  const { field_description, field_content, title } = node
  const [aboutText, ...restOfContent] = field_content
  return (
    <Layout className="ifu-landing">
      <HomeHero title={title} src={hero?.src} />

      {field_description && (
        <IngressBlock field_description={field_description} />
      )}

      <Block>
        <ThemeList themes={themes} showImages />
      </Block>

      <CitySelector />

      {aboutText && (
        <Columns
          field_columns_left_column={aboutText}
          RightColumnComponent={AboutImage}
        />
      )}
      {restOfContent?.length > 0 && <ContentMapper content={restOfContent} />}
    </Layout>
  )
}

export default HomePage