import { useEffect, useState } from 'react'
import Link from 'next/link'
import cls from 'classnames'
import SubMenu from '@/components/navi/SubMenu'
import useLocalizedPath from '@/hooks/useRouterWithLocalizedPath'
import { findPageByPath, findRootForPath, getThemes } from '@/lib/menu-utils'

const getThemeIndexByPathName = ({ items, path }) => {
  let index
  const root = findRootForPath({ items, path })
  const themes = getThemes({ items })
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
}) => (
  <li className={cls('block relative', {})}>
    {!items && (
      <Link href={url}>
        <a
          className={cls(
            'block text-body-small ps-8 py-4 border-s-5 hover:bg-gray-white',
            {
              'font-bold': selected,
              'border-white': !selected,
              'border-blue':
                (selected && (!isOpen || !items)) || selectedIsHidden,
            }
          )}
        >
          {title}
        </a>
      </Link>
    )}

    {items && (
      <SubMenu
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

const MainNavi = ({ mainMenu: { items, tree } }) => {
  const { localePath } = useLocalizedPath()
  let indexFromRouter = -1
  const page = findPageByPath({ items, localePath })
  if (page) {
    indexFromRouter = getThemeIndexByPathName({
      items,
      path: localePath,
    })
  }
  const [openIndex, setVisibility] = useState(indexFromRouter)
  const setOpenIndex = (i) => setVisibility(i === openIndex ? null : i)
  /**
   * Open the correct theme menu when route changes.
   *
   */
  useEffect(() => {
    setVisibility(indexFromRouter)
  }, [localePath, indexFromRouter])

  return (
    <nav className={cls('mb-8  pt-8', {})}>
      <ul className="block">
        {tree.map((props, i) => (
          <TopMenuItem
            key={`link-${props.title}`}
            {...props}
            selected={localePath === props.url}
            isOpen={i === openIndex}
            toggle={() => setOpenIndex(i)}
            selectedIsHidden={
              i === indexFromRouter &&
              openIndex !== i &&
              localePath !== props.url
            }
          />
        ))}
      </ul>
    </nav>
  )
}

export default MainNavi
