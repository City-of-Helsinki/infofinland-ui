import Head from 'next/head'
import DesktopNavi from '@/components/navi/DesktopNavi'
import Messages from '@/components/messages/Messages'
import FooterLinks from '@/components/layout/Footer'
import FeedbackButtonBlock from '@/components/feedback/FeedbackForm'
import TopMenu from '@/components/layout/TopMenu'
import ReactModal from 'react-modal'
import useSetLocalization from '@/hooks/useSetLocalization'
import Router from 'next/router'
import NProgress from 'nprogress'

if (process.env.NODE_ENV !== 'test') {
  ReactModal.setAppElement('#__next')
}
// Connect Page loader indicator to next/router
NProgress.configure({ showSpinner: false })
Router.events.on('routeChangeStart', () => NProgress.start())
Router.events.on('routeChangeComplete', () => NProgress.done())
Router.events.on('routeChangeError', () => NProgress.done())

const Layout = ({ children }) => {
  useSetLocalization()

  return (
    <>
      <Head>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div className=" relative text-body bg-white">
        <TopMenu />
        <div className=" md:flex md:items-stretch" role="main">
          <div className="md:hidden">
            <Messages />
          </div>
          <DesktopNavi />
          <div className="ifu-layout__body">
            <main id="main">{children}</main>
            <footer className="ifu-footer" id="footer">
              <FooterLinks />
              <FeedbackButtonBlock />
            </footer>
          </div>
        </div>
      </div>
    </>
  )
}

export default Layout
