import { useState, useRef } from 'react'
import { CSSTransitionWithRef } from '../CSSTransitionWithRef'
import { H2 } from '../Typo'
import Block from '../layout/Block'
import ContentMapper from './ContentMapper'
import { IconAngleDown, IconAngleUp } from '../Icons'
import cls from 'classnames'
import { useRouter } from 'next/router'
import { headingId } from './ContentMapper'
import { useIsVisible } from 'react-is-visible'
import { useTranslation } from 'next-i18next'

export const AccordionItems = ({ field_accordion_items }) => {
  const [openId, setOpenId] = useState(null)
  const accordionCount = field_accordion_items.length
  const { locale } = useRouter()

  return (
    <div className="my-16 ifu-accordion">
      {field_accordion_items.map(
        (
          {
            field_accordion_item_content,
            field_accordion_item_heading,
            id,
            type,
          },
          i
        ) => {
          return (
            <Accordion
              locale={locale}
              id={id}
              key={`${type}-${id}`}
              last={i + 1 === accordionCount}
              isOpen={openId === id}
              toggle={() => {
                setOpenId(id === openId ? null : id)
              }}
              content={field_accordion_item_content}
              heading={field_accordion_item_heading}
            />
          )
        }
      )}
    </div>
  )
}
const Accordion = ({ content, heading, toggle, isOpen, last, id, locale }) => {
  const panelId = `accordion-panel-${id}`
  const scrollRef = useRef()
  const isInViewport = useIsVisible(scrollRef)
  const { t } = useTranslation('common')

  return (
    <>
      <Block>
        <div
          className={cls(' relative py-5 border-t border-gray-hr', {
            'border-b': last && !isOpen,
          })}
        >
          <div
            className="absolute -top-24 lg:-top-28 invisible"
            ref={scrollRef}
          />
          <H2 id={headingId(id)} className="flex items-center w-full">
            <span className="inline-block flex-grow">{heading}</span>

            <button
              aria-expanded={isOpen}
              onClick={toggle}
              aria-controls={panelId}
              aria-label={isOpen ? t('buttons.close') : t('buttons.readMore')}
              className="flex flex-none justify-items-center items-center w-12 h-8 lg:h-12"
            >
              {!isOpen && (
                <IconAngleDown
                  aria-hidden="true"
                  className="block w-3 h-3 fill-gray-medium"
                />
              )}
              {isOpen && (
                <IconAngleUp
                  aria-hidden="true"
                  className="block w-3 h-3 fill-gray-medium"
                />
              )}
            </button>
          </H2>
        </div>
      </Block>
      <CSSTransitionWithRef
        in={isOpen}
        classNames={{
          appear: 'ifu-accordion--appear',
          appearActive: 'ifu-accordion--appear-active',
          appearDone: 'ifu-accordion--appear-done',
          enter: 'ifu-accordion--enter',
          enterActive: 'ifu-accordion--enter-active',
          enterDone: 'ifu-accordion--enter-done',
          exit: 'ifu-accordion--exit',
          exitActive: 'ifu-accordion--exit-active',
          exitDone: 'ifu-accordion--exit-done',
        }}
        appear
        onEntered={() => {
          if (!isInViewport) {
            scrollRef.current?.scrollIntoView({
              block: 'start',
            })
          }
        }}
        // Note that enter-time is considerably shorter
        // than animation time in css to prevent content from jumping when another pane is opened
        timeout={{ appear: 0, enter: 10, exit: 0 }}
      >
        {/* Always print out accordion content for SEO purposes but hide them from screen readers if accordion is not opened */}
        <div
          aria-hidden={!isOpen}
          className="overflow-hidden ifu-accordion__item"
          id={panelId}
        >
          <ContentMapper content={content} locale={locale} />
        </div>
      </CSSTransitionWithRef>
    </>
  )
}

export default AccordionItems
