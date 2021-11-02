import Head from 'next/head'
import HomeHero from '../src/components/home/HomeHero'
import Layout from '../src/components/layout/Layout'
// import { ARTICLE_MARGIN_CLASS } from '../components/theme/page/subpage/Article'
import ThemeList from '../src/components/home/ThemeList'
import CitySelector from '../src/components/home/CitySelector'
import HomeAbout from '../src/components/home/HomeAbout'
import Block from '../src/components/article/Block'
const HomePage = () => (
  <Layout>
    <Head>
      <title>Article demo page</title>
      <link rel="icon" href="/favicon.ico" />
    </Head>
    <HomeHero
      title="Your source for living in Finland
"
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
    <ThemeList themes={[]} showImages />
    <CitySelector />
    <HomeAbout />
    {/* </div> */}
  </Layout>
)

export default HomePage
