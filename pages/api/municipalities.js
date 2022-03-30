import { getMunicipalities } from '@/lib/ssr-api'
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

  res.status(status).json(municipalities)
}
