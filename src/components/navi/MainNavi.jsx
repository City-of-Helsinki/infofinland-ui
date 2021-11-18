import { useEffect, useState } from 'react'
import Link from 'next/link'
import cls from 'classnames'
import { useRouter } from 'next/router'
import SubMenu from '@/components/navi/SubMenu'

const getThemeIndexByPathName = ({ mainMenu, path }) => {
  let index

  // const findPageByUrl = (pages, rootIndex) =>
  //   pages.find(({ url, pages }, i) => {
  //     if (url === path) {
  //       index = rootIndex || i
  //       return
  //     } else if (pages) {
  //       findPageByUrl(pages, rootIndex || i)
  //     }
  //   })

  // findPageByUrl(pages)
  return index || 0
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
  <li className={cls(' block relative', {})}>
    {!pages && (
      <Link href={url}>
        <a
          className={cls(
            'block title-body-small ps-8 py-4 border-s-5 hover:bg-gray-white',
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

const MainNavi = ({ mainMenu }) => {
  const { asPath } = useRouter()
  const indexFromRouter = getThemeIndexByPathName({ mainMenu, path: asPath })
  const [openIndex, setVisibility] = useState(indexFromRouter)
  const setOpenIndex = (i) => setVisibility(i === openIndex ? null : i)
  /**
   * Open the correct theme menu when route changes.
   *
   */
  useEffect(() => {
    setVisibility(indexFromRouter)
  }, [asPath, indexFromRouter])

  return (
    <nav className={cls('mb-8  pt-8', {})}>
      <ul className="block">
        {mainMenu.tree.map((props, i) => (
          <TopMenuItem
            key={`link-${props.title}`}
            {...props}
            selected={asPath === props.url}
            isOpen={i === openIndex}
            toggle={() => setOpenIndex(i)}
            selectedIsHidden={
              i === indexFromRouter && openIndex !== i && asPath !== props.ur
            }
          />
        ))}
      </ul>
    </nav>
  )
}

export default MainNavi
