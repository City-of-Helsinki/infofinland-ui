import cls from 'classnames'
import { H2 } from '../Typo'
// import { BLOCK_MARGIN } from '../layout/Block'
import LocalInformation from '@/components/cities/LocalInformation'
import ReadMoreBlock from './ReadMoreBlock'
import ImageBlock from './ImageBlock'
import { CONTENT_TYPES } from '@/lib/DRUPAL_API_TYPES'
import { getImage, getLinks, getVideo } from '@/lib/ssr-helpers'
import dynamic from 'next/dynamic'
import PTVBlock from './PTVBlock'
import { TEXT_HTML_FORMAT } from '@/lib/DRUPAL_API_TYPES'
import HtmlBlock from './HtmlBlock'

const AccordionItems = dynamic(() => import('./Accordion'))
const Columns = dynamic(() => import('./Columns'))
const VideoBlock = dynamic(() => import('./VideoBlock'))

export const headingId = (id) => `heading-${id}`
export const headingHash = (id) => `#${headingId(id)}`

export default function ContentMapper({ content, locale }) {
  if (content?.length === 0) {
    return null
  }
  return content.map((item) => {
    const { type, id } = item
    const key = `${type}-${id}-${locale}`

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
            className={cls('ifu-block--article', 'my-8')}
          >
            {item.field_title}
          </H2>
        )

      case CONTENT_TYPES.PARAGRAPH_IMAGE:
        return <ImageBlock key={key} {...getImage(item)} />

      case CONTENT_TYPES.ACCORDION:
        return <AccordionItems {...item} key={key} />

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

      case CONTENT_TYPES.PTV:
        return <PTVBlock items={item.field_contact_data} key={key} />

      case CONTENT_TYPES.COLUMNS:
        return <Columns {...item} key={key} />

      case CONTENT_TYPES.VIDEO_HELSINKI:
        return <VideoBlock {...getVideo(item)} key={key} />

      case CONTENT_TYPES.VIDEO_REMOTE:
        return <VideoBlock {...getVideo(item)} key={key} />

      case CONTENT_TYPES.LOCALINFO:
        return (
          <LocalInformation
            cities={item.field_municipality_liftup_item}
            key={key}
          />
        )
    }
  })
}
