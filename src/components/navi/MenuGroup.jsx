import Menu from './Menu'

const MenuGroup = ({ menulist }) => {
  const l = menulist.length
  return menulist.map((menu, i) => {
    return (
      <Menu
        {...menu}
        key={`mainmenu-${i}`}
        useTopBorder={i > 0}
        className={i + 1 === l ? 'mb-52 pb-52' : ''}
      />
    )
  })
}

export default MenuGroup
