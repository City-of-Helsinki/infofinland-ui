export default async function handler(
  request,
  response
) {
  let slug = request.query.slug
  const secret = request.query.secret

  // Validate secret.
  if (secret !== process.env.DRUPAL_PREVIEW_SECRET) {
    return response.status(401).json({ message: "Invalid secret." })
  }

  // Validate slug.
  if (!slug) {
    return response.status(400).json({ message: "Invalid slug." })
  }

  try {
    await response.revalidate(slug)

    return response.json({})
  } catch (error) {
    return response.status(404).json({
      message: error.message,
    })
  }
}
