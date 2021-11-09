// import { useRouter } from 'next/router'
import useTranslation from 'next-translate/useTranslation'
import Layout from '@/components/layout/Layout'
import Head from 'next/head'
import Block from '@/components/article/Block'
// import { SWRResults } from '@/components/search/Search'
// import { Suspense } from 'react'
import Link from 'next/link'
import SEARCH_RESULTS from '@/MOCK_SEARCH'
import { useEffect, useState } from 'react'
import { IconLookingGlass } from '@/components/Icons'
// import { getSearchResults } from '@/src/store'
// const isServer = typeof window === 'undefined'
import useSearchRoute from '@/hooks/useSearchRoute'
import { IconAngleRight } from '@/components/Icons'

import Highlighter from 'react-highlight-words'

export async function getServerSideProps({ query }) {
  const q = query.q || null
  const results = q === null ? [] : SEARCH_RESULTS
  return {
    props: {
      q,
      results,
    },
  }
}

const SearchBar = ({ qw }) => {
  const { t } = useTranslation('common')
  const [q, setQuery] = useState(qw)
  const goToSearch = useSearchRoute({ q })

  useEffect(() => {
    setQuery(qw)
  }, [qw, setQuery])

  return (
    <div className="my-8">
      <form
        className="flex items-center border border-black"
        onSubmit={goToSearch}
      >
        <input
          type="text"
          placeholder={t('search.placeholder')}
          name="q"
          value={q}
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
        highlightClassName="font-bold text-neon-pink bg-green-white"
        textToHighlight={excerpt}
        searchWords={[q]}
      />
    </p>
  </section>
)
const SearchResults = ({ results, q }) => {
  return results.map((r, i) => <Result key={`foo-${i}`} {...r} q={q} />)
}

export const SearchPage = ({ q, results }) => {
  const { t } = useTranslation('common')

  let title
  if (q == null) {
    title = t('search.title.start')
  } else if (results.length === 0) {
    title = t('search.title.noresults')
  } else {
    title = t('search.title.results', { q })
  }

  return (
    <Layout>
      <Head>
        <title>{title}</title>
      </Head>
      <Block hero>
        <h1 className="mt-16 text-h2 md:text-h2xl">{title}</h1>

        <SearchBar qw={q} />
        <SearchResults q={q} results={results} />
      </Block>
    </Layout>
  )
}

export default SearchPage
