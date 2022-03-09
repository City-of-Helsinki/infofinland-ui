import { useEffect, useState } from 'react'
import Link from 'next/link'
import cls from 'classnames'
import SubMenu from '@/components/navi/SubMenu'
import useLocalizedPath from '@/hooks/useRouterWithLocalizedPath'
import { findRootForPath, getRootPages } from '@/lib/menu-utils'
import { IconExclamationCircle } from '../Icons'

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
}) => (
  <li
    className={cls('block relative', {
      'border-e-5 border-green-light': secondarySelection && !items,
    })}
  >
    {!items && (
      <Link href={url} prefetch={false}>
        <a
          className={cls(
            'block text-body-small ps-8 py-4 border-s-5 hover:bg-gray-white pe-4',
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

const MainMenu = ({ menu: { items, tree }, useTopBorder, city }) => {
  const { localePath } = useLocalizedPath()
  const indexFromRouter = getThemeIndexByPathName({
    items,
    path: localePath,
  })
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
    <nav className={cls({})}>
      <ul
        className={cls('block', {
          'border-t border-gray-lighter': useTopBorder,
        })}
      >
        {tree.map((props, i) => (
          <TopMenuItem
            key={`link-${props.title}`}
            secondarySelection={city === props.title}
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
export default MainMenu
