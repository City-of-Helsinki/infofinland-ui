import { useTranslation } from 'next-i18next'
import useLangMenuToggle from '@/hooks/useLangMenuToggle'
import MobileNavi from '@/components/navi/MobileNavi'
import LanguageSelector from '@/components/layout/languages/LanguageSelector'
import {
  LanguageMenuButton,
  LangMenuDrawer,
} from '@/components/layout/languages/LanguageMenu'
// import CityMenu from '@/components/layout/CityMenu'
import TopSearch from '../search/TopSearch'
import cls from 'classnames'
import { useAtomValue } from 'jotai'
import { pageIsLoadingAtom } from '@/src/store'
import { useRouter } from 'next/router'
import dynamic from 'next/dynamic'

const CityMenu = dynamic(() => import('@/components/layout/CityMenu'), {
  ssr: false,
})

const Logo = () => {
  const { locale } = useRouter()
  const { t } = useTranslation('common')
  const pageIsLoading = useAtomValue(pageIsLoadingAtom)
  return (
    <div
      className="relative z-20 flex-none py-3 md:py-4 px-3 bg-white transform translate-y-px md:ps-6 md:pe-2"
      role="banner"
    >
      <a
        href={`/${locale}`}
        className={cls('ifu-topmenu__logo', {
          'ifu-topmenu__logo--loading': pageIsLoading,
        })}
        title={t('breadcrumbs.frontpage')}
      >
        {pageIsLoading && (
          <span className=" hidden lg:inline-block relative -translate-x-1 -translate-y-5">
            <span className="absolute left-20 w-1 h-1 bg-red rounded animate-ping"></span>
            <span className="absolute left-24 w-1 h-1 bg-blue rounded animate-ping"></span>
            <span className="absolute left-28 w-1 h-1 bg-green rounded animate-ping"></span>
            <span className="absolute left-32 w-1 h-1 bg-orange rounded animate-ping"></span>
          </span>
        )}
      </a>
    </div>
  )
}

const TopMenu = ({ menus }) => {
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
        <div className="2xl:flex-none xl:flex-grow"></div>
        <div className="flex items-center">
          <TopSearch />
          <MobileNavi menus={menus} />
        </div>
        <CityMenu />
      </div>
    </header>
  )
}

export default TopMenu
