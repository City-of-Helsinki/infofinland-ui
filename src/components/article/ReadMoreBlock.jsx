import Block from '@/components/layout/Block'
import { IconExternalSite } from '@/components/Icons'
import cls from 'classnames'

export const ExternalLinkCollection = ({ content = [], locale }) => (
  <div className="py-4">
    {content?.map(({ title, siteName, mainTranslation, languages }, i) => (
      <div
        className={cls({
          'mb-3 pb-3 border-b border-gray-hr': i + 1 < content.length,
        })}
        key={`readmore-${siteName}`}
      >
        <span
          className="flex items-center text-small"
          target="_blank"
          rel="noreferrer"
        >
          <IconExternalSite className="me-2" />
          {siteName}
        </span>

        <a
          rel="noreferrer"
          lang={mainTranslation?.field_locale}
          href={mainTranslation?.url}
          target="_blank"
          className="inline-block mb-2 text-body font-bold leading-snug ifu-text-link"
        >
          {title}
        </a>

        {languages?.length > 0 && (
          <div
            className={cls('flex flex-wrap divide-link divide-s', {
              lowercase: LOWERCASE_LOCALES.includes(locale),
            })}
          >
            {languages.map(({ url, title: langTitle, locale, id }, k) => (
              <a
                title={langTitle}
                rel="noreferrer"
                href={url}
                key={`link-${id}-${locale}`}
                lang={locale}
                className={cls('text-small leading-snug ifu-text-link pe-2', {
                  'ps-2': k > 0,
                })}
              >
                {langTitle}
              </a>
            ))}
          </div>
        )}
      </div>
    ))}
  </div>
)

const LOWERCASE_LOCALES = ['fi', 'et', 'es', 'fr']
const ReadMoreBlock = ({ content = [], locale }) => {
  if (content?.length === 0) {
    return null
  }
  return (
    <Block className="mt-8 mb-8 bg-orange-white">
      <ExternalLinkCollection content={content} locale={locale} />
    </Block>
  )
}

export default ReadMoreBlock
