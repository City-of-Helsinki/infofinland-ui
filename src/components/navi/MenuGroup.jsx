import MainMenu from './MainMenu'

const MenuGroup = ({ menulist }) => {
  return menulist.map((menu, i) => {
    return <MainMenu {...menu} key={`mainmenu-${i}`} useTopBorder={i > 0} />
  })
}

export default MenuGroup
