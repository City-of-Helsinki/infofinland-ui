const { i18n } = require('./next-i18next.config')
const { withSentryConfig } = require('@sentry/nextjs')
const withBundleAnalyzer = require('@next/bundle-analyzer')({
  enabled: process.env.ANALYZE === 'true',
})

const env = {
  COOKIE_PAGE_PATH: '/cookie-settings',
  FEEDBACK_PAGE_PATH: '/feedback',
  SITEMAP_PAGE_PATH: '/sitemap',
  CITIES_PAGE_PATH: '/cities',
  SEARCH_PAGE_PATH: '/search',
  LANDING_PAGE_PATH: '/landingpage',
  PRERENDER_LOCALES: [
    //TODO read from ENV variables instead of hard coding.
    // i18n.locales
    'fi',
    'ru',
    'es',
    'et',
    'tr',
    'ar',
    'fa',
    'sv',
    'zh',
  ],
  DRUPAL_MENUS: {
    MAIN: 'main',
    FOOTER: 'footer-about',
    ABOUT: 'about',
    CITIES: 'cities',
    CITIES_LANDING: 'cities-landing',
  },

  REVALIDATE_TIME: 60, //seconds
  FB_URL: 'https://www.facebook.com/infofinland.fi',
  INSTAGRAM_URL: 'https://www.instagram.com/infofinland.fi/',
  YOUTUBE_URL: 'https://www.youtube.com/c/infofinland',
  TWITTER_URL: 'https://twitter.com/InfoFinlandfi',
}

const publicRuntimeConfig = {
  SENTRY_DSN_PUBLIC: process.env.SENTRY_DSN_PUBLIC,
  SENTRY_RELEASE: process.env.SENTRY_RELEASE,
  SENTRY_ENVIRONMENT: process.env.SENTRY_ENVIRONMENT,
  NEXT_PUBLIC_DRUPAL_BASE_URL: process.env.NEXT_PUBLIC_DRUPAL_BASE_URL,
  MATOMO_URL: process.env.MATOMO_URL,
  MATOMO_SITE_ID: process.env.MATOMO_SITE_ID,
  MATOMO_DOMAINS: process.env.MATOMO_DOMAINS,
  SITE_HOST: process.env.SITE_HOST || 'https://www.infofinland.fi',
  REACT_AND_SHARE_APIKEY_FI: process.env.REACT_AND_SHARE_APIKEY_FI || '',
  REACT_AND_SHARE_APIKEY_EN: process.env.REACT_AND_SHARE_APIKEY_EN || '',
  REACT_AND_SHARE_APIKEY_SV: process.env.REACT_AND_SHARE_APIKEY_SV || '',
  REACT_AND_SHARE_APIKEY_RU: process.env.REACT_AND_SHARE_APIKEY_RU || '',
  REACT_AND_SHARE_APIKEY_ET: process.env.REACT_AND_SHARE_APIKEY_ET || '',
  REACT_AND_SHARE_APIKEY_UK: process.env.REACT_AND_SHARE_APIKEY_UK || '',
  REACT_AND_SHARE_APIKEY_FR: process.env.REACT_AND_SHARE_APIKEY_FR || '',
  REACT_AND_SHARE_APIKEY_ES: process.env.REACT_AND_SHARE_APIKEY_ES || '',
  REACT_AND_SHARE_APIKEY_TR: process.env.REACT_AND_SHARE_APIKEY_TR || '',
  REACT_AND_SHARE_APIKEY_ZH: process.env.REACT_AND_SHARE_APIKEY_ZH || '',
  REACT_AND_SHARE_APIKEY_FA: process.env.REACT_AND_SHARE_APIKEY_FA || '',
  REACT_AND_SHARE_APIKEY_AR: process.env.REACT_AND_SHARE_APIKEY_AR || '',
  ...env,
}

const serverRuntimeConfig = {
  SENTRY_DSN: process.env.SENTRY_DSN,
  SENTRY_RELEASE: process.env.SENTRY_RELEASE,
  SENTRY_ENVIRONMENT: process.env.SENTRY_ENVIRONMENT,
  // Will only be available onprocess.env. the server side
  CACHE_REPOPULATE: process.env.CACHE_REPOPULATE || false,
  BUILD_ALL: process.env.BUILD_ALL || false,
  BUILD_PHASE: process.env.BUILD_PHASE || false,
  ELASTICSEARCH_URL: process.env.ELASTICSEARCH_URL,
  elasticsearch_password: process.env.elasticsearch_password,
  elasticsearch_certificate: process.env.elasticsearch_certificate,
  NEXT_IMAGE_DOMAIN: process.env.NEXT_IMAGE_DOMAIN,
  DRUPAL_FRONT_PAGE: process.env.DRUPAL_FRONT_PAGE,
  DRUPAL_SITE_ID: process.env.DRUPAL_SITE_ID,
  DRUPAL_CLIENT_ID: process.env.DRUPAL_CLIENT_ID,
  DRUPAL_PREVIEW_SECRET: process.env.DRUPAL_PREVIEW_SECRET,
  DRUPAL_CLIENT_SECRET: process.env.DRUPAL_CLIENT_SECRET,
  SEARCH_INDEX_PREFIX: process.env.SEARCH_INDEX_PREFIX,
  ...publicRuntimeConfig,
  ...env,
}
/**
 *
 * Export next.config.js values
 */

const config = {
  i18n,
  reactStrictMode: true,
  poweredByHeader: false,
  // Try this if weird caching issues still persist
  generateEtags: false,
  env,
  publicRuntimeConfig,
  serverRuntimeConfig,
  images: {
    // populate static common image domains envs here manually
    // or via ENV variables
    domains: [
      process.env.NEXT_IMAGE_DOMAIN,
      // TODO Allow multiple domains to be configured from azure.
      'infofinland-edit.hel.ninja',
    ],
  },
  webpack: (config) => {
    config.module.rules.push({ test: /\.xml$/, loader: 'xml-loader' })
    return config
  },
  async redirects() {
    return [
      {
        source: '/so',
        locale: false,
        destination: '/so/landingpage',
        permanent: true,
      },
      {
        source: '/so/search',
        locale: false,
        destination: '/search',
        permanent: true,
      },
    ]
  },
}

module.exports = withBundleAnalyzer(config)
module.exports = withSentryConfig(module.exports, {
  // For all available options, see:
  // https://github.com/getsentry/sentry-webpack-plugin#options
  org: 'city-of-helsinki',
  project: 'infofinland-ui',
  //sentryUrl: 'https://sentry.hel.fi/',

  // Only print logs for uploading source maps in CI
  silent: !process.env.CI,

  // For all available options, see:
  // https://docs.sentry.io/platforms/javascript/guides/nextjs/manual-setup/

  // Upload a larger set of source maps for prettier stack traces (increases build time)
  widenClientFileUpload: true,

  // Uncomment to route browser requests to Sentry through a Next.js rewrite to circumvent ad-blockers.
  // This can increase your server load as well as your hosting bill.
  // Note: Check that the configured route will not match with your Next.js middleware, otherwise reporting of client-
  // side errors will fail.
  // tunnelRoute: "/monitoring",

  // Hides source maps from generated client bundles
  hideSourceMaps: true,

  // Automatically tree-shake Sentry logger statements to reduce bundle size
  disableLogger: true,
})
