import { useTranslation } from 'next-i18next'
import Layout from '@/components/layout/Layout'
import Head from 'next/head'
import Block from '@/components/layout/Block'
import {
  searchResultCurrentPageZeroIndexAtom,
  searchResultPageCountAtom,
  searchResultPageSizeAtom,
  searchResultsAtom,
  searchResultsCountAtom,
  searchResultsTermAtom,
} from '@/src/store'
import getConfig from 'next/config'
import cls from 'classnames'
import Router, { useRouter } from 'next/router'
import { useEffect, useState } from 'react'
import { Analytics } from '@/hooks/useAnalytics'
import { useAtomValue } from 'jotai/utils'
import { getCommonApiContent } from '@/lib/ssr-api'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'
import { getSearchResult } from '@/lib/ssr-helpers'
import * as Elastic from '@/lib/elasticsearch'
import ReactPaginate from 'react-paginate'
import SearchBar from '@/components/search/SearchBar'
import Result from '@/components/search/Result'
import { DotsLoader } from '@/components/Loaders'

export async function getServerSideProps(context) {
  /*
   Scaffold for testing different UI states for search page.
   See page snapshot tests when real search is implemented and
  mock search results.
  */
  const common = await getCommonApiContent(context)
  const { size, q, from } = Elastic.getSearchParamsFromQuery(context)
  let results = null

  if (q) {
    results = await Elastic.getSearchClient()
      .search({
        //  index:context.locale,
        q,
        size,
        from,
      })
      .catch((e) => {
        console.error(Elastic.ERROR, e.meta.body.error.root_cause)
        return { results: {}, error: e.meta.statusCode }
      })
  }

  return {
    props: {
      ...common,
      ...(await serverSideTranslations(context.locale, ['common'])),
      search: {
        q,
        size,
        from,
        results,
      },
    },
  }
}

const Pagination = ({ className }) => {
  const { push } = useRouter()
  const searchCount = useAtomValue(searchResultsCountAtom)
  const q = useAtomValue(searchResultsTermAtom)
  const pageSize = useAtomValue(searchResultPageSizeAtom)
  const currentPage = useAtomValue(searchResultCurrentPageZeroIndexAtom)
  const pageCount = useAtomValue(searchResultPageCountAtom)

  const pageUrlWithSearchTerm = (page) => pageUrl({ page, q })
  const changePage = ({ selected }) =>
    push({ query: { search: q, page: selected + 1 } })

  if (pageSize > searchCount) {
    return null
  }

  return (
    <ReactPaginate
      breakLabel="..."
      hrefBuilder={pageUrlWithSearchTerm}
      pageCount={pageCount}
      pageRangeDisplayed={3}
      forcePage={currentPage}
      onPageChange={changePage}
      renderOnZeroPageCount={null}
      containerClassName={cls('ifu-pagination', className)}
      activeClassName="ifu-pagination__page--active"
      pageClassName="ifu-pagination__page"
      previousClassName="ifu-pagination__button--prev"
      breakClassName="ifu-pagination__button--break"
      nextClassName="ifu-pagination__button--next"
      disabledClassName=".ifu-pagination__button--disabled"
      disabledLinkClassName="ifu-pagination__page--disabled"
    />
  )
}

const SearchResults = () => {
  const q = useAtomValue(searchResultsTermAtom)
  const results = useAtomValue(searchResultsAtom)

  if (!results || results?.length < 1) {
    return null
  }

  return (
    <div className="mb-8">
      {results?.map(getSearchResult).map((r) => (
        <Result key={`result-${r.id}`} {...r} search={q} />
      ))}
    </div>
  )
}

const pageUrl = ({ page, q }) => {
  const { SEARCH_PAGE_PATH } = getConfig().publicRuntimeConfig
  let url = new URL(SEARCH_PAGE_PATH, new URL('http://a.b'))
  url.searchParams.set('search', q)
  url.searchParams.set('page', page)
  const { pathname, search } = url
  return `${pathname}${search}`
}

export const SearchPage = () => {
  const { t } = useTranslation('common')
  const searchCount = useAtomValue(searchResultsCountAtom)
  const q = useAtomValue(searchResultsTermAtom)
  const [loading, setLoading] = useState(false)
  const loadingOff = () => setLoading(false)
  const loadingOn = () => setLoading(true)
  // Set search count for analytics
  useEffect(() => {
    Analytics._searchCount = searchCount
  }, [searchCount])

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
    title = t('search.title.results')
  }

  return (
    <Layout>
      <Head>
        <title>{title}</title>
      </Head>
      <Block className="relative">
        <h1 className="mt-16 text-h2 md:text-h3xl">{title}</h1>
        <SearchBar search={q} />

        {q && (
          <div className="pb-4 border-b border-gray">
            <dl className="mb-2 text-body">
              <dd className="inline-block">Osumia:</dd>
              <dt className="inline-block font-bold ms-1">{searchCount}</dt>
            </dl>
            {searchCount > 0 && <Pagination />}
          </div>
        )}

        {searchCount === 0 && loading && (
          <div className="flex absolute items-center lg:mt-5 w-full lg:h-96 -translate-x-6 -translate-y-2">
            <DotsLoader />
          </div>
        )}
        {searchCount > 0 && <SearchResults />}
        {searchCount > 0 && <Pagination />}
      </Block>
    </Layout>
  )
}

export default SearchPage
