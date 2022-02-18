import Block from '@/components/layout/Block'
import { IconExternalSite } from '@/components/Icons'
import cls from 'classnames'
import { useTranslation } from 'next-i18next'

const LOWERCASE_LOCALES = ['fi', 'et', 'es', 'fr']

export const ExternalLinkCollection = ({ content = [], locale }) => {
  const { t } = useTranslation('common')
  return (
    <div className="py-4">
      {content?.map(({ title, siteName, mainTranslation, languages }, i) => (
        <div
          className={cls({
            'mb-3 pb-3 border-b border-gray-hr': i + 1 < content.length,
          })}
          key={`readmore-${siteName}`}
        >
          <h3 className="flex items-center text-small">
            <IconExternalSite
              className="me-2"
              aria-hidden
              title={t('buttons.external')}
            />
            {siteName}
          </h3>

          <a
            rel="noreferrer"
            lang={mainTranslation?.field_locale}
            href={mainTranslation?.url}
            id={`ifu-external-link--${mainTranslation.id}`}
            className="inline-block mb-2 text-body font-bold leading-snug ifu-text-link"
          >
            {title}
            {/* Screen reader info: link goes to external site. */}
            <span className="block overflow-hidden absolute w-0 h-0">
              {t('buttons.external')}
            </span>
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
                  aria-describedby={`ifu-external-link--${mainTranslation.id}`}
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
}

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
