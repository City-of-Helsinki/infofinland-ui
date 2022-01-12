import SEARCH_RESULTS from '@/MOCK_SEARCH'
// For lazy loading ssr-irrelevant assets
export default function assetProxy(req, res) {
  const { query } = req

  res.status(200).json({
    image: 'todo',
  })
}
