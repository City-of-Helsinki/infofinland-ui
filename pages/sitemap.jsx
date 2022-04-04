import { SecondaryLayout } from '@/components/layout/Layout'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'
import TextLink from '@/components/TextLink'
import cls from 'classnames'
import Block from '@/components/layout/Block'
import getConfig from 'next/config'
import { getMenus, NOT_FOUND, NO_DEFAULT_LOCALE } from '@/lib/ssr-api'
import { getMenu, getResourceByPath } from 'next-drupal'
import { forEach } from 'lodash'
import { useRouter } from 'next/router'
import { useTranslation } from 'next-i18next'

export async function getStaticProps(context) {
  const { SITEMAP_PAGE_PATH, DRUPAL_MENUS, REVALIDATE_TIME } =
    getConfig().serverRuntimeConfig
  const menus = await getMenus(context)
  const node = await getResourceByPath(SITEMAP_PAGE_PATH, {
    locale: context.locale,
    defaultLocale: NO_DEFAULT_LOCALE,
  })
  if (!node) {
    return NOT_FOUND
  }

  const menuName = DRUPAL_MENUS.ABOUT
  menus[menuName] = await getMenu(menuName)

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
      ...(await serverSideTranslations(context.locale, ['common'])),
    },
    revalidate: REVALIDATE_TIME,
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

export default function SiteMap(props) {
  const { locale } = useRouter
  const { t } = useTranslation('common')
  const { DRUPAL_MENUS } = getConfig().publicRuntimeConfig
  const { node, urls } = props
  return (
    <SecondaryLayout {...props}>
      <Block>
        <h1 className="mt-16 mb-8 text-h1 md:text-h1xl">{node.title}</h1>
        <SitemapList
          urls={[
            { url: `/${locale}`, title: t('breadcrumbs.frontpage') },
            ...urls.main,
          ]}
          name={DRUPAL_MENUS.MAIN}
        />
        <SitemapList
          urls={[...urls[DRUPAL_MENUS.CITIES_LANDING], ...urls.cities]}
          name={DRUPAL_MENUS.CITIES}
        />
        <SitemapList urls={urls.about} name={DRUPAL_MENUS.ABOUT} />
      </Block>
    </SecondaryLayout>
  )
}
