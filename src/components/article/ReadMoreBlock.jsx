import Block from '@/components/article/Block'
import { IconExternalSite } from '@/components/Icons'
import cls from 'classnames'

export const READMORE_CONTENT = [
  {
    siteName: 'DEMO:Kela',
    pageUrl: 'http://www.kela.fi/',
    pageName: 'Some random Kela page',
    languages: [
      { url: 'http://www.kela.fi/fi/', text: 'Suomi', lang: 'fi' },
      { url: 'http://www.kela.fi/sv/', text: 'Ruotsi', lang: 'fi' },
    ],
  },
  {
    siteName: 'DEMO:Kela',
    pageUrl: 'http://www.kela.fi/',
    pageName: 'Some random Kela page',
    languages: [
      { url: 'http://www.kela.fi/fi/', text: 'Suomi', lang: 'fi' },
      { url: 'http://www.kela.fi/fi/', text: 'Suomi', lang: 'fi' },
      {
        url: 'http://www.kela.fi/sv/',
        text: 'Ruotsi',
        lang: 'sv',
      },
      {
        url: 'http://www.kela.fi/sv/',
        text: 'Ruotsi',
        lang: 'sv',
      },
      { url: 'http://www.kela.fi/fi/', text: 'Suomi', lang: 'sv' },
      {
        url: 'http://www.kela.fi/sv/',
        text: 'Ruotsi',
        lang: 'sv',
      },
      { url: 'http://www.kela.fi/fi/', text: 'Suomi', lang: 'sv' },
      { url: 'http://www.kela.fi/fi/', text: 'Suomi', lang: 'sv' },
      {
        url: 'http://www.kela.fi/sv/',
        text: 'Ruotsi',
        lang: 'sv',
      },
    ],
  },
]
const ReadMoreBlock = ({ content = READMORE_CONTENT }) => {
  return (
    <Block className="mt-8 mb-8 bg-orange-white">
      <div className="py-6">
        {content.map(
          ({ siteUrl, siteName, pageUrl, pageName, languages }, i) => (
            <div
              className={cls({
                'mb-3 pb-3 border-b border-gray-hr': i + 1 < content.length,
              })}
              key={`${siteName}-${i}`}
            >
              <span
                className="flex items-center text-small"
                href={siteUrl}
                target="_blank"
                rel="noreferrer"
              >
                <IconExternalSite className="me-2" />
                {siteName}
              </span>

              <a
                rel="noreferrer"
                href={pageUrl}
                target="_blank"
                className="inline-block mb-4 text-body font-bold ifu-text-link"
              >
                {pageName}
              </a>

              <div className="flex flex-wrap leading-4 divide-link divide-s">
                {languages.map(({ url, text, lang }, k) => (
                  <a
                    title={pageName}
                    rel="noreferrer"
                    href={url}
                    key={`link-${text}-${k}`}
                    target="_blank"
                    lang={lang}
                    className={cls('text-small ifu-text-link pe-2', {
                      'ps-2': k > 0,
                    })}
                  >
                    {text}
                  </a>
                ))}
              </div>
            </div>
          )
        )}
      </div>
    </Block>
  )
}

export default ReadMoreBlock
