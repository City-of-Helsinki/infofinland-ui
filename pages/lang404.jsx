import { LanguageNotFound } from './404'
import * as DrupalApi from '@/src/lib/drupal-api'

export async function getStaticProps(context) {
  const common = await DrupalApi.getCommonApiContent(context)
  return {
    props: {
      ...common,
    },
  }
}

export default LanguageNotFound
