import striptags from 'striptags'
import TextLink from '@/components/TextLink'
import Highlighter from 'react-highlight-words'
const REMOVE_REGEXP = /\*|"|&/gim
const RESULT_MAX_LENGTH = 500 //characters before truncating with ...

const HilightedResult = ({ text, search }) => {
  // let matcher = search
  let matcher = search.trim().replaceAll(REMOVE_REGEXP, '')
  let pre = ''
  let post = ''
  let wordFlag = '\\w*'
  if (/^\*/.test(search)) {
    pre = wordFlag
  }

  if (/\*$/.test(search)) {
    post = wordFlag
  }
  matcher = new RegExp(`${pre}${matcher}${post}`, 'gim')
  console.log(matcher)
  return (
    <p className="mb-4 text-body-small">
      ...{' '}
      <Highlighter
        highlightClassName="bg-orange-light text-black"
        // autoEscape
        textToHighlight={
          text.length > RESULT_MAX_LENGTH
            ? `${text.substr(0, RESULT_MAX_LENGTH)}...`
            : text
        }
        searchWords={[matcher]}
      />{' '}
      ...
    </p>
  )
}

const Result = ({
  title,
  url,
  language,
  field_description,
  field_text,
  search,
  id,
}) => {
  const stripped = search.replaceAll(REMOVE_REGEXP, '')
  const texts = [
    ...(field_description?.map((text) => striptags(text)) || []),
    ...(field_text || []),
  ]
  let matching = texts.filter((text) => new RegExp(stripped, 'gim').test(text))
  if (matching?.length === 0) {
    console.log(texts)
    matching = texts
  }
  return (
    <section className="pb-8 mt-8 border-b border-gray-hr" lang={language}>
      <h2 className="mb-4 text-h5xl font-bold">
        <TextLink href={url} locale={language}>
          {title}
        </TextLink>
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

      {matching?.map((text, i) => (
        <HilightedResult
          search={search}
          key={`result-${id}-highlight--${i}`}
          text={text}
        />
      ))}
    </section>
  )
}

export default Result
