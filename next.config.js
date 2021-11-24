const nextTranslate = require('next-translate')

module.exports = nextTranslate(
  /**
   * these are just regular next.config.js settings that
   * are passed throught the nextTranslate config wrapper
   * See i18n.js for localization configs
   * */
  {
    reactStrictMode: true,
    poweredByHeader: false,
    env: {
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
)
