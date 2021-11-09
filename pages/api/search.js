import SEARCH_RESULTS from '@/MOCK_SEARCH'

export default function handler(req, res) {
  const { query } = req
  const { q } = query
  // Mocking empty results for page testing
  // Change test implementation when we have real search API
  const results = q === '_' ? [] : SEARCH_RESULTS
  res.status(200).json({
    q,
    results,
  })
}
