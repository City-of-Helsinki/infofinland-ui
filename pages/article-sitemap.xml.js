// import { NODE_TYPES } from '@/lib/DRUPAL_API_TYPES'
// import { getMenu, getPathsFromContext } from 'next-drupal'
import { getServerSideSitemap } from 'next-sitemap'
// import absoluteUrl from 'next-absolute-url'
// import { getMenus } from '@/lib/ssr-api'
// import { i18n } from '@/next-i18next.config'
// import { siteUrl } from '@/next-sitemap'
// import getConfig from 'next/config'
// import { values } from 'lodash'


export const getServerSideProps = async (ctx) => {

const fields =[]
    // const { DRUPAL_MENUS } = getConfig().serverRuntimeConfig
    // const menuNames = values(DRUPAL_MENUS)
  //   // // only main navigation menus are used in sitemap

  //   // const sitemapMenus = menuNames.filter(name => name ==! 'footer-about')

  //   // const menus = await = getMenus()
  // // const siteurl = absoluteUrl(ctx.req)
  // // const pages = await Promise.all([
  // //   getPathsFromContext(NODE_TYPES.LANDING_PAGE, ctx),
  // //   getPathsFromContext(NODE_TYPES.PAGE, ctx),
  // // ])

  // // const i18n.locales
  // const menus =  (await Promise.all(i18n.locales.map( locale=>{ console.log({locale}); return getMenus({locale})} ))).map(menu => {
  //   return [...menu.main.items, ...menu['cities-landing'].items, ...menu.cities.items, ...menu.about.items].map(({url})=>url)
  // }).flat()
  // // const menus = await  getMenus(ctx)

  // console.log({menus})
  // // const pages = [...menus.main.items, ...menus['cities-landing'].items, ...menus.cities.items, ...menus.about.items].map(({url})=>url)
  // // console.log({pages})

  // const fields = menus
  //   .flat()
  //   // .map(({ params, locale }) => [locale, ...params.slug].join('/'))
  //   .map((path) => new URL(path, siteUrl).toString())
  //   .map((loc) => ({ loc, lastmod: new Date().toISOString() }))

  // // [
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
