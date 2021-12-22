import { useState } from 'react'
// import cls from 'classnames'
// import { H2 } from "../Typo"
import Block from '../layout/Block'
import ContentMapper from './ContentMapper'
// import { HtmlBlock } from "./ContentMapper"
import { IconAngleDown, IconAngleUp } from '../Icons'
const Accordion = ({ field_accordion_items }) => {
  const [isOpen] = useState(true)
  // const toggle = ()=> setOpen(!open)
  return (
    <>
      <Block>
        <div className="border-t border-b border-gray">
          <div className="text-black">
            {!isOpen && <IconAngleDown />}
            {isOpen && <IconAngleUp />}
          </div>
        </div>
      </Block>
      {isOpen &&
        field_accordion_items.map(
          ({ field_accordion_item_content, field_accordion_item_heading }) => {
            return (
              <>
                {field_accordion_item_heading && (
                  <Block>
                    <h2>{field_accordion_item_heading}</h2>
                  </Block>
                )}
                {field_accordion_item_content.map((item) => {
                  console.log(item)

                  return (
                    <ContentMapper
                      content={[item]}
                      key={`accordion-item-${item.id}`}
                    />
                  )
                })}
              </>
            )
          }
        )}
    </>
  )
}

export default Accordion
