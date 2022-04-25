import dynamic from 'next/dynamic'
import FooterLinks from '@/components/layout/FooterLinks'
import TopMenu from '@/components/layout/TopMenu'
import ReactModal from 'react-modal'
import useSetLocalization from '@/hooks/useSetLocalization'
import useShowLangMessage from '@/hooks/useShowLangMessage'
import { useRouter } from 'next/router'
import MainMenu from '@/components/navi/MainMenu'
import cls from 'classnames'
import Favicons from './Favicons'
import Menu from '@/components/navi/Menu'

// Layout names from Drupal
export const LAYOUT_BASIC = 'basic'
export const LAYOUT_SMALL = 'small'

const FeedbackBlock = dynamic(
  () => import('@/components/feedback/FeedbackBlock'),
  { ssr: false }
)
const Messages = dynamic(() => import('@/components/messages/Messages'), {
  ssr: false,
})

const CookieConsentBar = dynamic(
  () => import('@/components/layout/CookieConsent'),
  { ssr: false }
)

/**
 * Set ReactModal root element for a18y
 */

if (process.env.NODE_ENV !== 'test') {
  ReactModal.setAppElement('#__next')
}

export const BlankLayout = ({ children }) => {
  useSetLocalization(useRouter().locale)
  return (
    <main className="relative text-body bg-white" id="main">
      <Favicons />
      {children}
    </main>
  )
}

export const SecondaryLayout = ({ children, className, menus }) => {
  const { locale } = useRouter()
  useSetLocalization(locale)
  // useShowLangMessage(locale)

  return (
    <div
      className={cls(
        'relative text-body bg-white ifu-layout--secondary',
        className
      )}
    >
      <Favicons />
      <TopMenu menus={menus} />
      <div className="md:mx-auto lg:max-w-screen-lg xl:max-w-screen-xl 2xl:max-w-screen-2xl">
        <div className=" md:flex md:items-stretch">
          <div className="hidden md:block fixed flex-none self-start w-navi bg-white ifu-mainmenu__desktop">
            <Menu menu={menus.about} />
          </div>
          <div className="hidden md:block flex-none w-navi border-black-op1 border-e-2"></div>
          <div className="ifu-layout__body">
            <main id="main">{children}</main>
            <footer className="ifu-footer" id="footer">
              <FooterLinks secondary tree={menus.footer.tree} />
              <FeedbackBlock />
            </footer>
          </div>
        </div>
      </div>
      <CookieConsentBar />
    </div>
  )
}

const AppLayout = ({ children, className, menus }) => {
  const { locale } = useRouter()
  useSetLocalization(locale)
  useShowLangMessage(locale)

  return (
    <div
      className={cls(
        'relative text-body bg-white ifu-layout--article',
        className
      )}
    >
      <Favicons />
      <TopMenu menus={menus} />
      <div className=" md:flex md:items-stretch">
        <div className="md:hidden">
          <Messages />
        </div>

        <div className="hidden md:block overflow-y-auto overscroll-none fixed flex-none self-start w-navi bg-white ifu-mainmenu__desktop">
          <Messages />
          <MainMenu menus={menus} />
        </div>
        <div className="hidden md:block flex-none w-navi border-black-op1 border-e-2"></div>
        <div className="ifu-layout__body">
          <main id="main">{children}</main>
          <footer className="ifu-footer" id="footer">
            <FooterLinks tree={menus.footer.tree} />
            <FeedbackBlock />
          </footer>
        </div>
      </div>
      <CookieConsentBar />
    </div>
  )
}

export default AppLayout
