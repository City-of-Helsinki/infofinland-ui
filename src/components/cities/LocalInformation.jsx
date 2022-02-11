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
import { IconAngleDown } from '@/components/Icons'
import { useTranslation } from 'next-i18next'
import { CSSTransition } from 'react-transition-group'
import useSWR from 'swr'
import { getLinks } from '@/lib/ssr-api'
import TextLink from '../TextLink'
import { DotsLoader } from '../Loaders'
import { IconExclamationCircle } from '../Icons'
import { ContactInfoFields } from '../article/PTVBlock'
import { ExternalLinkCollection } from '../article/ReadMoreBlock'
import useRouterWithLocalizedPath from '@/hooks/useRouterWithLocalizedPath'
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
  const { locale } = useRouterWithLocalizedPath()
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

            {content?.field_municipality_info_link && (
              <LocalReadMore
                content={getLinks({
                  collection: [content?.field_municipality_info_link],
                  locale,
                })}
              />
            )}

            {content?.field_municipality_info_ptv && (
              <ContactInfoFields {...content?.field_municipality_info_ptv} />
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

const LocalReadMore = ({ content = [], locale }) => {
  console.log({ content })
  return (
    <div className="px-4 my-8 bg-white rounded">
      <ExternalLinkCollection content={content} locale={locale} />
    </div>
  )
}

export default LocalInformation
