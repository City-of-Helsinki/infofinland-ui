import { useTranslation } from 'next-i18next'
import Layout from '@/components/layout/Layout'
import Head from 'next/head'
import Block from '@/components/layout/Block'
import { searchResultsAtom, searchResultsCountAtom,searchResultsTermAtom } from '@/src/store'

import { useEffect, useState } from 'react'
import { IconLookingGlass } from '@/components/Icons'
import { Analytics } from '@/hooks/useAnalytics'
import { useAtomValue } from 'jotai/utils'
import useSearchRoute from '@/hooks/useSearchRoute'
// import { IconAngleRight } from '@/components/Icons'
import { getCommonApiContent } from '@/lib/ssr-api'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'
import Highlighter from 'react-highlight-words'
import mockResults from '@/DEMO-elastic'
import { getSearchResult } from '@/lib/ssr-helpers'
import striptags from 'striptags'
import TextLink from '@/components/TextLink'

const RESULT_MAX_LENGTH = 500 //characters before truncating with ...
export async function getServerSideProps(context) {
  /*
   Scaffold for testing different UI states for search page.
   See page snapshot tests when real search is implemented and
  mock search results.
  */
  const common = await getCommonApiContent(context)
  const q = context.query?.search
  let search = mockResults

  // // Mock no results witn '_'
  // if (q) {
  // //  search = await getClient().search({q})

  //   search = mockResults
  // }

  return {
    props: {
      ...common,
      ...(await serverSideTranslations(context.defaultLocale, ['common'])),
      q,
      search
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


const HilightedResult = ({text,search}) => (
  <p className="mb-4 text-body-small">
      <Highlighter
        highlightClassName="bg-orange-light text-black"
        textToHighlight={text.length> RESULT_MAX_LENGTH ? `${text.substr(0,RESULT_MAX_LENGTH)}...`: text}
        searchWords={[search]}
      />
  </p>
)

const Result = ({ title, url, language, field_description, field_text, search ,id}) => (
  <section className="pb-8 mt-8 border-b border-gray-light" lang={language}>
    <h2 className="mb-4 text-h5xl font-bold">
      <TextLink href={url} >{title}</TextLink>
      {/* <Link href={url} locale={language} passHref prefetch={false}>
        <a></a>
      </Link> */}
    </h2>
    {/* {path && (
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
    )} */}

    {field_description &&
    field_description.map(  (text,i) => <HilightedResult search={search} key={`result-${id}-highlight-${i}`} text={striptags(text)}/>   )
    }
    {field_text?.length>0 && <HilightedResult text={field_text[0]} search={search} />}
  </section>
)

const SearchResults = () => {
  const search = useAtomValue(searchResultsTermAtom)
  const results = useAtomValue(searchResultsAtom)

  if(results?.length < 1 ){
    return null
  }

  return results?.map(getSearchResult).map((r) => (
    <Result key={`result-${r.id}`} {...r} search={search} />
  ))
}

export const SearchPage = () => {
  const { t } = useTranslation('common')
  const searchCount = useAtomValue(searchResultsCountAtom)
  const search = useAtomValue(searchResultsTermAtom)
  // Set search count for analytics
  useEffect(() => {
    Analytics._searchCount = searchCount
  }, [searchCount])

  let title
  if (!search) {
    title = t('search.title.start')
  } else if (searchCount === 0) {
    title = t('search.title.noresults')
  } else {
    title = t('search.title.results')
  }
  console.log({mockResults})

  return (
    <Layout>
      <Head>
        <title>{title}</title>
      </Head>
      <Block hero>
        <h1 className="mt-16 text-h2 md:text-h3xl">{title}</h1>
        <SearchBar qw={search} />
         <SearchResults />
      </Block>
    </Layout>
  )
}

export default SearchPage
