import { useState, useRef } from 'react'
import { CSSTransition } from 'react-transition-group'
import { H2 } from '../Typo'
import Block from '../layout/Block'
import ContentMapper from './ContentMapper'
import { IconAngleDown, IconAngleUp } from '../Icons'
import cls from 'classnames'
import { useRouter } from 'next/router'
import { headingId } from './ContentMapper'
import { useIsVisible } from 'react-is-visible'

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

  return (
    <>
      <Block>
        <div
          className={cls('flex items-center py-5 border-t border-gray-hr', {
            'border-b': last && !isOpen,
          })}
        >
          <div className="relative flex-grow">
            <div
              className="absolute -top-24 lg:-top-28 invisible"
              ref={scrollRef}
            />
            <H2 id={headingId(id)}>{heading}</H2>
          </div>
          <button
            aria-expanded={isOpen}
            onClick={toggle}
            aria-controls={panelId}
            className="inline-block flex-none w-12 h-8 lg:h-12"
          >
            {!isOpen && (
              <IconAngleDown
                aria-hidden="true"
                className="w-3 h-3 fill-gray-medium"
              />
            )}
            {isOpen && (
              <IconAngleUp
                aria-hidden="true"
                className="w-3 h-3 fill-gray-medium"
              />
            )}
          </button>
        </div>
      </Block>
      <CSSTransition
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
          console.log({ isInViewport })
          if (!isInViewport) {
            scrollRef.current?.scrollIntoView({
              block: 'start',
              behaviour: 'auto',
            })
          }
        }}
        timeout={{ appear: 0, enter: 10, exit: 0 }}
      >
        <div className="overflow-hidden ifu-accordion__item" id={panelId}>
          <ContentMapper content={content} locale={locale} />
        </div>
      </CSSTransition>
    </>
  )
}

export default AccordionItems
