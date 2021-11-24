import ThemePage from '../../src/page-templates/ThemePage'
import heroImage from '../../public/images/article1-sm.png'
import * as DrupalApi from '@/src/lib/drupal-api'
// import { getResourceFromContext, getResourceTypeFromContext,
//   getResourceByPath, getResource} from 'next-drupal'
import { locales } from '@/i18n'
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

export async function getStaticPaths() {
  const page = {
    params: {
      theme: 'moving-to-finland',
    },
  }

  const paths = locales.map((locale) => ({ ...page, locale }))

  return {
    paths,
    fallback: 'blocking',
  }
}

export async function getStaticProps(context) {
  const common = await DrupalApi.getCommonApiContent(context)
  return {
    props: {
      ...common,
      ...PROPS,
      revalidate: 60,
    },
  }
}

export default ThemePage
