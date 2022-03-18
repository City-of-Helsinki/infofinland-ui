import TextLink from '@/components/TextLink'
import ParseHtml from '../ParseHtml'
// must be present in clientside code, or it will be purged from final css
export const HIGHLIGHT_CLASS = 'ifu-search__highlight'
const Result = ({
  title,
  url,
  language,
  field_description = [],
  field_text = [],
  id,
}) => {
  return (
    <section className="pb-8 mt-8 border-b border-gray-light" lang={language}>
      <h2 className="mb-4 text-h5xl font-bold">
        <TextLink href={url} locale={language}>
          {/* <ParseHtml html={title||''}/> */}
          {title}
        </TextLink>
      </h2>

      {[...field_description, ...field_text].map((html, i) => (
        <p className="mb-4 text-body-small" key={`result-${id}-highlight-${i}`}>
          ... <ParseHtml html={html} /> ...
        </p>
      ))}
    </section>
  )
}

export default Result
