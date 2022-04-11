import { useTranslation } from 'next-i18next'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'
import getConfig from 'next/config'
import Router from 'next/router'
import { useEffect, useState } from 'react'
import { useAtomValue } from 'jotai/utils'
import { Analytics } from '@/hooks/useAnalytics'
import { getCachedMenus } from '@/lib/ssr-api'
import * as Elastic from '@/lib/elasticsearch'
import SearchBar from '@/components/search/SearchBar'
import { DotsLoader } from '@/components/Loaders'
// import Pagination from '@/components/search/Pagination'
import Layout from '@/components/layout/Layout'
import Head from 'next/head'
import Block from '@/components/layout/Block'
// import SearchResults from '@/components/search/SearchResults'
import {
  searchResultsCountAtom,
  searchResultsTermAtom,
  searchErrorAtom,
} from '@/src/store'
import dynamic from 'next/dynamic'
// import logger from '@/logger'
const Pagination = dynamic(() => import('@/components/search/Pagination'))
const SearchResults = dynamic(() => import('@/components/search/SearchResults'))

const logger = console

import { CACHE_HEADERS_60S } from '@/cache-headers'

export async function getServerSideProps(context) {
  const menus = await getCachedMenus(context.locale)
  context.res.setHeader(...CACHE_HEADERS_60S)
  const { size, q, from, index } = Elastic.getSearchParamsFromQuery(context)
  let results = null
  let error = null
  const searchParams = {
    q,
    size,
    from,
    body: {
      highlight: Elastic.HIGHLIGHT_RULES,
    },
  }
  const elastic = Elastic.getSearchClient()
  const indexExists = await elastic.indices.exists({
    index,
    allow_no_indices: false,
  })

  if (indexExists) {
    searchParams.index = index
  } else {
    logger.warn(Elastic.getIndexWarning({ index, q }))
  }

  if (q) {
    results = await elastic.search(searchParams).catch((e) => {
      logger.error(Elastic.ERROR, {
        q,
        index,
        size,
        from,
        error: e?.meta?.body?.error?.root_cause || e?.name || e,
      })
      error = e?.meta?.statusCode || e?.name || e
      return {}
    })
  }

  return {
    props: {
      menus,
      ...(await serverSideTranslations(context.locale, ['common'])),
      search: {
        q,
        size,
        from,
        results,
        error,
      },
    },
  }
}

export const SearchPage = () => {
  const { SEARCH_PAGE_PATH } = getConfig().publicRuntimeConfig
  const { t } = useTranslation('common')
  const searchCount = useAtomValue(searchResultsCountAtom)
  const q = useAtomValue(searchResultsTermAtom)
  const error = useAtomValue(searchErrorAtom)
  const [loading, setLoading] = useState(false)

  const loadingOff = () => setLoading(false)
  const loadingOn = (param) => {
    //only trigger search loader if next path is still in search page
    if (param.includes(SEARCH_PAGE_PATH)) {
      setLoading(true)
    }
  }
  // Set search count for analytics
  useEffect(() => {
    Analytics._searchCount = searchCount
  }, [searchCount])

  //Trigger custom page loader states from router
  useEffect(() => {
    Router.events.on('routeChangeStart', loadingOn)
    Router.events.on('routeChangeComplete', loadingOff)
    Router.events.on('routeChangeError', loadingOff)
    return () => {
      Router.events.off('routeChangeStart', loadingOn)
      Router.events.off('routeChangeComplete', loadingOff)
      Router.events.off('routeChangeError', loadingOff)
    }
  })

  let title

  if (!q) {
    title = t('search.title.start')
  } else if (searchCount === 0) {
    title = t('search.title.noresults')
  } else {
    title = `${t('search.title.results')} - ${q}`
  }

  return (
    <Layout node={{ title }}>
      <Head>
        <title>{title}</title>
      </Head>
      <Block className="relative">
        <h1 className="mt-16 text-h2 md:text-h3xl">{title}</h1>
        <SearchBar search={q} />

        {q && !error && (
          <div className="pb-4">
            <dl className="mb-2 text-body text-gray-dark">
              <dd className="inline-block">{t('search.count')}</dd>
              <dt className="inline-block font-bold ms-1">{searchCount} </dt>
            </dl>
            {searchCount > 0 && <Pagination className="mt-8" />}
          </div>
        )}

        <div className="mt-4 min-h-[4rem]">
          {loading && searchCount === 0 && (
            <div className="flex items-center -translate-y-4">
              <DotsLoader />
            </div>
          )}
          {!loading && error && (
            <h3 className="mb-8 text-h4 translate-y-3">{t('search.error')} </h3>
          )}
          {searchCount > 0 && <SearchResults />}
          {searchCount > 0 && <Pagination className="mt-16 mb-4" />}
        </div>
      </Block>
    </Layout>
  )
}

export default SearchPage
