import { getMessages } from '@/lib/ssr-api'
export default async function handler(req, res) {
  const { id, locale } = req?.query
  // No posts allowed
  if (req.method !== 'GET' || !id || !locale) {
    res.status(400).end()
    return
  }
  let status = 200
  // let messages = []
  const messages = await getMessages({ locale, id }).catch((e) => {
    console.error('Messages error', e)
    return []
  })

  res.status(status).json(messages)
}
