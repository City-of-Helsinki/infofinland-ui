import ParseHtml from '../ParseHtml'
import Block from '@/components/layout/Block'
import cls from 'classnames'
import { H2 } from '../Typo'
import { BLOCK_MARGIN } from '../layout/Block'
import Image from 'next/image'
import ReadMoreBlock from './ReadMoreBlock'
import { CONTENT_TYPES, getImage, getLinks } from '@/lib/ssr-api'
import { getFit } from '@/lib/content-utils'
import PVTBlock from './PVTBlock'
const TEXT_HTML_FORMAT = 'full_html'

export const HtmlBlock = ({ field_text }) => (
  <Block className={cls('my-8 ifu-article__bodyblock', field_text?.format)}>
    <ParseHtml html={field_text?.processed} />
  </Block>
)

export const ImageBlock = ({ caption, src, height, width, title, alt }) => {
  return (
    <Block className="my-16" hero>
      <div className="ifu-article__image--basic">
        <Image
          alt={alt}
          src={src}
          // width={width}
          // height={height}
          title={title}
          layout="fill"
          objectFit={getFit({ width, height })}
        />
      </div>
      <p className="text-body-small text-gray-dark">{caption}</p>
    </Block>
  )
}

export default function ContentMapper({ content, locale }) {
  if (content?.length === 0) {
    return null
  }

  return content.map((item, i) => {
    const { type } = item
    const key = `paragraph--${i}-${type}`
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
            key={key}
            className={cls(BLOCK_MARGIN, 'my-8 ifu-article__bodyblock')}
          >
            {item.field_title}
          </H2>
        )

      case CONTENT_TYPES.PARAGRAPH_IMAGE:
        return <ImageBlock key={key} {...getImage(item)} />

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
    }
  })
}
