import logger from '@/logger'

export default async function handler(request, response) {
  let slug = request.query.path
  const secret = request.query.secret

  // Validate secret.
  if (secret !== process.env.DRUPAL_PREVIEW_SECRET) {
    logger.warn('Invalid secret.', { status: 401 })
    return response.status(401).json({ message: 'Invalid secret.' })
  }

  // Validate slug.
  if (!slug) {
    logger.warn('Invalid slug.', { slug, status: 400 })
    return response.status(400).json({ message: 'Invalid slug.' })
  }

  try {
    await response.revalidate(slug)
    logger.info(`${slug} revalidated successfully`, { slug })
    return response.json({})
  } catch (error) {
    logger.warn('Page not found.', { slug, status: 404 })
    return response.status(404).json({
      message: error.message,
    })
  }
}
