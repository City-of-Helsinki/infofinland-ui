import { useState, useEffect } from 'react'
import { MainNaviError } from '@/components/navi/MainMenu'
import MenuGroup from './MenuGroup'
import { IconMenu } from '@/components/Icons'
import Drawer from '@/components/layout/Drawer'
import { useRouter } from 'next/router'

import { useTranslation } from 'next-i18next'
import { useAtomValue } from 'jotai/utils'
import { menusAtom, selectedCityAtom } from '@/src/store'

const MobileNavi = () => {
  const [isOpen, setVisibility] = useState(false)
  const open = () => setVisibility(true)
  const close = () => setVisibility(false)
  const router = useRouter()
  const { t } = useTranslation('common')
  const selectedCity = useAtomValue(selectedCityAtom)
  const menus = useAtomValue(menusAtom)

  /*
  Ensure that mobile navi dialog is always closed when
   route has changes.
   rendering effect is better than closing menu item
   on click event as the menu closes only after
   the route has changed.
  */

  useEffect(() => {
    router.events.on('routeChangeComplete', close)
    router.events.on('routeChangeError', close)

    return () => {
      router.events.off('routeChangeComplete', close)
      router.events.off('routeChangeError', close)
    }
  }, [router])
  if (menus.mainMenu.error) {
    return (
      <span className="md:hidden">
        <MainNaviError />
      </span>
    )
  }
  return (
    <>
      <div className="md:hidden md:mx-6 me-6 ms-2">
        {!isOpen && (
          <button
            aria-haspopup="dialog"
            onClick={open}
            title={t('mainMenu.button')}
            className="z-50"
            autoFocus={!isOpen}
          >
            <IconMenu />
          </button>
        )}
      </div>

      <Drawer close={close} isOpen={isOpen}>
        <div className="bg-white">
          <MenuGroup
            menulist={[
              { menu: menus.mainMenu },
              { menu: menus.citiesLandingMenu },
              { menu: menus.citiesMenu, city: selectedCity },
            ]}
          />
        </div>
      </Drawer>
    </>
  )
}

export default MobileNavi
