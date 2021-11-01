import Link from 'next/link'
// import { useState } from 'react'
import useLangMenuToggle from '../../hooks/useLangMenuToggle'
import useTranslation from 'next-translate/useTranslation'

import { IconLookingGlass } from '../Icons'
import MobileNavi from '../navi/MobileNavi'
import LanguageSelector from '../languages/LanguageSelector'
import { LanguageMenuButton, LangMenuDrawer } from '../languages/LanguageMenu'
import CityMenu from './CityMenu'
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

const Search = () => {
  const { t } = useTranslation('common')

  return (
    <div className=" flex-none 2xl:flex-grow">
      <button
        className=" w-8 md:w-24 h-8 text-action"
        title={t('buttons.search')}
      >
        <span className="px-2 transform translate-y-0.5">
          <IconLookingGlass className="" />
        </span>

        <span className="hidden md:inline-block">{t('buttons.search')}</span>
      </button>
    </div>
  )
}

const TopMenu = () => {
  const [open, setLangMenuVisibility] = useLangMenuToggle()
  const toggleLangMenu = () => setLangMenuVisibility(!open)
  const closeMenu = () => setLangMenuVisibility(false)

  return (
    <div className="sticky top-0 z-10 xl:justify-center items-center h-topbar md:h-topbarxl bg-white shadow-topbar">
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
    </div>
  )
}

export default TopMenu
