import { LanguageNotFound } from './404'
import * as DrupalApi from '@/lib/ssr-api'

export async function getStaticProps(context) {
  const common = await DrupalApi.getCommonApiContent(context)
  return {
    props: {
      ...common,
    },
  }
}

export default LanguageNotFound
