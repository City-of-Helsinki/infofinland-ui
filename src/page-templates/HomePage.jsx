import HomeHero from '@/components/home/HomeHero'
import Layout from '@/components/layout/Layout'
import ThemeList from '@/components/home/ThemeList'
import CitySelector from '@/components/home/CitySelector'
import Block from '@/components/layout/Block'

import { getHeroFromNode } from '@/lib/ssr-helpers'
import ContentMapper from '@/components/article/ContentMapper'
import IngressBlock from '@/components/article/IngressBlock'
import Columns from '@/components/article/Columns'
import Image from 'next/image'

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
