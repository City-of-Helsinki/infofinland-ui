import Head from 'next/head'
import PreloadFonts from './PreloadFonts'
import Favicons from './Favicons'
import Messages from '@/components/messages/Messages'
import FooterLinks from '@/components/layout/FooterLinks'
import FeedbackButtonBlock from '@/components/feedback/FeedbackForm'
import TopMenu from '@/components/layout/TopMenu'
import ReactModal from 'react-modal'
import useSetLocalization from '@/hooks/useSetLocalization'
import useShowLangMessage from '@/hooks/useShowLangMessage'
import Router, { useRouter } from 'next/router'
import NProgress from 'nprogress'
import CookieConsentBar from '@/components/layout/CookieConsent'
import MainMenu, { MainNaviError } from '@/components/navi/MainMenu'
import cls from 'classnames'
import { useAtomValue } from 'jotai/utils'
import {
  aboutMenuAtom,
  menusAtom,
  nodeAtom,
  selectedCityAtom,
} from '@/src/store'
import MenuGroup from '../navi/MenuGroup'
export const FALLBACK_TITLE = 'infofinland.fi'
/**
 *
 * Site component configuration
 */

/**
 * Set ReactModal root element for a18y
 */

if (process.env.NODE_ENV !== 'test') {
  ReactModal.setAppElement('#__next')
}
/**
 * Subscribe NProgress loader bar to Router events
 *
 */
NProgress.configure({ showSpinner: false })
Router.events.on('routeChangeStart', () => NProgress.start())
Router.events.on('routeChangeComplete', () => NProgress.done())
Router.events.on('routeChangeError', () => NProgress.done())

const CommonHead = ({ title = FALLBACK_TITLE, description = '', children }) => (
  <Head>
    {title && <title>{title}</title>}
    {description && <meta name="description" content={description} />}
    <meta name="viewport" content="width=device-width, initial-scale=1" />
    <PreloadFonts />
    <Favicons />
    {children}
  </Head>
)

export const BlankLayout = ({ children, title, description }) => {
  useSetLocalization(useRouter().locale)

  return (
    <>
      <CommonHead title={title} description={description} />
      <main className="relative text-body bg-white" id="main">
        {children}
      </main>
      <CookieConsentBar />
    </>
  )
}

export const SecondaryLayout = ({ children }) => {
  const { locale } = useRouter()
  useSetLocalization(locale)
  useShowLangMessage(locale)
  const node = useAtomValue(nodeAtom)
  const menu = useAtomValue(aboutMenuAtom)

  return (
    <>
      <CommonHead description={node?.field_description} title={node?.title} />
      <div className=" relative text-body bg-white">
        <TopMenu menu={menu} />
        <div className="md:mx-auto lg:max-w-screen-lg xl:max-w-screen-xl 2xl:max-w-screen-2xl">
          <div className=" md:flex md:items-stretch">
            <div className="hidden md:block fixed flex-none self-start w-navi bg-white ifu-mainmenu__desktop">
              {menu?.error ? <MainNaviError /> : <MainMenu menu={menu} />}
            </div>
            <div className="hidden md:block flex-none w-navi border-black-op1 border-e-2"></div>
            <div className="ifu-layout__body">
              <main id="main">{children}</main>
              <footer className="ifu-footer" id="footer">
                <FooterLinks secondary />
                <FeedbackButtonBlock />
              </footer>
            </div>
          </div>
        </div>
        <CookieConsentBar />
      </div>
    </>
  )
}

const AppLayout = ({ children, className }) => {
  const { locale } = useRouter()
  useSetLocalization(locale)
  useShowLangMessage(locale)
  const node = useAtomValue(nodeAtom)
  const menus = useAtomValue(menusAtom)
  const selectedCity = useAtomValue(selectedCityAtom)

  return (
    <>
      <CommonHead description={node?.field_description} title={node?.title} />

      <div
        className={cls('relative text-body bg-white', className)}
        id={`node-${node?.id}`}
      >
        <TopMenu />
        <div className=" md:flex md:items-stretch">
          <div className="md:hidden">
            <Messages />
          </div>

          <div className="hidden md:block overflow-y-auto fixed flex-none self-start w-navi bg-white ifu-mainmenu__desktop">
            <Messages />
            {menus.mainMenu.error ? (
              <MainNaviError />
            ) : (
              <MenuGroup
                menulist={[
                  { menu: menus.mainMenu },
                  { menu: menus.citiesLandingMenu },
                  { menu: menus.citiesMenu, city: selectedCity },
                ]}
              />
            )}
          </div>
          <div className="hidden md:block flex-none w-navi border-black-op1 border-e-2"></div>
          <div className="ifu-layout__body">
            <main id="main">{children}</main>
            <footer className="ifu-footer" id="footer">
              <FooterLinks />
              <FeedbackButtonBlock />
            </footer>
          </div>
        </div>
        <CookieConsentBar />
      </div>
    </>
  )
}

export default AppLayout
