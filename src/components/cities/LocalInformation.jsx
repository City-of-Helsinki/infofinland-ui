import { IconMapMarker } from '@/components/Icons'
import ParseHtml from '@/components/ParseHtml'
import { useAtom } from 'jotai'
import { useUpdateAtom, useAtomValue } from 'jotai/utils'
import {
  selectedCityAtom,
  cityMenuVisibilityAtom,
  getLocalInformation,
  nodeIdAtom,
} from '@/src/store'
import Block from '@/components/layout/Block'
import cls from 'classnames'
import { IconExternalSite, IconAngleDown } from '@/components/Icons'
import { useTranslation } from 'next-i18next'
import { CSSTransition } from 'react-transition-group'
import useSWR from 'swr'
// import { CONTENT_TYPES } from '@/lib/DRUPAL_API_TYPES'

import TextLink from '../TextLink'
import { DotsLoader } from '../Loaders'
import { IconExclamationCircle } from '../Icons'
import PTVBlock from '../article/PTVBlock'

const useLocalInformation = ({ city, id }) => {
  const cacheKey = !city ? null : `${city}-${id}`
  const fetcher = !city ? () => {} : () => getLocalInformation({ id, city })

  console.log({ city, id })
  const { data, error } = useSWR(cacheKey, fetcher)

  return {
    node: data,
    isLoading: !error && !data,
    isError: error,
  }
}

const LocalInformation = ({ cities = [] }) => {
  const [selectedCity, setCity] = useAtom(selectedCityAtom)

  // eslint-disable-next-line no-unused-vars
  const setOpen = useUpdateAtom(cityMenuVisibilityAtom)
  const openMenu = () => setOpen(true)
  const clearCity = () => setCity(null)
  const { t } = useTranslation('common')
  console.log({ cities })
  const city = cities.find(({ field_municipality }) => {
    return field_municipality?.name === selectedCity
  })
  const isOpen = !!selectedCity && !!city
  console.log({ city })
  return (
    <div className="mb-8">
      <Block className="flex items-center h-14 lg:h-16 bg-green-lighter lg:rounded-t">
        <h3 className="md:flex-grow text-body font-bold -translate-x-4">
          <IconMapMarker className="h-7 me-2" />
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
              {!selectedCity && t('localInfo.select')}
              {selectedCity && selectedCity}
            </span>
            <IconAngleDown className="w-3 h-3 fill-black ms-2" />
          </button>
          <div className="flex-grow"></div>
          {selectedCity && (
            <button
              className="inline-block flex-none text-body"
              onClick={clearCity}
            >
              {t('localInfo.clear')}
            </button>
          )}
        </div>
        {!selectedCity && <p className="mt-2">{t('localInfo.help')}</p>}
        {!city && selectedCity && (
          <p className="mt-2">{t('localInfo.noInfo')}</p>
        )}
        <SRWContent isOpen={isOpen} city={city} />
      </Block>
    </div>
  )
}

const SRWContent = ({ city, isOpen }) => {
  const { t } = useTranslation('common')
  const { node, isLoading, isError } = useLocalInformation({
    city: city?.field_municipality?.name,
    id: city?.field_municipality_page?.id,
  })
  const pageId = useAtomValue(nodeIdAtom)
  const { field_municipality_info, path } = node || {}
  const content = field_municipality_info?.find(
    ({ field_national_page: { id } }) => id === pageId
  )

  return (
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
      timeout={{ appear: 0, enter: 300, exit: 0 }}
    >
      <div className="mt-8">
        {isLoading && (
          <div className="flex items-center h-52">
            <DotsLoader color="green" />
          </div>
        )}
        {isError && (
          <div className="flex items-center h-24">
            <p className="m-auto mb-8 text-center text-gray-medium">
              <IconExclamationCircle className="mb-4 fill-green-light" />
              <br />
              {t('localInfo.error')}
            </p>
          </div>
        )}

        {!isLoading && !isError && content && (
          <>
            <ParseHtml
              html={content.field_municipality_info_text?.processed}
              key={`localinfo-text-${content.id}`}
            />

            {content?.field_municipality_info_links && <LocalReadMore />}

            {content?.field_municipality_info_ptv && (
              <PTVBlock items={[content?.field_municipality_info_ptv]} />
            )}

            <p className="mt-8">
              <TextLink className="font-bold" href={path.alias}>
                {t('localInfo.readMore')}
              </TextLink>
            </p>
          </>
        )}
      </div>
    </CSSTransition>
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
