import { getServerSideSitemap } from 'next-sitemap'
// const siteUrl = process.env.SITE_URL
export const getServerSideProps = async (ctx) => {
  // TODO Fetch paths from Drupal api.

  const fields = [
    {
      loc: 'https://example.com', // Absolute url
      lastmod: new Date().toISOString(),
      // changefreq
      // priority
    },
    {
      loc: 'https://example.com/dynamic-path-2', // Absolute url
      lastmod: new Date().toISOString(),
      // changefreq
      // priority
    },
  ]
  return getServerSideSitemap(ctx, fields)
}
const Sitemap = () => {}
// Default export to prevent next.js errors
export default Sitemap
