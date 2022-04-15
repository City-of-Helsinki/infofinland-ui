import { IconAngleDown, IconAngleUp } from '@/components/Icons'
import Link from 'next/link'
import cls from 'classnames'
import useLocalizedPath from '@/hooks/useRouterWithLocalizedPath'
import { useTranslation } from 'next-i18next'
import { forwardRef, useEffect } from 'react'
import { useRef } from 'react'

/**
 *
 * Tailwind classes must be written out, or it will be ignored by unused class optimizer.
 * Parse time from class name. Accordion animation time must match scroll scroll delay.
 */
const ACCORDION_DURATION_CLASS = 'duration-150'
//Add some milliseconds to avoid race condition in animation and scroll.
const ACCORCION_DURATION = Number(ACCORDION_DURATION_CLASS.split('-').pop()) + 5

// eslint-disable-next-line react/display-name
const SubMenuItem = forwardRef(
  ({ title, url, selected, items, level, isOpen }, ref) => {
    const refProps = {}
    const subrefProps = {}

    if (selected) {
      refProps.ref = ref
    } else {
      subrefProps.ref = ref
    }

    return (
      <li className="block" {...refProps}>
        <Link passHref href={url} locale={false} prefetch={false}>
          <a
            tabIndex={isOpen ? '0' : '-1'}
            className={cls('ifu-mainmenu__item--subitem', {
              'ps-12 ': level === 1,
              'ps-16': level === 2,
              'border-s-5 border-blue/75 hover:border-blue  font-bold':
                selected,
              'border-s-5 border-white ': !selected,
            })}
          >
            {title}
          </a>
        </Link>
        {items && (
          <SubMenuItems
            {...subrefProps}
            items={items}
            level={level + 1}
            isOpen={isOpen}
          />
        )}
      </li>
    )
  }
)

// eslint-disable-next-line react/display-name
const SubMenuItems = forwardRef(({ items, isOpen, level }, ref) => {
  const { localePath, locale } = useLocalizedPath()

  /**
   *
   */
  return (
    <ul
      className={cls('ifu-mainmenu__submenu', ACCORDION_DURATION_CLASS, {
        'max-h-0 opacity-0 will-change-auto': !isOpen,
        'opacity-100 max-h-[500rem]  transition-all': isOpen,
      })}
    >
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
    const clickRef = useRef(null)

    useEffect(() => {
      if (isOpen) {
        setTimeout(() => {
          clickRef.current?.scrollIntoView({
            behaviour: 'smooth',
            block: 'start',
          })
          clickRef.current?.classList.add('ifu-mainmenu--scroll-flash')
        }, ACCORCION_DURATION)
      }
    }, [isOpen, clickRef])

    return (
      <>
        <div
          ref={clickRef}
          className={cls('ifu-mainmenu__item--button', {
            'border-white ': !selected && !selectedIsHidden,
            'border-blue/75 hover:border-blue': selectedIsHidden || selected,
            'font-bold': selected,
            // 'bg-gray-lighter/25': isOpen || selected,
            'border-orange/50': isOpen && !selected,
          })}
        >
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
                  <IconAngleDown className="fill-gray-dark ifu-mainmenu__submenu-close ifu-mainmenu__submenu-icon" />
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
