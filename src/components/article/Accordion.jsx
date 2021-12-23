import { useState,useRef, useEffect} from 'react'
import { CSSTransition } from 'react-transition-group'
import { H2} from '../Typo'
import Block from '../layout/Block'
import ContentMapper from './ContentMapper'
import { IconAngleDown, IconAngleUp } from '../Icons'
import cls from 'classnames'



export const AccordionItems = ({ field_accordion_items }) => {
  const [openIndex, setOpenIndex] = useState(null)
  const accordionCount = field_accordion_items.length
  return (
    <div className="my-16">
      {field_accordion_items.map(
        ({
          field_accordion_item_content,
          field_accordion_item_heading,
          id,
          type,
        },i) => {
          return (
            <Accordion
              id={id}
              key={`${type}-${id}`}
              last={(i+1) === accordionCount }
              isOpen={openIndex === id}
              toggle={()=>{setOpenIndex(id === openIndex ? null: id)}}
              content={field_accordion_item_content}
              heading={field_accordion_item_heading}
            />
          )
        }
      )}
    </div>
  )
}

const Accordion = ({ content, heading, toggle, isOpen,last,id }) => {
 const titleId = `accordion-title-${id}`
 const scrollRef = useRef()
 const scrollToRef = () => window.scrollTo(0, scrollRef.current.offsetTop)

 useEffect(()=>{

  if(isOpen){
    setTimeout(scrollToRef,10)
  }


 },[isOpen])
  return (
    <>
      <Block className="" >
        <div className={cls('flex items-center py-6 border-t border-gray-hr',{'border-b':last})} ref={scrollRef}>
          <div className="flex-grow" id={titleId}>
          <H2 className="" >{heading}</H2>
          </div>
          <button
            onClick={toggle}
            className="inline-block flex-none w-12 h-8 text-black"
          >
            {!isOpen && <IconAngleDown className="w-4 h-4 fill-current" />}
            {isOpen && <IconAngleUp className="w-4 h-4 fill-current" />}
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
        timeout={{ appear: 0, enter:500, exit: 0 }}
      >
      <div className="ifu-accordion__item">
        <ContentMapper content={content} />
      </div>

        </CSSTransition>
    </>
  )
}

export default AccordionItems
