import Drawer from './Drawer'
import { useAtom, useAtomValue } from 'jotai'
import {
  selectedCityIdAtom,
  cityMenuVisibilityAtom,
  municipalitiesAtom,
} from '@/src/store'
import { IconCheck } from '@/components/Icons'
import cls from 'classnames'
import { useTranslation } from 'next-i18next'

const CityMenu = () => {
  const { t } = useTranslation('common')
  const [open, setOpen] = useAtom(cityMenuVisibilityAtom)
  const municipalities = useAtomValue(municipalitiesAtom)
  const [cityId, setCity] = useAtom(selectedCityIdAtom)

  const close = () => setOpen(false)
  const chooseCity = ({ target: { value: id } }) => {
    id && id !== cityId && setCity(id)
    close()
  }
  return (
    <Drawer close={close} isOpen={open} left>
      <ul className="mb-16">
        <li className="px-14 mb-4 text-body-large font-bold">
          {t('localInfo.select')}
        </li>

        {municipalities?.map((city) => (
          <li key={`municipality-${city.id}`} className={cls('block', {})}>
            <button
              value={city.id}
              aria-current={cityId === city.id}
              onClick={chooseCity}
              className="
            py-2 px-14 block  text-body-small text-bodytext-color w-full text-left"
            >
              {city.name}
              {cityId === city.id && <IconCheck className="ms-4" />}
            </button>
          </li>
        ))}
      </ul>
    </Drawer>
  )
}

export default CityMenu
