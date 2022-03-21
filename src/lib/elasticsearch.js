import getConfig from 'next/config'
import { Client } from '@elastic/elasticsearch'
import { HIGHLIGHT_CLASS } from '@/components/search/Result'
import { isString } from 'lodash'

const DEFAULT_SIZE = 30
const DEFAULT_FROM = 0
const INDEX_PREFIX = 'first_'

export const getIndexName = (locale) => `${INDEX_PREFIX}${locale}`
export const HIGHLIGHT_FRAGMENT_SIZE = 3000
export const HIGHLIGHT_NUM_OF_FRAGMENTS = 10
export const ERROR = 'Error: Elastic Search query failed. '

export const FIELDS = Object.freeze([
  'url',
  'title',
  'field_description',
  'field_text',
  'field_title',
])


export const HIGHLIGHTER = Object.freeze({
  type: 'plain',
  pre_tags: [`<em class="${HIGHLIGHT_CLASS}">`],
  post_tags: ['</em>'],
})

export const HIGHLIGHT_FIELDS = Object.freeze({
  field_description:HIGHLIGHTER,
  field_text: HIGHLIGHTER,
  title: HIGHLIGHTER,
})

export const HIGHLIGHT_RULES = Object.freeze({
  encoder: 'html',
  number_of_fragments: HIGHLIGHT_NUM_OF_FRAGMENTS,
  fragment_size: HIGHLIGHT_FRAGMENT_SIZE,
  fields: HIGHLIGHT_FIELDS
})


export const getIndexWarning = ({index,q})=> `WARNING: Index ${index} not found. Searching from all indeces with term "${q}"`


export const getSearchClient = () => {
  const config = getConfig().serverRuntimeConfig
  const {
    elasticsearch_password,
    ELASTICSEARCH_URL,
    elasticsearch_certificate,
  } = config

  if (!ELASTICSEARCH_URL) throw 'ERROR: ELASTICSEARCH_URL not set'

  if (!config.elasticsearch_password && !config.elasticsearch_password) {
    return new Client({ node: ELASTICSEARCH_URL })
  }

  return new Client({
    node: ELASTICSEARCH_URL,
    auth: {
      username: 'elastic',
      password: elasticsearch_password || 'changeme',
    },
    ssl: {
      ca: elasticsearch_certificate,
      rejectUnauthorized: false,
    },
  })
}

export function getSearchParamsFromQuery({ query, locale }) {
  const q = query?.search || ''
  const size = query?.size || DEFAULT_SIZE
  let languages = Array.isArray(query?.languages)
    ? query?.languages
    : isString(query?.languages)
    ? [query?.languages]
    : [locale]
  const index = languages.map(getIndexName)
  const page = Number(query?.page)

  let from = DEFAULT_FROM
  if (!isNaN(page)) {
    from = (page - 1) * size
    from = from < 0 ? DEFAULT_FROM : from
  }

  if (query?.from) {
    from = query.from
  }
  return { size, q, from, index, locale: locale || query?.locale }
}
