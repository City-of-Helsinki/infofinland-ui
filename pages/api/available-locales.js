import { i18n } from '@/next-i18next.config'
import { getIdFromPath } from '@/lib/ssr-api'

export default async function handler(req, res) {
  const { query } = req
  const { path } = query

  let status = 200
  let response = []

  const localeIds = await Promise.all(
    i18n.locales.map((locale) => getIdFromPath({ path, context: { locale } }))
  ).catch((e) => {
    console.error('Error while resolving locales for', path, e)
    throw e
  })

  if (localeIds === null) {
    status = 404
  } else {
    response = localeIds
      .map((id, i) => {
        if (!id) {
          return
        }
        return { locale: i18n.locales[i], id, path }
      })
      .filter((l) => !!l)
  }

  res.status(status).json(response)
}
