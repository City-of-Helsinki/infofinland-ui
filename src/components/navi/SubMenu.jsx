import { CSSTransition } from 'react-transition-group'
import { IconAngleDown, IconAngleUp } from '../Icons'
import Link from 'next/link'
import cls from 'classnames'
import { useRouter } from 'next/router'

const SubMenuItem = ({ text, url, selected, pages, level, isOpen }) => (
  <li className=" block ">
    <Link passHref href={url}>
      <a
        tabIndex={isOpen ? '0' : '-1'}
        className={cls('block py-4 text-body-small hover:bg-gray-white pe-4 ', {
          'ps-12 ': level === 1,
          'ps-16': level === 2,
          'border-s-5 border-blue  font-bold': selected,
          'border-s-5 border-white ': !selected,
        })}
      >
        {text}
      </a>
    </Link>
    {pages && <SubMenuItems pages={pages} level={level + 1} isOpen={isOpen} />}
  </li>
)

const SubMenuItems = ({ pages, isOpen, level }) => {
  const { asPath } = useRouter()
  return (
    <CSSTransition
      timeout={{ appear: 0, enter: 400, exit: 0 }}
      in={isOpen}
      appear
      unmountOnExit
      mountOnEnter
      classNames={{
        appear: 'ifu-mainmenu__submenu--appear',
        appearActive: 'ifu-mainmenu__submenu--appear-active',
        appearDone: 'ifu-mainmenu__submenu--appear-done',
        enter: 'ifu-mainmenu__submenu--enter',
        enterActive: 'ifu-mainmenu__submenu--enter-active',
        enterDone: 'ifu-mainmenu__submenu--enter-done',
        exit: 'ifu-mainmenu__submenu--exit',
        exitActive: 'ifu-mainmenu__submenu--exit-active',
        exitDone: 'ifu-mainmenu__submenu--exit-done',
      }}
    >
      <ul className="ifu-mainmenu__submenu">
        {pages.map((props, i) => (
          <SubMenuItem
            key={`${props.text}-${i}`}
            {...props}
            level={level}
            selected={props.url === asPath}
            isOpen={isOpen}
          />
        ))}
      </ul>
    </CSSTransition>
  )
}

const SubMenu = ({
  pages,
  text,
  isOpen,
  toggle,
  selected,
  url,
  selectedIsHidden,
}) => (
  <>
    <div
      className={cls(
        'py-4 flex items-center w-full text-body-small ps-8 border-s-5  hover:bg-gray-white',
        {
          'border-white ': !selected && !selectedIsHidden,
          'border-blue': selectedIsHidden || selected,
          'font-bold': selected,
        }
      )}
    >
      <Link passHref href={url}>
        <a className="flex-grow" title={isOpen ? 'Open menu' : 'Close menu'}>
          <span className={cls('block', { 'font-bold': selected })}>
            {text}
          </span>
        </a>
      </Link>
      <div className="flex-none">
        <button
          className="w-14 h-8 text-gray-light me-2 text-start"
          onClick={toggle}
          tabIndex="0"
        >
          {!isOpen && (
            <IconAngleDown className="fill-current ifu-mainmenu__submenu-icon" />
          )}
          {isOpen && (
            <IconAngleUp className="fill-current ifu-mainmenu__submenu-icon" />
          )}
        </button>
      </div>
    </div>
    {pages && <SubMenuItems pages={pages} isOpen={isOpen} level={1} />}
  </>
)

export default SubMenu
