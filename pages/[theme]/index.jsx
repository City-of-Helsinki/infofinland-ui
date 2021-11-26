import ThemePage from '../../src/page-templates/ThemePage'
import heroImage from '../../public/images/article1-sm.png'
import { getCommonApiContent, getMainMenu } from '@/lib/ssr-api'
import { map } from 'lodash'

const body = `
<div>
<p>The education system includes early childhood education, preschool
education, comprehensive education, upper secondary education and higher
education. Adult education is intended for adults and <a href="/" class="class-from-content"title="some title" id="doodaa"><span>it</span> <span>includes</span></a> a
multitude of alternatives from comprehensive to higher education</p>
<ul>
<li>Adult education is intended</li>
<li>early childhood education</li>
<li>comprehensive education</li>
<li>upper secondary education </li>
</ul>
<p>The education system includes early childhood education, preschool
education, comprehensive education, upper secondary education and higher
education. Adult education is intended for adults and <a href="/" class="class-from-content"title="some title" id="doodaa"><span>it</span> <span>includes</span></a> a
multitude of alternatives from comprehensive to higher education</p></div>
`

export const PROPS = {
  heroImage,
  body,
  title: 'Health services in Finlande',
  color: 'green',
  date: '23.12.2015',
  category: 'Health and other things',
}

export async function getStaticPaths(context) {
  const { tree } = await getMainMenu(context)
  // Tree contains array of pages with subpages included inside.
  // Map first level to get all themes
  const themes = map(tree, ({ url }) => {
    //remove root slash and language code
    const [, , theme] = url.split('/')
    return {
      params: {
        theme,
      },
    }
  })

  const paths = ['fi', 'en']
    .map((locale) => themes.map((theme) => ({ ...theme, locale })))
    .flat()
  return {
    paths,
    fallback: true,
  }
}

export async function getStaticProps(context) {
  const common = await getCommonApiContent(context)
  return {
    props: {
      ...common,
      ...PROPS,
    },
    revalidate: process.env.REVALIDATE_TIME,
  }
}

export default ThemePage
