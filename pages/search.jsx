import { useTranslation } from 'next-i18next'
import Layout from '@/components/layout/Layout'
import Head from 'next/head'
import Block from '@/components/layout/Block'
import {
  searchResultCurrentPageAtom,
  searchResultPageCountAtom,
  searchResultPageSizeAtom,
  searchResultsAtom,
  searchResultsCountAtom,
  searchResultsTermAtom,
} from '@/src/store'

import { useRouter } from 'next/router'
import { useEffect } from 'react'
import { Analytics } from '@/hooks/useAnalytics'
import { useAtomValue } from 'jotai/utils'
// import { IconAngleRight } from '@/components/Icons'
import { getCommonApiContent } from '@/lib/ssr-api'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'
import { getSearchResult } from '@/lib/ssr-helpers'

import {
  DEFAULT_FROM,
  DEFAULT_SIZE,
  getSearchClient,
} from '@/lib/elasticsearch'
import ReactPaginate from 'react-paginate'
import SearchBar from '@/components/search/SearchBar'
import Result from '@/components/search/Result'

export async function getServerSideProps(context) {
  /*
   Scaffold for testing different UI states for search page.
   See page snapshot tests when real search is implemented and
  mock search results.
  */
  const common = await getCommonApiContent(context)
  const q = context.query?.search || ''
  const size = DEFAULT_SIZE
  let from = DEFAULT_FROM
  const page = Number(context.query?.page)
  if (!isNaN(page)) {
    from = (page - 1) * 10
  }

  if (context.query?.from) {
    from = context.query.from
  }

  let results = null

  if (q) {
    results = await getSearchClient().search({
      //  index:context.locale,
      q,
      size,
      from,
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

const SearchResults = () => {
  const search = useAtomValue(searchResultsTermAtom)
  const results = useAtomValue(searchResultsAtom)

  if (!results || results?.length < 1) {
    return null
  }

  return results
    ?.map(getSearchResult)
    .map((r) => <Result key={`result-${r.id}`} {...r} search={search} />)
}

const pageUrl = ({ page, q }) => {
  let url = new URL('http://a.b/search')
  url.searchParams.set('search', q)
  url.searchParams.set('page', page - 1)
  const { pathname, search } = url
  return `${pathname}${search}`
}

export const SearchPage = () => {
  const { t } = useTranslation('common')

  const searchCount = useAtomValue(searchResultsCountAtom)
  const q = useAtomValue(searchResultsTermAtom)
  const pageSize = useAtomValue(searchResultPageSizeAtom)
  const currentPage = useAtomValue(searchResultCurrentPageAtom)
  // const pageCount = Math.ceil(searchCount / pageSize)
  const pageCount = useAtomValue(searchResultPageCountAtom)
  console.log({ pageCount, currentPage })
  const { push } = useRouter()
  // Set search count for analytics
  useEffect(() => {
    Analytics._searchCount = searchCount
  }, [searchCount])

  let title
  if (!q) {
    title = t('search.title.start')
  } else if (searchCount === 0) {
    title = t('search.title.noresults')
  } else {
    title = t('search.title.results')
  }
  // const pageCount = Math.ceil(searchCount / pageSize)
  const pageUrlWithSearchTerm = (page) => pageUrl({ page, q })

  const changePage = ({ selected }) =>
    push({ query: { search: q, page: selected + 1 } })

  return (
    <Layout>
      <Head>
        <title>{title}</title>
      </Head>
      <Block hero>
        <h1 className="mt-16 text-h2 md:text-h3xl">{title}</h1>
        <SearchBar qw={q} />
        size: {pageSize} | hits: {searchCount}
        <SearchResults />
        {pageSize < searchCount && (
          <ReactPaginate
            breakLabel="..."
            hrefBuilder={pageUrlWithSearchTerm}
            pageCount={pageCount}
            pageRangeDisplayed={3}
            forcePage={currentPage}
            onPageChange={changePage}
            activeClassName="ifu-pagination__page--active"
            containerClassName="ifu-pagination"
            pageClassName="ifu-pagination__page"
            previousClassName="ifu-pagination__prev"
            breakClassName="ifu-pagination__break"
            nextClassName="ifu-pagination__next"
            renderOnZeroPageCount={null}
          />
        )}
      </Block>
    </Layout>
  )
}

export default SearchPage
