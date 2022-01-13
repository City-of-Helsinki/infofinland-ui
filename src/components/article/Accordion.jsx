import { useState } from 'react'
import { CSSTransition } from 'react-transition-group'
import { H2 } from '../Typo'
import Block from '../layout/Block'
import ContentMapper from './ContentMapper'
import { IconAngleDown, IconAngleUp } from '../Icons'
import cls from 'classnames'
import { useRouter } from 'next/router'

export const AccordionItems = ({ field_accordion_items }) => {
  const [openIndex, setOpenIndex] = useState(null)
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
              isOpen={openIndex === id}
              toggle={() => {
                setOpenIndex(id === openIndex ? null : id)
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
  const titleId = `accordion-title-${id}`

  return (
    <>
      <Block>
        <div
          className={cls('flex items-center py-4 border-t border-gray-hr', {
            'border-b': last,
          })}
        >
          <div className="flex-grow" id={titleId}>
            <H2>{heading}</H2>
          </div>
          <button
            aria-expanded={isOpen}
            onClick={toggle}
            className="inline-block flex-none w-12 h-8 lg:h-12"
          >
            {!isOpen && <IconAngleDown className="w-3 h-3 fill-gray-medium" />}
            {isOpen && <IconAngleUp className="w-3 h-3 fill-gray-medium" />}
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
        mountOnEnter
        unmountOnExit
        timeout={{ appear: 0, enter: 500, exit: 0 }}
      >
        <div className="ifu-accordion__item">
          <ContentMapper content={content} locale={locale} />
        </div>
      </CSSTransition>
    </>
  )
}

export default AccordionItems
