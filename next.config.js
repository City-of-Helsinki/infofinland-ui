const { i18n } = require('./next-i18next.config')

module.exports = {
  i18n,
  reactStrictMode: true,
  poweredByHeader: false,
  publicRuntimeConfig:{
    NEXT_PUBLIC_DRUPAL_BASE_URL:process.env.NEXT_PUBLIC_DRUPAL_BASE_URL,
    // NEXT_IMAGE_DOMAIN:process.env.NEXT_IMAGE_DOMAIN


  },
  serverRuntimeConfig: {
    NEXT_PUBLIC_DRUPAL_BASE_URL:process.env.NEXT_PUBLIC_DRUPAL_BASE_URL,
    NEXT_IMAGE_DOMAIN:process.env.NEXT_IMAGE_DOMAIN,
    // Will only be available on the server side
    DOO:'baf',
    DRUPAL_FRONT_PAGE:process.env.DRUPAL_FRONT_PAGE,
    DRUPAL_SITE_ID:process.env.DRUPAL_SITE_ID,
    DRUPAL_CLIENT_ID:process.env.DRUPAL_CLIENT_ID,
    DRUPAL_PREVIEW_SECRET:process.env.DRUPAL_PREVIEW_SECRET,
    DRUPAL_CLIENT_SECRET:process.env.DRUPAL_CLIENT_SECRET,
  },
  env: {
    COOKIE_PAGE_PATH: '/about/cookie-settings',
    PRERENDER_LOCALES: ['fi', 'en', 'sv', 'ar', 'ru'],
    DRUPAL_MENUS: {
      MAIN: 'main',
      FOOTER: 'footer-about',
      ABOUT: 'about',
    },
    HERO_COLORS: ['red', 'green', 'orange', 'blue'],
    REVALIDATE_TIME: 60,
    FB_URL: 'https://www.facebook.com/infofinland.fi',
    INSTAGRAM_URL: 'https://www.instagram.com/infofinland.fi/',
    YOUTUBE_URL: 'https://www.youtube.com/c/infofinland',
    TWITTER_URL: 'https://twitter.com/InfoFinlandfi',
  },
  images: {
    // populate all envs here
    domains: ['nginx-infofinland-drupal-dev.agw.arodevtest.hel.fi'],
  },
  webpack: (config) => {
    config.module.rules.push({ test: /\.xml$/, loader: 'xml-loader' })
    return config
  },
}
