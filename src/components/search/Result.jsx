import striptags from 'striptags'
import TextLink from '@/components/TextLink'
import Highlighter from 'react-highlight-words'

const RESULT_MAX_LENGTH = 500 //characters before truncating with ...

const HilightedResult = ({ text, search }) => (
  <p className="mb-4 text-body-small">
    <Highlighter
      highlightClassName="bg-orange-light text-black"
      textToHighlight={
        text.length > RESULT_MAX_LENGTH
          ? `${text.substr(0, RESULT_MAX_LENGTH)}...`
          : text
      }
      searchWords={[search]}
    />
  </p>
)

const Result = ({
  title,
  url,
  language,
  field_description,
  field_text,
  search,
  id,
}) => (
  <section className="pb-8 mt-8 border-b border-gray-light" lang={language}>
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

    {field_description &&
      field_description.map((text, i) => (
        <HilightedResult
          search={search}
          key={`result-${id}-highlight-${i}`}
          text={striptags(text)}
        />
      ))}
    {field_text?.length > 0 && (
      <HilightedResult text={field_text[0]} search={search} />
    )}
  </section>
)

export default Result
