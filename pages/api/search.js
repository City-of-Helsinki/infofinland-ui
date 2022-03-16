import * as Elastic from '@/lib/elasticsearch'
export default async function handler(req, res) {
  const { size, q, from } = Elastic.getSearchParamsFromQuery(req)
  let results = { q: '', results: {} }
  if (q) {
    results = await Elastic.getSearchClient()
      .search({ q, size, from })
      .catch((e) => {
        console.error(Elastic.ERROR, e.meta.body.error.root_cause)
        return { results: {}, error: e.meta.statusCode }
      })
  }

  res.status(200).json({
    q,
    size,
    from,
    results,
  })
}
