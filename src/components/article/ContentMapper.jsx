import cls from 'classnames'
import { H2 } from '../Typo'
import { BLOCK_MARGIN } from '../layout/Block'

import ReadMoreBlock from './ReadMoreBlock'
import AccordionItems from './Accordion'
import { CONTENT_TYPES } from '@/lib/DRUPAL_API_TYPES'
import { getImage, getLinks } from '@/lib/ssr-api'

import PVTBlock from './PVTBlock'
import { TEXT_HTML_FORMAT } from '@/lib/DRUPAL_API_TYPES'
import Columns from './Columns'
import HtmlBlock from './HtmlBlock'
import ImageBlock from './ImageBlock'

export const headingId = (id) => `heading-${id}`
export const headingHash = (id) => `#${headingId(id)}`

export default function ContentMapper({ content, locale }) {
  if (content?.length === 0) {
    return null
  }

  return content.map((item) => {
    const { type, id } = item
    const key = `paragraph--${type}-${id}`

    switch (type) {
      case CONTENT_TYPES.TEXT:
        if (
          item?.field_text?.format !== TEXT_HTML_FORMAT ||
          !item?.field_text?.processed
        ) {
          return null
        }
        return <HtmlBlock {...item} key={key} />
      case CONTENT_TYPES.HEADING:
        return (
          <H2
            id={headingId(id)}
            key={key}
            className={cls(BLOCK_MARGIN, 'my-8 ifu-article__bodyblock')}
          >
            {item.field_title}
          </H2>
        )

      case CONTENT_TYPES.PARAGRAPH_IMAGE:
        return <ImageBlock key={key} {...getImage(item)} />

      case CONTENT_TYPES.ACCORDION:
        return <AccordionItems {...item} />

      case CONTENT_TYPES.READMORE:
        return (
          <ReadMoreBlock
            key={key}
            locale={locale}
            content={getLinks({
              collection: item.field_link_collection,
              locale,
            })}
          />
        )

      case CONTENT_TYPES.PVT:
        return <PVTBlock items={item.field_contact_data} key={key} />

      case CONTENT_TYPES.COLUMNS:
        return <Columns {...item} />
    }
  })
}
