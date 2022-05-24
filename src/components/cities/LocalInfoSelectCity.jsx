import { selectedCityIdAtom, selectedCityNameAtom } from '@/src/store'
import Block from '@/components/layout/Block'
import cls from 'classnames'
import { IconMapMarker, IconCross } from '@/components/Icons'
import { useTranslation } from 'next-i18next'
import { useAtomValue, useUpdateAtom } from 'jotai/utils'

const LocalInformationSelectCity = ({ id: pageCityId, name: pageCityName }) => {
  const setCity = useUpdateAtom(selectedCityIdAtom)
  const selectedCityName = useAtomValue(selectedCityNameAtom)

  const { t } = useTranslation('common')
  const clearCity = () => setCity(null)
  const selectCurrentCity = () => setCity(pageCityId)

  return (
    <div className="mb-8">
      <Block
        className={cls('py-2 bg-green-lighter min-h-14 lg:min-h-16 ', {
          'lg:rounded-t': !selectedCityName,
          'lg:rounded': !!selectedCityName,
        })}
      >
        <div className="flex items-center w-full">
          <IconMapMarker className="inline-block h-6 -translate-x-3 lg:-translate-x-4 me-2" />

          <h3 className="flex-grow text-body font-bold -translate-x-4">
            {!selectedCityName && t('localInfo.title')}
            {selectedCityName &&
              t('localInfo.selected_city', { city: selectedCityName })}
          </h3>
          {selectedCityName && (
            <button
              title={t('localInfo.clear')}
              className="flex flex-none items-center text-body"
              onClick={clearCity}
            >
              <IconCross className="w-6" />
            </button>
          )}
        </div>
      </Block>

      {!selectedCityName && (
        <Block className="py-8 mb-4 bg-green-white">
          <p className="mb-8">{t('localInfo.help_current_city')}</p>
          <div className="flex">
            <button
              className="inline-block flex-none text-body-large font-bold"
              onClick={selectCurrentCity}
            >
              <span className="underline">
                {!selectedCityName &&
                  t('localInfo.select_current', { city: pageCityName })}
                {selectedCityName &&
                  t('localInfo.selected_city', { city: pageCityName })}
              </span>
            </button>
            <div className="flex-grow"></div>
            {selectedCityName && (
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
