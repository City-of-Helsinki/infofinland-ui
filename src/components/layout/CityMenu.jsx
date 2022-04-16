import Drawer from './Drawer'
import { useAtom } from 'jotai'
import { selectedCityAtom, cityMenuVisibilityAtom } from '@/src/store'
import { IconCheck } from '@/components/Icons'
import cls from 'classnames'
import { useTranslation } from 'next-i18next'
import useSWR from 'swr'
import { useRouter } from 'next/router'
import { getMunicipalities } from '@/lib/client-api'
import times from 'lodash/times'

const Loader = () =>
  times(12, (i) => (
    <li className="block px-14 h-10">
      <span
        className=" block h-5 bg-gray-white rounded animate-pulse"
        key={`city-loader-${i}`}
      ></span>
    </li>
  ))

const CityMenu = () => {
  const { t } = useTranslation('common')
  const [open, setOpen] = useAtom(cityMenuVisibilityAtom)
  const [city, setCity] = useAtom(selectedCityAtom)
  const { locale } = useRouter()
  const { data, error, isValidating } = useSWR(
    `/municipalities/${locale}`,
    () => getMunicipalities(locale)
  )

  const close = () => setOpen(false)
  const chooseCity = ({ target: { value } }) => {
    value && value !== city && setCity(value)
    close()
  }
  return (
    <Drawer close={close} isOpen={open} left>
      <ul className="mb-16">
        <li className="px-14 mb-4 text-body-large font-bold">
          {t('localInfo.select')}
        </li>
        {error && !isValidating && (
          <li className="block px-14 h-10">{t('cities.error')}</li>
        )}
        {isValidating && !data && <Loader />}
        {!isValidating &&
          data?.map(({ name: cityName, id }) => (
            <li key={`municipality-${id}`} className={cls('block', {})}>
              <button
                value={cityName}
                aria-current={city === cityName}
                onClick={chooseCity}
                className="
            py-2 px-14 block  text-body-small text-bodytext-color w-full text-left"
              >
                {cityName}
                {city === cityName && <IconCheck className="ms-4" />}
              </button>
            </li>
          ))}
      </ul>
    </Drawer>
  )
}

export default CityMenu
