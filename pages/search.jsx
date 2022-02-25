import { useTranslation } from 'next-i18next'
import Layout from '@/components/layout/Layout'
import Head from 'next/head'
import Block from '@/components/layout/Block'
import { searchResultsCountAtom } from '@/src/store'
import Link from 'next/link'
import SEARCH_RESULTS from '@/MOCK_SEARCH'
import { useEffect, useState } from 'react'
import { IconLookingGlass } from '@/components/Icons'
import { Analytics } from '@/hooks/useAnalytics'
import { useAtomValue } from 'jotai/utils'
import useSearchRoute from '@/hooks/useSearchRoute'
import { IconAngleRight } from '@/components/Icons'
import * as DrupalApi from '@/lib/ssr-api'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'

import Highlighter from 'react-highlight-words'

export async function getServerSideProps(context) {
  const { query } = context
  /*
   Scaffold for testing different UI states for search page.
   See page snapshot tests when real search is implemented and
  mock search results.
  */
  const common = await DrupalApi.getCommonApiContent(context)
  const search = query.search || null
  let results = null
  // Mock no results witn '_'
  if (search) {
    results = search === '_' ? [] : SEARCH_RESULTS
  }

  return {
    props: {
      ...common,
      ...(await serverSideTranslations(context.defaultLocale, ['common'])),

      search,
      results,
    },
  }
}

const SearchBar = ({ qw }) => {
  // Sync search field with URL
  const { t } = useTranslation('common')
  const [search, setQuery] = useState(qw)
  const goToSearch = useSearchRoute({ search })

  useEffect(() => {
    setQuery(qw)
  }, [qw, setQuery])

  return (
    <div className="mt-8 mb-16">
      <form
        className="flex items-center border border-black"
        onSubmit={goToSearch}
      >
        <input
          type="text"
          placeholder={t('search.placeholder')}
          name="search"
          value={search === null ? '' : search}
          onChange={({ target: { value } }) => setQuery(value)}
          className=" inline-block flex-grow px-2 h-12"
        />
        <button className="flex-none w-12 h-12">
          <IconLookingGlass className="mx-2" />
        </button>
      </form>
    </div>
  )
}

const Result = ({ title, url, path, excerpt, search }) => (
  <section className="mxy-8">
    <h2 className="text-h5xl font-bold">
      <Link href={url} passHref prefetch={false}>
        <a>{title}</a>
      </Link>
    </h2>
    {path && (
      <p className="">
        {path.map(({ title, url, id }, i) => (
          <Link key={`result-link-${id}`} href={url} passHref prefetch={false}>
            <a className="text-tiny text-gray">
              {title}
              {i + 1 < path.length && <IconAngleRight className="mx-1" />}
            </a>
          </Link>
        ))}
      </p>
    )}
    <p className="pb-8 mt-2 mb-8 text-body-small border-b border-gray-light">
      <Highlighter
        highlightClassName="bg-orange-light text-black"
        textToHighlight={excerpt}
        searchWords={[search]}
      />
    </p>
  </section>
)
const SearchResults = ({ results, search }) => {
  return results.map((r) => (
    <Result key={`result-${r.id}`} {...r} search={search} />
  ))
}

export const SearchPage = ({ search, results }) => {
  const { t } = useTranslation('common')
  const searchCount = useAtomValue(searchResultsCountAtom)

  // Set search count for analytics
  useEffect(() => {
    Analytics._searchCount = searchCount
  }, [searchCount])

  let title
  if (!search) {
    title = t('search.title.start')
  } else if (results.length === 0) {
    title = t('search.title.noresults')
  } else {
    title = t('search.title.results')
  }

  return (
    <Layout>
      <Head>
        <title>{title}</title>
      </Head>
      <Block hero>
        <h1 className="mt-16 text-h2 md:text-h3xl">{title}</h1>
        <SearchBar qw={search} />
        {results && <SearchResults search={search} results={results} />}
      </Block>
    </Layout>
  )
}

export default SearchPage
