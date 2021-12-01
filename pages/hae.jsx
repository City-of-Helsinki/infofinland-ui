import { useTranslation } from 'next-i18next'
import Layout from '@/components/layout/Layout'
import Head from 'next/head'
import Block from '@/components/layout/Block'

import Link from 'next/link'
import SEARCH_RESULTS from '@/MOCK_SEARCH'
import { useEffect, useState } from 'react'
import { IconLookingGlass } from '@/components/Icons'

import useSearchRoute from '@/hooks/useSearchRoute'
import { IconAngleRight } from '@/components/Icons'
import * as DrupalApi from '@/lib/ssr-api'

import Highlighter from 'react-highlight-words'

export async function getServerSideProps(context) {
  const { query } = context
  /*
   Scaffold for testing different UI states for search page.
   See page snapshot tests when real search is implemented and
  mock search results.
  */
  const common = await DrupalApi.getCommonApiContent(context)
  const q = query.q || null
  let results = null
  // Mock no results witn '_'
  if (q) {
    results = q === '_' ? [] : SEARCH_RESULTS
  }

  return {
    props: {
      ...common,
      q,
      results,
    },
  }
}

const SearchBar = ({ qw }) => {
  // Sync search field with URL
  const { t } = useTranslation('common')
  const [q, setQuery] = useState(qw)
  const goToSearch = useSearchRoute({ q })

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
          name="q"
          value={q === null ? '' : q}
          onChange={({ target: { value } }) => setQuery(value)}
          className=" inline-block flex-grow px-2 h-12"
        />
        <button className="inline-block flex-none w-12 h-12">
          <IconLookingGlass className="mx-2" />
        </button>
      </form>
    </div>
  )
}

const Result = ({ title, url, path, excerpt, q }) => (
  <section className="mxy-8">
    <h2 className="text-h5xl font-bold">
      <Link href={url} passHref>
        <a>{title}</a>
      </Link>
    </h2>
    {path && (
      <p className="">
        {path.map(({ title, url }, i) => (
          <Link key={`result-${i}`} href={url} passHref>
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
        searchWords={[q]}
      />
    </p>
  </section>
)
const SearchResults = ({ results, q }) => {
  return results.map((r, i) => <Result key={`foo-${i}`} {...r} q={q} />)
}

export const SearchPage = ({ q, results, mainMenu, footerMenu }) => {
  const { t } = useTranslation('common')

  let title
  if (!q) {
    title = t('search.title.start')
  } else if (results.length === 0) {
    title = t('search.title.noresults')
  } else {
    title = t('search.title.results')
  }

  return (
    <Layout mainMenu={mainMenu} footerMenu={footerMenu}>
      <Head>
        <title>{title}</title>
      </Head>
      <Block hero>
        <h1 className="mt-16 text-h2 md:text-h3xl">{title}</h1>
        <SearchBar qw={q} />
        {results && <SearchResults q={q} results={results} />}
      </Block>
    </Layout>
  )
}

export default SearchPage
