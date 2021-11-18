import { useEffect, useState } from 'react'
import Link from 'next/link'
import cls from 'classnames'
import { useRouter } from 'next/router'
import SubMenu from '@/components/navi/SubMenu'

const getThemeIndexByPathName = ({ items, path }) => {
  let index
console.log(path);
  const findPageByUrl = (items, rootIndex) =>
    items.find(({ url, items }, i) => {
      if (url === path) {
        index = rootIndex || i
        return
      } else if (items) {
        findPageByUrl(items, rootIndex || i)
      }
    })

  findPageByUrl(items)
  return index
}

const TopMenuItem = ({
  title,
  url,
  pages,
  isOpen,
  toggle,
  selected,
  selectedIsHidden,
}) => (
  <li className={cls('block relative', {})}>
    {!pages && (
      <Link href={url}>
        <a
          className={cls(
            'block text-body-small ps-8 py-4 border-s-5 hover:bg-gray-white',
            {
              'font-bold': selected,
              'border-white': !selected,
              'border-blue':
                (selected && (!isOpen || !pages)) || selectedIsHidden,
            }
          )}
        >
          {title}
        </a>
      </Link>
    )}

    {pages && (
      <SubMenu
        url={url}
        pages={pages}
        title={title}
        isOpen={isOpen}
        toggle={toggle}
        selected={selected}
        selectedIsHidden={selectedIsHidden}
      />
    )}
  </li>
)

const MainNavi = ({ mainMenu :{tree}}) => {
  const router = useRouter()
  console.log(router);
  const { asPath,locale } = router
  const localePath = `/${locale}${asPath}`
  const indexFromRouter = getThemeIndexByPathName({items: tree, path: localePath })
  console.log(indexFromRouter)
  const [openIndex, setVisibility] = useState(indexFromRouter)
  const setOpenIndex = (i) => setVisibility(i === openIndex ? null : i)
  /**
   * Open the correct theme menu when route changes.
   *
   */
  useEffect(() => {
    setVisibility(indexFromRouter)
  }, [asPath,locale, indexFromRouter])

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
              i === indexFromRouter && openIndex !== i && localePath !== props.ur
            }
          />
        ))}
      </ul>
    </nav>
  )
}

export default MainNavi
