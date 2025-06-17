import { IconMapMarker } from '@/components/Icons'
import { useAtomValue, useSetAtom, useAtom } from 'jotai'
import SWRContent from './LocalInformationSWR'
import {
  selectedCityIdAtom,
  selectedCityNameAtom,
  cityMenuVisibilityAtom,
} from '@/src/store'
import Block from '@/components/layout/Block'
import { IconAngleDown } from '@/components/Icons'
import { useTranslation } from 'next-i18next'
import { useRouter } from 'next/router'
const CITY_BUTTON_ID = 'ifu-localinfo__button'
const LocalInformation = ({ cities = [] }) => {
  const { t } = useTranslation('common')
  const [selectedCityId, setCity] = useAtom(selectedCityIdAtom)
  const selectedCityName = useAtomValue(selectedCityNameAtom)
  const setOpen = useSetAtom(cityMenuVisibilityAtom)
  const openMenu = () => setOpen(true)
  const clearCity = () => setCity(null)
  const { locale } = useRouter()
  const city = cities.find(({ field_municipality }) => {
    return field_municipality?.id === selectedCityId
  })

  const isOpen = !!selectedCityId && !!city

  return (
    <div className="mb-8">
      <Block className="flex items-center h-14 lg:h-16 bg-green-lighter lg:rounded-t">
        <h3 className="md:flex-grow text-body font-bold -translate-x-4">
          <IconMapMarker className="h-7 me-2" />
          {t('localInfo.title')}
        </h3>
      </Block>
      <Block className="py-8 mb-4 bg-green-white">
        <div className="flex">
          <button
            id={CITY_BUTTON_ID}
            className="inline-block flex-none text-body-large font-bold"
            onClick={openMenu}
          >
            <span className="underline">
              {!selectedCityName && t('localInfo.select')}
              {selectedCityName && selectedCityName}
            </span>
            <IconAngleDown className="w-3 h-3 fill-black ms-2" />
          </button>
          <div className="flex-grow"></div>
          {selectedCityName && (
            <button
              className="inline-block flex-none text-body"
              onClick={clearCity}
            >
              {t('localInfo.clear')}
            </button>
          )}
        </div>
        {!selectedCityName && (
          <p className="mt-2">
            <label htmlFor={CITY_BUTTON_ID}>{t('localInfo.help')}</label>
          </p>
        )}
        {!city && selectedCityName && (
          <p className="mt-2">{t('localInfo.noInfo')}</p>
        )}
        <SWRContent isOpen={isOpen} city={city} />
        {/* SEO Listing */}
        <ul className="overflow-hidden absolute w-0 h-0 ifu-localinfo__seo">
          {cities.map(({ field_municipality, field_municipality_page_url }) => {
            if (!field_municipality_page_url) {
              return null
            }
            return (
              <li
                key={`readmore-${field_municipality?.name}-${field_municipality_page_url}`}
              >
                <a href={`/${locale}${field_municipality_page_url}`}>
                  {field_municipality?.name}
                </a>
              </li>
            )
          })}
        </ul>
      </Block>
    </div>
  )
}

export default LocalInformation
