import { getSearchClient } from '@/lib/elasticsearch'
// import SEARCH_RESULTS from '@/MOCK_SEARCH'

export default function handler(req, res) {
  const { search: q } = req?.query
  // Mocking empty results for page testing
  // Change test implementation when we have real search API

  // const results = q === '_' ? [] : []

  const results = getSearchClient().search({ q })

  res.status(200).json({
    // search,
    results,
  })
}
