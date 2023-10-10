import { SecondaryLayout } from '@/components/layout/Layout'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'
import TextLink from '@/components/TextLink'
import cls from 'classnames'
import Block from '@/components/layout/Block'
import getConfig from 'next/config'
import {
  getCachedMenus,
  getCachedAboutMenus,
  NOT_FOUND,
  NO_DEFAULT_LOCALE,
} from '@/lib/ssr-api'
import forEach from 'lodash/forEach'
import { useRouter } from 'next/router'
import { useTranslation } from 'next-i18next'
import CommonHead from '@/components/layout/CommonHead'
import { i18n } from '@/next-i18next.config'
import getDrupalClient from '@/lib/drupal-client'

export async function getStaticProps(context) {
  const { locale, preview } = context
  const { SITEMAP_PAGE_PATH, DRUPAL_MENUS, REVALIDATE_TIME } = getConfig().serverRuntimeConfig

  if (i18n.disabledLocales.includes(locale)) {
    return NOT_FOUND
  }

  const withAuth = !!preview
  const drupal = getDrupalClient(withAuth)
  const menus = await getCachedMenus(locale)
  const options = {
    locale,
    defaultLocale: NO_DEFAULT_LOCALE,
  }
  const node = await drupal.getResourceByPath(
    `/${locale}${SITEMAP_PAGE_PATH}`,
    options
  )
  if (!node) {
    return NOT_FOUND
  }

  menus.about = (await getCachedAboutMenus({ locale, withAuth })).about

  const urls = {}
  forEach(menus, (menu, name) => {
    if (name !== DRUPAL_MENUS.FOOTER)
      urls[name] = menu.items.map(({ url, title }) => ({ url, title }))
  })

  return {
    props: {
      node,
      urls,
      menus,
      ...(await serverSideTranslations(locale, ['common'])),
    },
    revalidate: REVALIDATE_TIME
  }
}

const SitemapList = ({ urls, name }) => {
  const { DRUPAL_MENUS } = getConfig().publicRuntimeConfig

  return (
    <ul
      className={cls('py-4', {
        'bg-blue-white':
          name === DRUPAL_MENUS.MAIN || name === DRUPAL_MENUS.CITIES_LANDING,
        'bg-green-white mt-4': name === DRUPAL_MENUS.CITIES,
        'bg-gray-white mt-4': name === DRUPAL_MENUS.ABOUT,
      })}
    >
      {urls?.map(({ url, title }) => {
        const depth = url.split('/').length
        return (
          <li
            key={`page-${url}`}
            className={cls({
              'ms-8 root-page mt-2': depth <= 3,
              'ms-12': depth === 4,
              'ms-16': depth === 5,
            })}
          >
            <TextLink href={url}>
              <span className={depth <= 3 ? 'font-bold' : ''}>{title}</span>
            </TextLink>
          </li>
        )
      })}
    </ul>
  )
}

export default function SiteMap({ node, urls, menus }) {
  const { locale } = useRouter
  const { t } = useTranslation('common')
  const { DRUPAL_MENUS } = getConfig().publicRuntimeConfig

  return (
    <>
      <CommonHead key={`head-sitemap-${node?.id}`} node={node} />
      <SecondaryLayout node={node} menus={menus}>
        <Block>
          <h1 className="mt-16 mb-8 text-h1 md:text-h1xl">{node?.title}</h1>
          <SitemapList
            urls={[
              { url: `/${locale}`, title: t('breadcrumbs.frontpage') },
              ...urls?.main,
            ]}
            name={DRUPAL_MENUS.MAIN}
          />
          <SitemapList
            urls={[...urls[DRUPAL_MENUS.CITIES_LANDING], ...urls?.cities]}
            name={DRUPAL_MENUS.CITIES}
          />
          <SitemapList urls={urls?.about} name={DRUPAL_MENUS.ABOUT} />
        </Block>
      </SecondaryLayout>
    </>
  )
}
