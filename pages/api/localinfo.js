import { getResource } from 'next-drupal'
import { NODE_TYPES } from '@/lib/DRUPAL_API_TYPES'
import { getLocalInfoParams } from '@/lib/query-params'

export default async function handler(req, res) {
  const { query } = req
  const { id, name: city } = query

  let status = 200
  const node = await getResource(NODE_TYPES.PAGE, id, {
    params: getLocalInfoParams(),
  }).catch((e) => {
    if (e.message === 'Not Found') {
      return null
    }
    throw e
  })

  if (node === null) {
    status = 404
  }

  res.status(status).json({
    node,
    city,
  })
}
