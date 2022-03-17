import * as Elastic from '@/lib/elasticsearch'
export default async function handler(req, res) {
  const size = 10
  const { q, from } = Elastic.getSearchParamsFromQuery(req)
  let search = { results: {}, error: 'no search params given' }

  if (q) {
    search = await Elastic.getSearchClient()
      .search({ q, size, from })
      .catch((e) => {
        console.error(
          Elastic.ERROR,
          e?.meta?.body?.error?.root_cause || e?.name || e
        )
        throw e
      })
  }

  res.status(200).json({
    q,
    size,
    from,
    ...search,
  })
}
