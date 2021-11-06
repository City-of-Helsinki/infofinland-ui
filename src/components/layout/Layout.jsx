import Head from 'next/head'
import DesktopNavi from '@/components/navi/DesktopNavi'
import Messages from '@/components/messages/Messages'
import Footer from '@/components/layout/Footer'
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
        <main className=" md:flex md:items-stretch" role="main">
          <div className="md:hidden">
            <Messages />
          </div>
          <DesktopNavi />
          <div className="ifu-layout__body">
            {children}
            <div className="ifu-footer">
              <Footer />
              <FeedbackButtonBlock />
            </div>
          </div>
        </main>
      </div>
    </>
  )
}

export default Layout
