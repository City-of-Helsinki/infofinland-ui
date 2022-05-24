import axios from 'axios'
import { CACHE_HEADERS_60S } from '@/cache-headers'
import logger from '@/logger'

const DRUPAL_SITEMAP = `${process.env.NEXT_PUBLIC_DRUPAL_BASE_URL}/default/sitemap.xml`

export const getServerSideProps = async ({ res }) => {
  const { data: sitemap, error } = await axios.get(DRUPAL_SITEMAP, {
    responseType: 'text',
  })

  if (error) {
    logger.error('Sitemap error', { error, sitemapLength: sitemap?.length })
  }
  res.setHeader('Content-Type', 'application/xml; charset=utf-8')
  res.setHeader(...CACHE_HEADERS_60S)
  res.write(sitemap)
  res.end()
  //to suppress error in nextjs
  return { props: {} }
}

const Sitemap = () => {}

// Default export to prevent next.js errors
export default Sitemap
