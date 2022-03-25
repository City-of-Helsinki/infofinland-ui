// import { NODE_TYPES } from '@/lib/DRUPAL_API_TYPES'
// import { getMenu, getPathsFromContext } from 'next-drupal'
import { getServerSideSitemap } from 'next-sitemap'
// import absoluteUrl from 'next-absolute-url'
// import { getMenus } from '@/lib/ssr-api'
// import { i18n } from '@/next-i18next.config'
export const getServerSideProps = async (ctx) => {




    // const menus = await = getMenus()
  // const siteurl = absoluteUrl(ctx.req)
  // const pages = await Promise.all([
  //   getPathsFromContext(NODE_TYPES.LANDING_PAGE, ctx),
  //   getPathsFromContext(NODE_TYPES.PAGE, ctx),
  // ])

  // const i18n.locales
  // const menus =
  //   [...menu.main.items, ...menu['cities-landing'].items, ...menu.cities.items, ...menu.about.items].map(({url})=>url)
  // )
  // // const menus = await  getMenus(ctx)
  // console.log({menus})
  // const pages = [...menus.main.items, ...menus['cities-landing'].items, ...menus.cities.items, ...menus.about.items].map(({url})=>url)
  // console.log({pages})
  const fields = []
  // const fields = pages
  //   .flat()
  //   .map(({ params, locale }) => [locale, ...params.slug].join('/'))
  //   .map((path) => new URL(path, siteurl.origin).toString())
  //   .map((loc) => ({ loc, lastmod: new Date().toISOString() }))

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
