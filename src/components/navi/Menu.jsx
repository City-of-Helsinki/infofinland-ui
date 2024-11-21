import { useEffect, useState } from 'react'
import cls from 'classnames'
import SubMenu from '@/components/navi/SubMenu'
import useLocalizedPath from '@/hooks/useRouterWithLocalizedPath'
import { findRootForPath, getRootPages } from '@/lib/menu-utils'
import { IconExclamationCircle } from '../Icons'
import NaviLink from "@/components/navi/NaviLink";

const getThemeIndexByPathName = ({ items, path }) => {
  let index
  const root = findRootForPath({ items, path })
  if (!root) {
    return -1
  }
  const themes = getRootPages(items)
  themes.find(({ url }, i) => {
    if (url === root.url) {
      index = i
      return true
    }
  })
  return index
}

const TopMenuItem = ({
  title,
  url,
  items,
  isOpen,
  toggle,
  selected,
  selectedIsHidden,
  secondarySelection,
}) => {
  return (
    <li
      className={cls('block relative ifu-mainmenu--topitem', {
        'border-e-5 border-green-light': secondarySelection && !items,
      })}
    >
      {!items && (
        <NaviLink
          href={url}
          aria-current={selected ? 'page' : undefined}
          className={cls('ifu-mainmenu__item--link', {
            'font-bold': selected,
            'border-white': !selected,
            'border-blue':
              (selected && (!isOpen || !items)) || selectedIsHidden,
          })}
        >
          {title}
        </NaviLink>
      )}

      {items && (
        <SubMenu
          secondarySelection={secondarySelection}
          url={url}
          items={items}
          title={title}
          isOpen={isOpen}
          toggle={toggle}
          selected={selected}
          selectedIsHidden={selectedIsHidden}
        />
      )}
    </li>
  )
}

const Menu = ({ menu = {}, useTopBorder, city, className }) => {
  const { items, tree } = menu
  const { localePath, locale } = useLocalizedPath()
  const indexFromRouter = getThemeIndexByPathName({
    items,
    path: localePath,
  })

  const [openIndex, setVisibility] = useState(indexFromRouter)
  /**
   * Open the correct theme menu when route changes.
   */
  useEffect(() => {
    setVisibility(indexFromRouter)
  }, [localePath, indexFromRouter])

  if (!items || !tree) {
    return <MainNaviError />
  }
  const setOpenIndex = (i) => setVisibility(i === openIndex ? null : i)
  const toggle = (i) => setOpenIndex(i)
  return (
    <nav className={className}>
      <ul
        className={cls('block', {
          'border-t border-gray-lighter': useTopBorder,
        })}
      >
        {tree.map((props, i) => {
          return (
            <TopMenuItem
              key={`link-${props.id}-${locale}`}
              secondarySelection={city === props.title}
              {...props}
              locale={locale}
              selected={props.url === localePath}
              isOpen={i === openIndex}
              toggle={() => toggle(i)}
              selectedIsHidden={
                i === indexFromRouter &&
                openIndex !== i &&
                localePath !== props.url
              }
            />
          )
        })}
      </ul>
    </nav>
  )
}

export const MainNaviError = () => (
  <>
    <div className="flex relative justify-center items-center h-40 text-neon-red opacity-20 filter grayscale">
      <IconExclamationCircle className="inline-block fill-current" />
    </div>
    <p className="mx-3 text-small text-center text-gray">
      Oops. Could not load main navigation
    </p>
  </>
)
export default Menu
