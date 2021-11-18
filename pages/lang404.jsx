import { LanguageNotFound } from './404'
import * as DrupalApi from '@/src/lib/drupal-api'

export async function getStaticProps(context) {
  console.log({context})
//   // const node = await getResourceFromContext("node--page", context)
//   // console.log(node)
//   // Fetch the main menu.
  const common = await DrupalApi.getCommonApiContent(context)
  return {
    props: {
      ...common,
    },
  }
}

export default LanguageNotFound
