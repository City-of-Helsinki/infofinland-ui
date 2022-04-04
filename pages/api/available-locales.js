import { i18n } from '@/next-i18next.config'
import { translatePath } from 'next-drupal'

export default async function handler(req, res) {
  // No posts allowed
  if (req.method !== 'GET') {
    res.status(400).end()
    return
  }
  const { query } = req
  const { path } = query

  let status = 200
  let response = []

  const nodes = await Promise.all(
    i18n.locales.map(async (locale) => {
      const localePath = `/${locale}${path}`
      const node = await translatePath(localePath)
      return { locale, node }
    })
  ).catch((e) => {
    console.error('Error while resolving locales for', path, e)
    throw e
  })

  if (nodes === null) {
    status = 404
  } else {
    response = nodes
      .map(({ locale, node }) => {
        if (!node || locale !== node.entity.langcode) {
          return null
        }

        return { locale: node.entity.langcode, id: node.entity.id, path }
      })
      .filter((l) => !!l)
  }

  res.status(status).json(response)
}
