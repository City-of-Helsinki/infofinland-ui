import Head from 'next/head'
import HomeHero from '@/components/home/HomeHero'
import Layout from '@/components/layout/Layout'
import ThemeList from '@/components/home/ThemeList'
import CitySelector from '@/components/home/CitySelector'
import HomeAbout from '@/components/home/HomeAbout'
import Block from '@/components/article/Block'
import * as DrupalApi from '@/src/lib/drupal-api'

export async function getStaticProps(context) {
  const common = await DrupalApi.getCommonApiContent(context)
  return {
    props: {
      ...common,
    },
  }
}

const HomePage = ({ mainMenu, aboutMenu }) => (
  <Layout mainMenu={mainMenu} aboutMenu={aboutMenu}>
    <Head>
      <title>Article demo page</title>
      <link rel="icon" href="/favicon.ico" />
    </Head>
    <HomeHero
      title="Your source for living in Finland"
      image="/images/home.png"
    />
    {/* <div className="mx-6 lg:mx-12 xl:mx-24 2xl:mx-48 mb-16 4xl:max-w-6xl"> */}
    <Block>
      <p className="mb-8 text-body text-bodytext-color">
        The education system includes early childhood education, preschool
        education, comprehensive education, upper secondary education and higher
        education. Adult education is intended for adults and it includes a
        multitude of alternatives from comprehensive to higher education.
      </p>
    </Block>
    <Block>
      <ThemeList themes={mainMenu.tree} showImages />
    </Block>
    <CitySelector />
    <HomeAbout />
    {/* </div> */}
  </Layout>
)

export default HomePage
