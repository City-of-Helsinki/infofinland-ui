const ANCHORLINK_TRESHOLD = 1

import { CONTENT_TYPES } from '@/lib/DRUPAL_API_TYPES'
import { headingHash } from './ContentMapper'
import Block from '../layout/Block'
const AnchorLinksBlock = ({ field_content }) => {
  const headings = field_content.filter(
    ({ type }) => type === CONTENT_TYPES.HEADING
  )

  if (headings.length < ANCHORLINK_TRESHOLD) {
    return null
  }

  return (
    <Block>
      <ul className="py-4 mb-4 list-disc list-outside ms-4 ps-4">
        {headings.map(({ id, field_title }) => {
          return (
            <li className="ps-2" key={`heading-anchor-${id}`}>
              <a href={headingHash(id)} className="font-bold text-link">
                {field_title}
              </a>
            </li>
          )
        })}
      </ul>
    </Block>
  )
}

export default AnchorLinksBlock
