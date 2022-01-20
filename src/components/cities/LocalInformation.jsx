import { IconMapMarker } from '@/components/Icons'
import ParseHtml from '@/components/ParseHtml'
import { useAtom } from 'jotai'
import { selectedCity, cityMenuVisibility } from '@/src/store'
import Block from '@/components/layout/Block'
import cls from 'classnames'
import { IconExternalSite, IconAngleDown } from '@/components/Icons'
import { useTranslation } from 'next-i18next'
import { CSSTransition } from 'react-transition-group'

import TextLink from '../TextLink'
const DEMOHTML = `
<div>
<p>Vocational training is aimed at both young people and adults. You can apply for vocational training all year round. You can study for an upper secondary education or increase your skills in vocational training. Vocational training in Vaasa is organised by Vamia and YA – Vocational College of Ostrobothnia (Yrkesakademin i Österbotten (YA)).</p>
<p>YA and Vamia also organise preparatory training for basic vocational training, i.e. VALMA. The training lasts for a maximum of one academic year. YA’s VALMA training is in Swedish; Handledande utbildning för yrkesutbildning.</p>
</div>
`

const LocalInformation = ({ readMoreUrl }) => {
  const [city, setCity] = useAtom(selectedCity)
  const isOpen = !!city
  // eslint-disable-next-line no-unused-vars
  const [open, setOpen] = useAtom(cityMenuVisibility)
  const openMenu = () => setOpen(true)
  const clearCity = () => setCity(null)
  const { t } = useTranslation('common')
  return (
    <div className="mb-8">
      <Block className="flex items-center h-14 bg-green-lighter lg:rounded-t">
        <h3 className="md:flex-grow text-body font-bold -translate-x-4">
          <IconMapMarker className="h-7 lg:h-8 me-3" />
          Local information
        </h3>
      </Block>
      <Block className="py-8 mb-4 bg-green-white">
        <div className="flex">
          <button
            className="inline-block flex-none text-body-large font-bold"
            onClick={openMenu}
          >
            <span className="underline">
              {!city && t('localInfo.select')}
              {city && city}
            </span>
            <IconAngleDown className="w-3 h-3 fill-black ms-2" />
          </button>
          <div className="flex-grow"></div>
          {city && (
            <button
              className="inline-block flex-none text-body"
              onClick={clearCity}
            >
              {t('localInfo.clear')}
            </button>
          )}
        </div>
        {!city && (
          <p className="mt-2">See related information to your local city.</p>
        )}
        <CSSTransition
          in={isOpen}
          classNames={{
            appear: 'ifu-local-info__content--appear',
            appearActive: 'ifu-local-info__content--appear-active',
            appearDone: 'ifu-local-info__content--appear-done',
            enter: 'ifu-local-info__content--enter',
            enterActive: 'ifu-local-info__content--enter-active',
            enterDone: 'ifu-local-info__content--enter-done',
            exit: 'ifu-local-info__content--exit',
            exitActive: 'ifu-local-info__content--exit-active',
            exitDone: 'ifu-local-info__content--exit-done',
          }}
          mountOnEnter
          unmountOnExit
          timeout={{ appear: 0, enter: 300, exit: 300 }}
        >
          <div className="mt-8">
            <ParseHtml html={DEMOHTML} />
            <LocalReadMore />
            {readMoreUrl && (
              <p className="mt-8">
                <TextLink className="font-bold" href={readMoreUrl}>
                  {t('localInfo.readMore')}
                </TextLink>
              </p>
            )}
          </div>
        </CSSTransition>
      </Block>
    </div>
  )
}

const LocalReadMore = ({ content = [] }) => {
  return (
    <div className="p-4 bg-white rounded">
      <p className="font-bold text-neon-pink">DEMO LOCAL INFO BLOCK</p>
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
                className={cls('text-small leading-snug ifu-text-link pe-2', {
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
