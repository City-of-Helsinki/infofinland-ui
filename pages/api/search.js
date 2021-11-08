import SEARCH_RESULTS from '@/MOCK_SEARCH'

export default function handler(req, res) {
  const { query: q } = req
  res.status(200).json({
    q,
    results: SEARCH_RESULTS,
  })
}
