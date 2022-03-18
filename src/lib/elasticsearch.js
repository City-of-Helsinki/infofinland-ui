import getConfig from 'next/config'
import { Client } from '@elastic/elasticsearch'
const DEFAULT_SIZE = 30
const DEFAULT_FROM = 0
import { HIGHLIGHT_CLASS } from '@/components/search/Result'
export const HIGHLIGHT_FRAGMENT_SIZE = 300
export const HIGHLIGHT_NUM_OF_FRAGMENTS = 5
export const ERROR = 'Error in Elastic Search query:'
export const FIELDS = Object.freeze([
  'url',
  'title',
  'field_description',
  'field_text',
  'field_title',
])
export const HIGHLIGHTER = Object.freeze({
  pre_tags: [`<em class="${HIGHLIGHT_CLASS}">`],
  post_tags: ['</em>'],
})
export const getSearchClient = () => {
  const config = getConfig().serverRuntimeConfig
  // process.env.elasticsearch_certificate
  // process.env.elasticsearch_certificate
  const {
    elasticsearch_password,
    ELASTICSEARCH_URL,
    elasticsearch_certificate,
  } = config

  if (!ELASTICSEARCH_URL) throw 'Set ELASTICSEARCH_URL'

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

export function getSearchParamsFromQuery({ query }) {
  const q = query?.search || ''
  const size = query?.size || DEFAULT_SIZE
  let from = DEFAULT_FROM
  const page = Number(query?.page)
  if (!isNaN(page)) {
    from = (page - 1) * size
    from = from < 0 ? DEFAULT_FROM : from
  }

  if (query?.from) {
    from = query.from
  }
  return { size, q, from }
}
