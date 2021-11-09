import Button from '@/components/Button'
import { IconMapMarker } from '@/components/Icons'
import ParseHtml from '@/components/ParseHtml'
import { useAtom } from 'jotai'
import { selectedCity, cityMenuVisibility } from '@/src/store'
import Block from '@/components/article/Block'
import cls from 'classnames'
import { IconExternalSite } from '@/components/Icons'

import { READMORE_CONTENT } from '@/components/article/ReadMoreBlock'
const DEMOHTML = `
<div>

<p>Vocational training is aimed at both young people and adults. You can apply for vocational training all year round. You can study for an upper secondary education or increase your skills in vocational training. Vocational training in Vaasa is organised by Vamia and YA – Vocational College of Ostrobothnia (Yrkesakademin i Österbotten (YA)).</p>
<p>YA and Vamia also organise preparatory training for basic vocational training, i.e. VALMA. The training lasts for a maximum of one academic year. YA’s VALMA training is in Swedish; Handledande utbildning för yrkesutbildning.</p>
</div>
`
const LocalInformation = () => {
  const [city] = useAtom(selectedCity)
  // eslint-disable-next-line no-unused-vars
  const [, setOpen] = useAtom(cityMenuVisibility)
  const openMenu = () => setOpen(true)

  return (
    <div className="mb-8">
      <Block className="bg-green-lighter md:rounded">
        <div className=" md:flex md:justify-around items-center py-6">
          {!city && (
            <h3 className="md:flex-grow text-h3 font-bold">
              <IconMapMarker className="h-9 me-2 md:me-4" />
              Local information
            </h3>
          )}
          {city && (
            <IconMapMarker
              className={cls('me-2 md:me-4 h-9 inline-block', {
                'mt-2': city,
              })}
            />
          )}
          {city && (
            <h3 className="flex-grow text-h3 font-bold">
              <span className="block text-action font-normal text-dark">
                Local information
              </span>
              {city}
            </h3>
          )}
          <div className="md:flex-none mt-6 md:mt-0 mb-2 md:mb-0">
            <Button onClick={openMenu}>
              {!city && 'Choose City'}
              {city && 'Change City'}
            </Button>
          </div>
        </div>
      </Block>
      {city && (
        <Block className="py-8 mb-4 bg-green-white">
          <ParseHtml html={DEMOHTML} />
          <LocalReadMore />
        </Block>
      )}
    </div>
  )
}

const LocalReadMore = ({ content = READMORE_CONTENT }) => {
  return (
    <div className="p-4 bg-white rounded">
      {content.map(({ siteUrl, siteName, pageUrl, pageName, languages }, i) => (
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
      ))}
    </div>
  )
}

export default LocalInformation
