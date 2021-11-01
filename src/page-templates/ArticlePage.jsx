import Head from 'next/head'
import Article from '../components/article/Article'
import Layout from '../components/layout/Layout'
import ParseHtml from '../components/ParseHtml'
import LocalInformation from '../components/cities/LocalInformation'
import Block from '../components/article/Block'
import ReadMoreBlock from '../components/article/ReadMoreBlock'

const ArticlePage = ({ title, body, ...articleProps }) => {
  return (
    <Layout>
      <Head>
        <title>{title}</title>
      </Head>
      <Article title={title} {...articleProps}>
        <Block className="my-8">
          <ParseHtml html={body} />
        </Block>
        <LocalInformation />

        <ReadMoreBlock />
      </Article>
    </Layout>
  )
}

export default ArticlePage
