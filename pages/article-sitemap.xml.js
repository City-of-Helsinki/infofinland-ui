import { NODE_TYPES } from '@/lib/DRUPAL_API_TYPES'
import { getPathsFromContext } from 'next-drupal'
import { getServerSideSitemap } from 'next-sitemap'
import absoluteUrl from 'next-absolute-url'

export const getServerSideProps = async (ctx) => {
  const siteurl = absoluteUrl(ctx.req)
  const pages = await Promise.all([
    getPathsFromContext(NODE_TYPES.LANDING_PAGE, ctx),
    getPathsFromContext(NODE_TYPES.PAGE, ctx),
  ])

  const fields = pages
    .flat()
    .map(({ params, locale }) => [locale, ...params.slug].join('/'))
    .map((path) => new URL(path, siteurl.origin).toString())
    .map((loc) => ({ loc, lastmod: new Date().toISOString() }))

  // [
  //   {
  //     loc: 'https://example.com', // Absolute url
  //     lastmod: new Date().toISOString(),
  //     // changefreq
  //     // priority
  //   },
  //   {
  //     loc: 'https://example.com/dynamic-path-2', // Absolute url
  //     lastmod: new Date().toISOString(),
  //     // changefreq
  //     // priority
  //   },
  // ]

  return getServerSideSitemap(ctx, fields)
}
const Sitemap = () => {}
// Default export to prevent next.js errors
export default Sitemap
