import { useAtomValue } from 'jotai/utils'

import {
  mainMenuAtom,
  citiesLandingMenuAtom,
  citiesMenuAtom,
  selectedCityAtom,
} from '@/src/store'

import MenuGroup from './MenuGroup'

const MainMenu = () => {
  const mainMenu = useAtomValue(mainMenuAtom)
  const citiesMenu = useAtomValue(citiesMenuAtom)
  const citiesLandingMenu = useAtomValue(citiesLandingMenuAtom)
  const selectedCity = useAtomValue(selectedCityAtom)

  return (
    <MenuGroup
      menulist={[
        { menu: mainMenu },
        { menu: citiesLandingMenu },
        { menu: citiesMenu, city: selectedCity },
      ]}
    />
  )
}

export default MainMenu
