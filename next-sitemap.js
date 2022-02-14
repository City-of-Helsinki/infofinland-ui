const siteUrl = process.env.SITE_URL
const ARTICLE_SIDEMAP = `${siteUrl}/article-sitemap.xml`

module.exports = {
  siteUrl,
  generateRobotsTxt: true,
  exclude: ['/lang404', '/*/lang404', '/404', '/*/404', 'article-sitemap.xml'],
  robotsTxtOptions: {
    policies: [
      {
        userAgent: '*',
        disallow: '/',
      },
    ],
    // additionalSitemaps: [ARTICLE_SIDEMAP],
  },
  // changefreq: 'daily',
  // priority: 0.7,
  // sitemapSize: 5000,

  // alternateRefs: [
  //   {
  //     href: 'https://es.example.com',
  //     hreflang: 'es',
  //   },
  //   {
  //     href: 'https://fr.example.com',
  //     hreflang: 'fr',
  //   },
  // ],
  // // Default transformation function
  // transform: async (config, path) => {
  //   return {
  //     loc: path, // => this will be exported as http(s)://<config.siteUrl>/<path>
  //     changefreq: config.changefreq,
  //     priority: config.priority,
  //     lastmod: config.autoLastmod ? new Date().toISOString() : undefined,
  //     alternateRefs: config.alternateRefs ?? [],
  //   }
  // },
  // additionalPaths: async (config) => [
  //   await config.transform(config, '/additional-page'),
  // ],
  // robotsTxtOptions: {
  //   policies: [
  //     {
  //       userAgent: '*',
  //       allow: '/',
  //     },
  //     {
  //       userAgent: 'test-bot',
  //       allow: ['/path', '/path-2'],
  //     },
  //     {
  //       userAgent: 'black-listed-bot',
  //       disallow: ['/sub-path-1', '/path-2'],
  //     },
  //   ],
  //   additionalSitemaps: [
  //     'https://example.com/my-custom-sitemap-1.xml',
  //     'https://example.com/my-custom-sitemap-2.xml',
  //     'https://example.com/my-custom-sitemap-3.xml',
  //   ],
  // },
}
