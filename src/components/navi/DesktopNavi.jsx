import MainNavi, { MainNaviError } from '@/components/navi/MainNavi'
import Messages from '@/components/messages/Messages'

const DesktopNavi = ({ mainMenu }) => {
  if (mainMenu.error) {
    return <MainNaviError />
  }
  return (
    <>
      <div className="hidden md:block overflow-y-auto fixed flex-none self-start w-navi bg-white ifu-mainmenu__desktop">
        <Messages />
        <MainNavi mainMenu={mainMenu} />
      </div>
      <div className="hidden md:block flex-none w-navi border-black-op1 border-e-2"></div>
    </>
  )
}

export default DesktopNavi
