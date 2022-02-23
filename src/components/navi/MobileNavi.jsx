import { useState, useEffect } from 'react'
// import { MainNaviError } from '@/components/navi/MainMenu'
import MenuGroup from './MenuGroup'
import { IconMenu } from '@/components/Icons'
import Drawer from '@/components/layout/Drawer'
import { useRouter } from 'next/router'

import { useTranslation } from 'next-i18next'

const MobileNavi = ({
  citiesLandingMenu,
  citiesMenu,
  mainMenu,
  aboutMenu,
  selectedCity,
}) => {
  const [isOpen, setVisibility] = useState(false)
  const open = () => setVisibility(true)
  const close = () => setVisibility(false)
  const router = useRouter()
  const { t } = useTranslation('common')

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
  // if (menus.mainMenu.error) {
  //   return (
  //     <span className="md:hidden">
  //       <MainNaviError />
  //     </span>
  //   )
  // }
  const menulist = []

  if (aboutMenu) {
    menulist.push({ menu: aboutMenu })
  } else {
    menulist.push({ menu: mainMenu })
  }

  if (citiesLandingMenu) {
    menulist.push({ menu: citiesLandingMenu })
  }

  if (citiesMenu) {
    menulist.push({ menu: citiesMenu, city: selectedCity })
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
          <MenuGroup menulist={menulist} />
        </div>
      </Drawer>
    </>
  )
}

export default MobileNavi
