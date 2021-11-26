import Head from 'next/head'
import DesktopNavi from '@/components/navi/DesktopNavi'
import Messages from '@/components/messages/Messages'
import FooterLinks from '@/components/layout/FooterLinks'
import FeedbackButtonBlock from '@/components/feedback/FeedbackForm'
import TopMenu from '@/components/layout/TopMenu'
import ReactModal from 'react-modal'
import useSetLocalization from '@/hooks/useSetLocalization'
import useShowLangMessage from '@/hooks/useShowLangMessage'
import Router, { useRouter } from 'next/router'
import NProgress from 'nprogress'

if (process.env.NODE_ENV !== 'test') {
  ReactModal.setAppElement('#__next')
}
// Connect Page loader indicator to next/router
NProgress.configure({ showSpinner: false })
Router.events.on('routeChangeStart', () => NProgress.start())
Router.events.on('routeChangeComplete', () => NProgress.done())
Router.events.on('routeChangeError', () => NProgress.done())

export const BlankLayout = ({ children }) => {
  useSetLocalization(useRouter().locale)

  return (
    <>
      <Head>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className="relative text-body bg-white" id="main">
        {children}
      </main>
    </>
  )
}

const AppLayout = ({ children, mainMenu, aboutMenu }) => {
  const { locale } = useRouter()
  useSetLocalization(locale)
  useShowLangMessage(locale)
  return (
    <>
      <Head>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <div className=" relative text-body bg-white">
        <TopMenu mainMenu={mainMenu} />
        <div className=" md:flex md:items-stretch">
          <div className="md:hidden">
            <Messages />
          </div>
          <DesktopNavi mainMenu={mainMenu} />
          <div className="ifu-layout__body">
            <main id="main">{children}</main>
            <footer className="ifu-footer" id="footer">
              <FooterLinks aboutMenu={aboutMenu} />
              <FeedbackButtonBlock />
            </footer>
          </div>
        </div>
      </div>
    </>
  )
}

export default AppLayout
