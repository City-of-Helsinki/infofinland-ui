import { DrupalClient } from 'next-drupal'
import getConfig from 'next/config'
export const getDrupalClient = (withAuth) => {
  const {
    NEXT_PUBLIC_DRUPAL_BASE_URL,
    DRUPAL_PREVIEW_SECRET,
    DRUPAL_CLIENT_ID,
    DRUPAL_CLIENT_SECRET,
    REVALIDATE_TIME,
    DEBUG,
  } = getConfig().serverRuntimeConfig
  return new DrupalClient(NEXT_PUBLIC_DRUPAL_BASE_URL, {
    auth: {
      clientId: DRUPAL_CLIENT_ID,
      clientSecret: DRUPAL_CLIENT_SECRET,
    },
    //cache: redisCache,
    previewSecret: DRUPAL_PREVIEW_SECRET,
    // Make preview work in development environment.
    forceIframeSameSiteCookie: process.env.NODE_ENV === 'development',
    ...(withAuth && { withAuth: true }),
    next: { revalidate: REVALIDATE_TIME },
    debug: DEBUG
  })
}

export default getDrupalClient
