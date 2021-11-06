import Head from 'next/head'
import Article from '../components/article/Article'
import Layout from '../components/layout/Layout'
import ThemeList from '../components/home/ThemeList'
import Block from '../components/article/Block'

const ThemePage = ({ title, ...articleProps }) => (
  <Layout>
    <Head>
      <title>{title} theme demo page</title>
      <link rel="icon" href="/favicon.ico" />
    </Head>
    <Article title={title} {...articleProps}>
      <Block>
        <p className="mb-8 text-body text-bodytext-color">
          The education system includes early childhood education, preschool
          education, comprehensive education, upper secondary education and
          higher education. Adult education is intended for adults and it
          includes a multitude of alternatives from comprehensive to higher
          education.
        </p>
      </Block>
    </Article>
    <Block hero>
      <ThemeList themes={[]} />
    </Block>
  </Layout>
)

export default ThemePage
