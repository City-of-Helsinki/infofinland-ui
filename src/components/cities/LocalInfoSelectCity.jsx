import { useAtom } from 'jotai'
import { selectedCityAtom } from '@/src/store'
import Block from '@/components/layout/Block'
import cls from 'classnames'
import { IconMapMarker, IconCross } from '@/components/Icons'
import { useTranslation } from 'next-i18next'

const LocalInformationSelectCity = ({ city }) => {
  const [selectedCity, setCity] = useAtom(selectedCityAtom)
  const { t } = useTranslation('common')
  const clearCity = () => setCity(null)
  const selectCurrentCity = () => setCity(city)

  return (
    <div className="mb-8">
      <Block
        className={cls('py-2 bg-green-lighter min-h-14 lg:min-h-16 ', {
          'lg:rounded-t': !selectedCity,
          'lg:rounded': !!selectedCity,
        })}
      >
        <div className="flex items-center w-full">
          <IconMapMarker className="inline-block h-6 -translate-x-3 lg:-translate-x-4 me-2" />

          <h3 className="flex-grow text-body font-bold -translate-x-4">
            {!selectedCity && t('localInfo.title')}
            {selectedCity &&
              t('localInfo.selected_city', { city: selectedCity })}
          </h3>
          {selectedCity && (
            <button
              title={t('localInfo.clear')}
              className="flex flex-none items-center text-body"
              onClick={clearCity}
            >
              <IconCross className="w-6" />
            </button>
          )}
        </div>

        {selectedCity !== city && selectedCity !== null && (
          <p className="pt-2 mt-3 border-t border-green-light">
            <button
              className=" inline-block flex-none mb-2 text-body font-bold underline ms-8"
              onClick={selectCurrentCity}
            >
              {t('localInfo.select_current', { city })}
            </button>
          </p>
        )}
      </Block>
      {!selectedCity && (
        <Block className="py-8 mb-4 bg-green-white">
          <p className="mb-8">{t('localInfo.help_current_city')}</p>
          <div className="flex">
            <button
              className="inline-block flex-none text-body-large font-bold"
              onClick={selectCurrentCity}
            >
              <span className="underline">
                {!selectedCity && t('localInfo.select_current', { city })}
                {selectedCity && t('localInfo.selected_city', { city })}
              </span>
            </button>
            <div className="flex-grow"></div>
            {selectedCity && (
              <button
                className="inline-block flex-none text-body"
                onClick={clearCity}
              >
                <IconCross className="w-6" />
              </button>
            )}
          </div>
        </Block>
      )}
    </div>
  )
}

export default LocalInformationSelectCity
