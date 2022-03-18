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
  searchErrorAtom,
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
  const common = await getCommonApiContent(context)
  const { size, q, from } = Elastic.getSearchParamsFromQuery(context)
  let results = null
  let error = null

  if (q) {
    results = await Elastic.getSearchClient()
      .search({
        //  index:context.locale,
        q,
        size,
        from,
        body: {
          // q
          // query:{multi_match:{
          //   query:q,
          //   fields:Elastic.FIELDS
          // }},
          highlight: {
            number_of_fragments: Elastic.HIGHLIGHT_NUM_OF_FRAGMENTS,
            fragment_size: Elastic.HIGHLIGHT_FRAGMENT_SIZE,
            fields: {
              field_description: Elastic.HIGHLIGHTER,
              url: Elastic.HIGHLIGHTER,
              field_text: Elastic.HIGHLIGHTER,
              title: Elastic.HIGHLIGHTER,
            },
          },
        },
      })
      .catch((e) => {
        console.error(
          Elastic.ERROR,
          e?.meta?.body?.error?.root_cause || e?.name || e
        )
        error = e?.meta?.statusCode || e?.name || e
        return {}
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
        error,
      },
    },
  }
}

const Pagination = ({ className }) => {
  const { t } = useTranslation('common')
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
    <>
      <ReactPaginate
        breakLabel="..."
        nextLabel={t('search.next')}
        previousLabel={t('search.prev')}
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
    </>
  )
}

const SearchResults = () => {
  const q = useAtomValue(searchResultsTermAtom)
  const results = useAtomValue(searchResultsAtom)
  //No results, no output
  if (!results || results?.length < 1) {
    return null
  }

  // const search = parseLucene(q);
  return results
    ?.map(getSearchResult)
    .map((r) => <Result key={`result-${r.id}`} {...r} search={q} />)
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
  const error = useAtomValue(searchErrorAtom)
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
