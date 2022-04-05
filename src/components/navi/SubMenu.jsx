import { CSSTransition } from 'react-transition-group'
import { IconAngleDown, IconAngleUp } from '@/components/Icons'
import Link from 'next/link'
import cls from 'classnames'
import useLocalizedPath from '@/hooks/useRouterWithLocalizedPath'
import { useTranslation } from 'next-i18next'
import { forwardRef } from 'react'

// eslint-disable-next-line react/display-name
const SubMenuItem = forwardRef(
  ({ title, url, selected, items, level, isOpen }, ref) => (
    <li className="block" ref={ref}>
      <Link passHref href={url} locale={false} prefetch={false}>
        <a
          tabIndex={isOpen ? '0' : '-1'}
          className={cls(
            'block py-3 text-body-small hover:bg-gray-white pe-4 ',
            {
              'ps-12 ': level === 1,
              'ps-16': level === 2,
              'border-s-5 border-blue/75 hover:border-blue  font-bold':
                selected,
              'border-s-5 border-white ': !selected,
            }
          )}
        >
          {title}
        </a>
      </Link>
      {items && (
        <SubMenuItems items={items} level={level + 1} isOpen={isOpen} />
      )}
    </li>
  )
)

// eslint-disable-next-line react/display-name
const SubMenuItems = forwardRef(({ items, isOpen, level }, ref) => {
  const { localePath, locale } = useLocalizedPath()
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
        {items.map((props) => {
          const selected = props.url === localePath
          return (
            <SubMenuItem
              ref={ref}
              key={`${props.url}-${props.id}-${locale}`}
              {...props}
              level={level}
              selected={selected}
              isOpen={isOpen}
            />
          )
        })}
      </ul>
    </CSSTransition>
  )
})

// eslint-disable-next-line react/display-name
const SubMenu = forwardRef(
  (
    {
      items,
      title,
      isOpen,
      toggle,
      selected,
      url,
      selectedIsHidden,
      secondarySelection,
    },
    ref
  ) => {
    const { t } = useTranslation('common')
    const subMenuLabel = t(isOpen === true ? 'mainMenu.close' : 'mainMenu.open')
    return (
      <>
        <div
          className={cls(
            'text-body-small ps-8 border-s-5 hover:bg-gray-white',
            {
              'border-white ': !selected && !selectedIsHidden,
              'border-blue/75 hover:border-blue': selectedIsHidden || selected,
              'font-bold': selected,
            }
          )}
        >
          {/*
          Shame hack: adding extra span so that border colors will switch
        accordingly in RTL without overly complicating the CSS works */}
          <span
            className={cls('border-e-5 w-full flex items-center', {
              'border-green-light/75 hover:border-green-light':
                secondarySelection,
              'border-white hover:border-gray-white': !secondarySelection,
            })}
          >
            <Link passHref href={url} prefetch={false} locale={false}>
              <a className="flex-grow py-4">
                <span className={cls('block', { 'font-bold': selected })}>
                  {title}
                </span>
              </a>
            </Link>
            <div className="flex-none">
              <button
                className="block w-16 h-12"
                onClick={toggle}
                title={subMenuLabel}
                aria-label={subMenuLabel}
                aria-expanded={isOpen}
              >
                {!isOpen && (
                  <IconAngleUp className="fill-gray-light ifu-mainmenu__submenu-icon--open ifu-mainmenu__submenu-icon" />
                )}
                {isOpen && (
                  <IconAngleDown className="fill-gray-light ifu-mainmenu__submenu-close ifu-mainmenu__submenu-icon" />
                )}
              </button>
            </div>
          </span>
        </div>
        {items && (
          <SubMenuItems ref={ref} items={items} isOpen={isOpen} level={1} />
        )}
      </>
    )
  }
)

export default SubMenu
