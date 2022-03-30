import { getMessages } from '@/lib/ssr-api'
export default async function handler(req, res) {
  const { id, locale } = req?.query
  let messages = []
  // No posts allowed, no missing params-errors revealed.
  if (req.method !== 'GET' || !locale) {
    res.status(400).json(messages)
    return
  }
  let status = 200

  messages = await getMessages({ locale, id }).catch((e) => {
    console.error('Messages error', e)
    return []
  })

  res.status(status).json(messages)
}
