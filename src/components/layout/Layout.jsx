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
import { useRouter } from 'next/router'
import CookieConsentBar from '@/components/layout/CookieConsent'
import MainMenu from '@/components/navi/MainMenu' // { MainNaviError }
import cls from 'classnames'
import { useAtomValue } from 'jotai/utils'
import {
  aboutMenuAtom,
  mainMenuAtom,
  citiesLandingMenuAtom,
  citiesMenuAtom,
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

  const menu = useAtomValue(aboutMenuAtom)
  const { field_description, title } = useAtomValue(nodeAtom)

  return (
    <>
      <CommonHead description={field_description} title={title} />
      <div className=" relative text-body bg-white">
        <TopMenu menu={menu} />
        <div className="md:mx-auto lg:max-w-screen-lg xl:max-w-screen-xl 2xl:max-w-screen-2xl">
          <div className=" md:flex md:items-stretch">
            <div className="hidden md:block fixed flex-none self-start w-navi bg-white ifu-mainmenu__desktop">
              <MainMenu menu={menu} />
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
  const mainMenu = useAtomValue(mainMenuAtom)
  const citiesMenu = useAtomValue(citiesMenuAtom)
  const citiesLandingMenu = useAtomValue(citiesLandingMenuAtom)
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

            <MenuGroup
              menulist={[
                { menu: mainMenu },
                { menu: citiesLandingMenu },
                { menu: citiesMenu, city: selectedCity },
              ]}
            />
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
