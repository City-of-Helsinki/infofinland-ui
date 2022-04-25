import MenuGroup from './MenuGroup'

const MainMenu = ({ menus }) => {
  return (
    <MenuGroup
      menulist={[
        { menu: menus.main },
        { menu: menus['cities-landing'] },
        {
          menu: menus.cities,
          //  city: selectedCity
        },
      ]}
    />
  )
}

export default MainMenu
