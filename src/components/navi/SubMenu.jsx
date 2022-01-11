import { CSSTransition } from 'react-transition-group'
import { IconAngleDown, IconAngleUp } from '@/components/Icons'
import Link from 'next/link'
import cls from 'classnames'
import useLocalizedPath from '@/hooks/useRouterWithLocalizedPath'

const SubMenuItem = ({ title, url, selected, items, level, isOpen }) => (
  <li className=" block">
    <Link passHref href={url} prefetch={false}>
      <a
        tabIndex={isOpen ? '0' : '-1'}
        className={cls('block py-3 text-body-small hover:bg-gray-white pe-4 ', {
          'ps-12 ': level === 1,
          'ps-16': level === 2,
          'border-s-5 border-blue  font-bold': selected,
          'border-s-5 border-white ': !selected,
        })}
      >
        {title}
      </a>
    </Link>
    {items && <SubMenuItems items={items} level={level + 1} isOpen={isOpen} />}
  </li>
)

const SubMenuItems = ({ items, isOpen, level }) => {
  const { localePath } = useLocalizedPath()

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
        {items.map((props, i) => (
          <SubMenuItem
            key={`${props.title}-${i}`}
            {...props}
            level={level}
            selected={props.url === localePath}
            isOpen={isOpen}
          />
        ))}
      </ul>
    </CSSTransition>
  )
}

const SubMenu = ({
  items,
  title,
  isOpen,
  toggle,
  selected,
  url,
  selectedIsHidden,
}) => (
  <>
    <div
      className={cls(
        'flex items-center w-full text-body-small ps-8 border-s-5  hover:bg-gray-white',
        {
          'border-white ': !selected && !selectedIsHidden,
          'border-blue': selectedIsHidden || selected,
          'font-bold': selected,
        }
      )}
    >
      <Link passHref href={url} prefetch={false}>
        <a
          className="flex-grow py-4"
          title={isOpen ? 'Open menu' : 'Close menu'}
        >
          <span className={cls('block', { 'font-bold': selected })}>
            {title}
          </span>
        </a>
      </Link>
      <div className="flex-none">
        <button
          className="block w-14 h-12 me-2 title-start"
          onClick={toggle}
          aria-expanded={isOpen}
          // tabIndex="0"
        >
          {!isOpen && (
            <IconAngleDown className="fill-gray-light ifu-mainmenu__submenu-icon" />
          )}
          {isOpen && (
            <IconAngleUp className="fill-gray-light ifu-mainmenu__submenu-icon" />
          )}
        </button>
      </div>
    </div>
    {items && <SubMenuItems items={items} isOpen={isOpen} level={1} />}
  </>
)

export default SubMenu
