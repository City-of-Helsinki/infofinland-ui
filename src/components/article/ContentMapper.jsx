import ParseHtml from '../ParseHtml'
import Block from '@/components/layout/Block'
import cls from 'classnames'
import { H2 } from '../Typo'
import { BLOCK_MARGIN } from '../layout/Block'
import Image from 'next/image'
import ReadMoreBlock from './ReadMoreBlock'
import { CONTENT_TYPES } from '@/lib/ssr-api'
import { getFit } from '@/lib/content-utils'

export const HtmlBlock = ({ field_text }) => (
  <Block className={cls('my-8 ifu-article__bodyblock', field_text?.format)}>
    <ParseHtml html={field_text?.processed} />
  </Block>
)

export const ImageBlock = ({
  field_image_caption,
  src,
  height,
  width,
  alt,
  title,
}) => (
  <Block className="my-16">
    <div className="ifu-article__image--basic">
      <Image
        alt={alt}
        src={src}
        // height={height}
        // width={width}
        title={title}
        layout="fill"
        objectFit={getFit({ width, height })}
      />
    </div>
    <p className="text-body-small text-gray-dark">{field_image_caption}</p>
  </Block>
)

export default function ContentMapper({ content }) {
  if (content?.length === 0) {
    return null
  }

  return content.map((item) => {
    const { type } = item
    switch (type) {
      case CONTENT_TYPES.TEXT:
        return <HtmlBlock {...item} />
      case CONTENT_TYPES.HEADING:
        return (
          <H2 className={cls(BLOCK_MARGIN, 'my-8 ifu-article__bodyblock')}>
            {item.field_title}
          </H2>
        )

      case CONTENT_TYPES.PARAGRAPH_IMAGE:
        return <ImageBlock {...item} />

      case CONTENT_TYPES.READMORE:
        return <ReadMoreBlock content={item.content} />
    }
  })
}
