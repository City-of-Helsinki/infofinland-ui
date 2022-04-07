import { getMunicipalities } from '@/lib/ssr-api'
import { CACHE_HEADERS_10M } from '@/cache-headers'
export default async function handler(req, res) {
  const { locale } = req?.query
  // No posts allowed
  if (req.method !== 'GET' || !locale) {
    res.status(400).end()
    return
  }

  let status = 200

  const municipalities = await getMunicipalities({ locale }).catch((e) => {
    console.error('Municipalities error', e)
    return []
  })

  res
    .setHeader(...CACHE_HEADERS_10M)
    .status(status)
    .json(municipalities)
}
