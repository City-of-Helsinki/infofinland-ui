import { useEffect, useState } from 'react'
import Link from 'next/link'
import cls from 'classnames'
import SubMenu from '@/components/navi/SubMenu'
import useLocalizedPath from '@/hooks/useRouterWithLocalizedPath'
const getThemeIndexByPathName = ({ items, path }) => {
  let index
  const findPageIndexByUrl = (items, rootIndex) =>
    items.find(({ url, items }, i) => {
      if (url === path) {
        index = rootIndex || i
        return
      } else if (items) {
        findPageIndexByUrl(items, rootIndex || i)
      }
    })

  findPageIndexByUrl(items)
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

const MainNavi = ({ mainMenu: { tree } }) => {
  const { localePath } = useLocalizedPath()

  const indexFromRouter = getThemeIndexByPathName({
    items: tree,
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
