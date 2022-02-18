import { CONTENT_TYPES } from '@/lib/DRUPAL_API_TYPES'
import { headingHash } from './ContentMapper'
import Block from '../layout/Block'

const HEADING_TYPES = [CONTENT_TYPES.HEADING, CONTENT_TYPES.ACCORDION]
const AnchorLinksBlock = ({ field_content }) => {
  // TODO move to a separate function and test?
  const headings = field_content
    .filter(({ type }) => HEADING_TYPES.includes(type))
    .map(({ field_title, field_accordion_items, id }) => {
      if (field_title) {
        return { title: field_title, id }
      }
      return field_accordion_items?.map(
        ({ field_accordion_item_heading: title, id }) => ({ id, title })
      )
    })
    .flat()

  // Let's not render an empty block
  if (!headings || headings?.length === 0) {
    return null
  }

  return (
    <Block>
      <ul className="py-4 mb-4 list-disc list-outside ms-2 lg:ms-4 ps-4">
        {headings.map(({ id, title }) => {
          return (
            <li className="ps-2" key={`heading-anchor-${id}`}>
              <a href={headingHash(id)} className="font-bold ifu-text-link">
                {title}
              </a>
            </li>
          )
        })}
      </ul>
    </Block>
  )
}

export default AnchorLinksBlock
