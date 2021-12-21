import HomeHero from '@/components/home/HomeHero'
import Layout from '@/components/layout/Layout'
import ThemeList from '@/components/home/ThemeList'
import CitySelector from '@/components/home/CitySelector'
import HomeAbout from '@/components/home/HomeAbout'
import Block from '@/components/layout/Block'
import { getCommonApiContent, resolvePath } from '@/lib/ssr-api'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'
import getConfig from 'next/config'
import { getResource } from 'next-drupal'
import { DrupalJsonApiParams } from 'drupal-jsonapi-params'

import { NODE_TYPES, CONTENT_TYPES } from '@/lib/ssr-api'
import { publicRuntimeConfig } from '@/next.config'

export async function getStaticProps(context) {
  const { serverRuntimeConfig } = getConfig()
  const { data } = await resolvePath({
    path: serverRuntimeConfig.LANDING_PAGE_PATH,
    context: { locale: 'fi' },
  }).catch((e) => {
    console.error(e)
    return { data: null }
  })

  const node = await getResource(NODE_TYPES.LANDING_PAGE, data.entity.uuid, {
    locale: context.locale,
    params: new DrupalJsonApiParams()
      .addInclude([
        'field_content',
        'field_content.field_image.field_media_image',
        'field_hero.field_hero_image.field_media_image',
      ])
      .addFields(NODE_TYPES.LANDING_PAGE, [
        'id',
        'title',
        'revision_timestamp',
        'langcode',
        'field_content',
        'field_hero',
        'field_description',
        'field_has_hero',
        'field_metatags',
      ])
      .addFields(CONTENT_TYPES.MEDIA_IMAGE, ['field_media_image'])
      .addFields(CONTENT_TYPES.HERO, ['field_hero_title', 'field_hero_image'])
      .addFields(CONTENT_TYPES.FILE, ['uri', 'url'])
      .getQueryObject(),
  })
  const heroUrl = node.field_hero?.field_hero_image.field_media_image.uri.url

  const common = await getCommonApiContent(context)
  const hero = {
    url: `${publicRuntimeConfig.NEXT_PUBLIC_DRUPAL_BASE_URL}${heroUrl}`,
    title: node.field_hero?.field_hero_title,
  }
  if(!node) {
    return {notFound:true}
  }
  return {
    props: {
      ...common,
      node,
      hero,
      ...(await serverSideTranslations(context.locale, ['common'])),
    },
    revalidate: serverRuntimeConfig.REVALIDATE_TIME,
  }
}

const HomePage = ({ menu, footerMenu, node, hero }) => {
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
      {/* <div className="mx-6 lg:mx-12 xl:mx-24 2xl:mx-48 mb-16 4xl:max-w-6xl"> */}
      <Block>
        <p className="mb-8 text-body text-bodytext-color">
          The education system includes early childhood education, preschool
          education, comprehensive education, upper secondary education and
          higher education. Adult education is intended for adults and it
          includes a multitude of alternatives from comprehensive to higher
          education.
        </p>
      </Block>

      <Block>
        <ThemeList themes={menu.tree} showImages />
      </Block>
      <CitySelector />
      <HomeAbout />
      {/* </div> */}
    </Layout>
  )
}

export default HomePage
