import Head from 'next/head'
import DesktopNavi from '../navi/DesktopNavi'
import Messages from '../messages/Messages'
import Footer from './Footer'
import FeedbackButtonBlock from '../feedback/FeedbackForm'
import TopMenu from './TopMenu'
import ReactModal from 'react-modal'
import useSetLocalization from '../../hooks/useSetLocalization'
ReactModal.setAppElement('#__next')

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
