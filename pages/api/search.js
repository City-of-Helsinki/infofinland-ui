export default function handler(req, res) {
  const { query: q } = req
  res.status(200).json({
    q,
    results: [
      { title: 'Hello result', url: 'http://www.example.com' },
      { title: 'Hello Two', url: 'http://www.example.com/hellotwo' },
      { title: 'Hello Two Two', url: 'http://www.example.com/hellotwo/two' },
    ],
  })
}
