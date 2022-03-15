import getConfig from 'next/config'
import { Client } from '@elastic/elasticsearch'
export const DEFAULT_SIZE = 10
export const DEFAULT_FROM = 0
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
