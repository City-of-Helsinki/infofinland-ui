const { i18n } = require('./next-i18next.config')
const env = {
  COOKIE_PAGE_PATH: '/about/cookie-settings',
  PRERENDER_LOCALES: ['fi', 'en', 'sv', 'ar', 'ru'],
  DRUPAL_MENUS: {
    MAIN: 'main',
    FOOTER: 'footer-about',
    ABOUT: 'about',
  },
  HERO_COLORS: ['red', 'green', 'orange', 'blue'],
  REVALIDATE_TIME: 60, //seconds
  FB_URL: 'https://www.facebook.com/infofinland.fi',
  INSTAGRAM_URL: 'https://www.instagram.com/infofinland.fi/',
  YOUTUBE_URL: 'https://www.youtube.com/c/infofinland',
  TWITTER_URL: 'https://twitter.com/InfoFinlandfi',
}
module.exports = {
  i18n,
  reactStrictMode: true,
  poweredByHeader: false,
  env,
  publicRuntimeConfig: {
    NEXT_PUBLIC_DRUPAL_BASE_URL: process.env.NEXT_PUBLIC_DRUPAL_BASE_URL,
    NEXT_PUBLIC_TEST: process.env.TEST,
    ...env,
  },
  serverRuntimeConfig: {
    // Will only be available on the server side
    NEXT_PUBLIC_DRUPAL_BASE_URL: process.env.NEXT_PUBLIC_DRUPAL_BASE_URL,
    NEXT_IMAGE_DOMAIN: process.env.NEXT_IMAGE_DOMAIN,
    DRUPAL_FRONT_PAGE: process.env.DRUPAL_FRONT_PAGE,
    DRUPAL_SITE_ID: process.env.DRUPAL_SITE_ID,
    DRUPAL_CLIENT_ID: process.env.DRUPAL_CLIENT_ID,
    DRUPAL_PREVIEW_SECRET: process.env.DRUPAL_PREVIEW_SECRET,
    DRUPAL_CLIENT_SECRET: process.env.DRUPAL_CLIENT_SECRET,
    TEST: process.env.TEST,
    ...env,
  },
  images: {
    // populate all envs here
    domains: [
      //local Stonehenge instance
      'drupal-infofinland.docker.so',
      //dev
      'nginx-infofinland-drupal-dev.agw.arodevtest.hel.fi',
      //test is missing
      //staging is missing
      //production is missing
    ],
  },
  webpack: (config) => {
    config.module.rules.push({ test: /\.xml$/, loader: 'xml-loader' })
    return config
  },
}
