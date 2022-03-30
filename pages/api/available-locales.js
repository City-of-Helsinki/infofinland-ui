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

  const localeIds = await Promise.all(
    i18n.locales.map((locale) => translatePath(`/${locale}${path}`))
  ).catch((e) => {
    console.error('Error while resolving locales for', path, e)
    throw e
  })

  if (localeIds === null) {
    status = 404
  } else {
    response = localeIds
      .map((node, i) => {
        if (!node) {
          return
        }
        return { locale: i18n.locales[i], id: node.entity.id, path }
      })
      .filter((l) => !!l)
  }

  res.status(status).json(response)
}
