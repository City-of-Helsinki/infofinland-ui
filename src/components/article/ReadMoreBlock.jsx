import Block from '@/components/layout/Block'
import { IconExternalSite } from '@/components/Icons'
import cls from 'classnames'
const ReadMoreBlock = ({ content = [] }) => {
  return (
    <Block className="mt-8 mb-8 bg-orange-white">
      <div className="py-6">
        {content.map(
          ({ pageName, siteName, mainTranslation, languages }, i) => (
            <div
              className={cls({
                'mb-3 pb-3 border-b border-gray-hr': i + 1 < content.length,
              })}
              key={`${siteName}-${i}`}
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
                lang={mainTranslation.locale}
                href={mainTranslation.url}
                target="_blank"
                className="inline-block mb-4 text-body font-bold ifu-text-link"
              >
                {pageName}
              </a>

              {languages.length > 0 && (
                <div className="flex flex-wrap divide-link divide-s">
                  {languages.map(({ url, text, locale }, k) => (
                    <a
                      title={pageName}
                      rel="noreferrer"
                      href={url}
                      key={`link-${text}-${k}`}
                      target="_blank"
                      lang={locale}
                      className={cls(
                        'text-small leading-snug ifu-text-link pe-2',
                        {
                          'ps-2': k > 0,
                        }
                      )}
                    >
                      {text}
                    </a>
                  ))}
                </div>
              )}
            </div>
          )
        )}
      </div>
    </Block>
  )
}

export default ReadMoreBlock
