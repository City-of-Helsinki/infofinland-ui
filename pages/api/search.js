import { getSearchParamsFromQuery, getSearchClient } from '@/lib/elasticsearch'

export default async function handler(req, res) {
  const { size, q, from } = getSearchParamsFromQuery(req)

  let results = { q: '', results: {} }

  if (q) {
    results = await getSearchClient().search({ q, size, from })
  }

  res.status(200).json({
    q,
    size,
    from,
    results,
  })
}
