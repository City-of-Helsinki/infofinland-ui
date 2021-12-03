const { i18n } = require('./next-i18next.config')

module.exports = {
  i18n,
  reactStrictMode: true,
  poweredByHeader: false,
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
  webpack: (config) => {
    config.module.rules.push({ test: /\.xml$/, loader: 'xml-loader' })
    return config
  },
}
