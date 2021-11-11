import Link from 'next/link'
// import { useState } from 'react'
import useLangMenuToggle from '@/hooks/useLangMenuToggle'

import MobileNavi from '@/components/navi/MobileNavi'
import LanguageSelector from '@/components/languages/LanguageSelector'
import {
  LanguageMenuButton,
  LangMenuDrawer,
} from '@/components/languages/LanguageMenu'
import CityMenu from '@/components/layout/CityMenu'
import Search from '../search/Search'

const Logo = () => (
  <div
    className="flex-none mx-3 transform translate-y-px md:ms-6 md:me-2"
    role="logo"
  >
    <Link href="/" passHref>
      <a className="ifu-topmenu__logo" title="infofinland.fi"></a>
    </Link>
  </div>
)

const TopMenu = () => {
  const [open, setLangMenuVisibility] = useLangMenuToggle()
  const toggleLangMenu = () => setLangMenuVisibility(!open)
  const closeMenu = () => setLangMenuVisibility(false)

  return (
    <header className="sticky top-0 z-10 xl:justify-center items-center h-topbar md:h-topbarxl bg-white shadow-topbar">
      <div className="flex items-center w-full 3xl:max-w-screen-4xl h-topbar md:h-topbarxl">
        <Logo />
        <div className="flex-grow"></div>
        <LanguageMenuButton onClick={toggleLangMenu} />
        <LanguageSelector openMenu={() => setLangMenuVisibility(true)} />
        <LangMenuDrawer closeMenu={closeMenu} isOpen={open} />
        <Search />
        <MobileNavi />
        <CityMenu />
      </div>
    </header>
  )
}

export default TopMenu
