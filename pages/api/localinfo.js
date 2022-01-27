import { getResource } from 'next-drupal'
import { CONTENT_TYPES, NODE_TYPES } from '@/lib/DRUPAL_API_TYPES'
import { DrupalJsonApiParams } from 'drupal-jsonapi-params'

export default async function handler(req, res) {
  const { query } = req
  const { uuid, name: city } = query
  // Mocking empty results for page testing
  // Change test implementation when we have real search API
  let status = 200
  const node = await getResource(NODE_TYPES.PAGE, uuid, {
    params: new DrupalJsonApiParams()
      .addInclude(['field_content'])
      .addFields(CONTENT_TYPES.TEXT, ['field_text'])
      .addFields(NODE_TYPES.PAGE, ['field_content'])
      .getQueryObject(),
  }).catch((e) => {
    if (e.message === 'Not Found') {
      return null
    }
    throw e
  })

  // TODO error handling for API query?
  if (node === null) {
    status = 404
  }

  res.status(status).json({
    node,
    city,
  })
}
