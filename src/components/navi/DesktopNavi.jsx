import { PAGES } from '../MOCK_PAGES'
import MainNavi from './MainNavi'
import Messages from '../messages/Messages'

const DesktopNavi = () => {
  return (
    <>
      <div className="hidden md:block overflow-y-auto fixed flex-none self-start w-navi bg-white ifu-mainmenu__desktop">
        <Messages />
        <MainNavi pages={PAGES} />
      </div>
      <div className="hidden md:block flex-none w-navi border-black-op1 border-e-2"></div>
    </>
  )
}

export default DesktopNavi
