import { useState, useEffect } from 'react'
import { IconMenu, IconAngleRight } from '@/components/Icons'
import Drawer from '@/components/layout/Drawer'
import { useRouter } from 'next/router'
import Link from 'next/link'
import { useAtomValue } from 'jotai/utils'

import { useTranslation } from 'next-i18next'
import { isAboutPageAtom } from '@/src/store'
import MainMenu from './MainMenu'
import AboutMenu from '../layout/AboutMenu'

const MobileNavi = () => {
  const [isOpen, setVisibility] = useState(false)
  const open = () => setVisibility(true)
  const close = () => setVisibility(false)
  const router = useRouter()
  const { t } = useTranslation('common')
  const { locale } = useRouter()
  const isAboutPage = useAtomValue(isAboutPageAtom)

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
          {isAboutPage && (
            <Link href="/" locale={locale}>
              <a className="flex items-center mt-4 mb-1 font-bold ms-2">
                <IconAngleRight className="scale-150 rotate-180 ms-4 me-2" />
                {t('breadcrumbs.frontpage')}
              </a>
            </Link>
          )}
          {isAboutPage === true ? <AboutMenu /> : <MainMenu />}
        </div>
      </Drawer>
    </>
  )
}

export default MobileNavi
