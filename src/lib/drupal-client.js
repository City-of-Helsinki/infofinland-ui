import { NextDrupalPages } from 'next-drupal'
import getConfig from 'next/config'

export const getDrupalClient = (withAuth) => {
  const {
    NEXT_PUBLIC_DRUPAL_BASE_URL,
    DRUPAL_PREVIEW_SECRET,
    DRUPAL_CLIENT_ID,
    DRUPAL_CLIENT_SECRET,
    REVALIDATE_TIME,
  } = getConfig().serverRuntimeConfig
  return new NextDrupalPages(NEXT_PUBLIC_DRUPAL_BASE_URL, {
    auth: {
      clientId: DRUPAL_CLIENT_ID,
      clientSecret: DRUPAL_CLIENT_SECRET,
    },
    //cache: redisCache,
    previewSecret: DRUPAL_PREVIEW_SECRET,
    useDefaultEndpoints: true,
    ...(withAuth && { withAuth: true }),
    next: { revalidate: REVALIDATE_TIME },
  })
}

export default getDrupalClient
