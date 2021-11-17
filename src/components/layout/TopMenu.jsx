import Link from 'next/link'
import useTranslation from 'next-translate/useTranslation'
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
    className="relative z-20 flex-none py-3 md:py-4 px-3 bg-white transform translate-y-px md:ps-6 md:pe-2"
    role="logo"
  >
    <Link href="/" passHref>
      <a className=" ifu-topmenu__logo" title="infofinland.fi"></a>
    </Link>
  </div>
)

const TopMenu = () => {
  const [open, setLangMenuVisibility] = useLangMenuToggle()
  const toggleLangMenu = () => setLangMenuVisibility(!open)
  const closeMenu = () => setLangMenuVisibility(false)
  const { t } = useTranslation('common')
  return (
    <header className="sticky top-0 z-20 xl:justify-center items-center h-topbar md:h-topbarxl bg-white shadow-topbar">
      <div className="flex items-center w-full 3xl:max-w-topbar h-topbar md:h-topbarxl">
        <Logo />
        <a className="ifu-topmenu__skiplink" href="#main">
          {t('buttons.skipTo')}
        </a>
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
