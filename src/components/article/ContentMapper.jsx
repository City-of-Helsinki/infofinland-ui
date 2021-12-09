import ParseHtml from '../ParseHtml'
import Block from '@/components/layout/Block'
import cls from 'classnames'
import { H2 } from '../Typo'
import { BLOCK_MARGIN } from '../layout/Block'
import Image from 'next/image'
const CONTENT_TYPES = {
  TEXT: 'paragraph--text',
  HEADING: 'paragraph--heading',
  PARAGRAPH_IMAGE: 'paragraph--image',
  ACCORDION: 'accordion',
  COLUMNS: 'columns',
  READMORE: 'readmore',
  LOCALINFO: 'local',
  FILE: 'file--file',
  MEDIA_IMAGE: 'media--image',
}

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
  <Block className="mb-8">
    {JSON.stringify({ field_image_caption, src, height, width, alt, title })}
    <figure className="relative">
      <Image alt={alt} src={src} height={height} width={width} title={title} />
      <figcaption className={cls(BLOCK_MARGIN, 'my-8 ifu-article__bodyblock')}>
        {field_image_caption}
      </figcaption>
    </figure>
  </Block>
)

export default function ContentMapper({ content }) {
  if (content?.length === 0) {
    return null
  }

  const media = content.filter(({ type }) => type == CONTENT_TYPES.MEDIA_IMAGE)
  const files = content.filter(({ type }) => type === CONTENT_TYPES.FILE)
  const paragraphs = content.filter(({ type }) =>
    [
      CONTENT_TYPES.PARAGRAPH_IMAGE,
      CONTENT_TYPES.TEXT,
      CONTENT_TYPES.HEADING,
    ].includes(type)
  )
  const getImageForParagraphImage = ({ relationships }) => {
    const mediaId = relationships?.field_image?.data?.id
    const mediaItem = media.find(({ id }) => id === mediaId).relationships
      ?.field_media_image?.data
    const file = files.find(({ id }) => id === mediaItem.id)
    const src = `${process.env.NEXT_PUBLIC_DRUPAL_BASE_URL}${file.uri.url}`

    return { ...mediaItem.meta, src }
  }

  return paragraphs.map((item) => {
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
        return <ImageBlock {...item} {...getImageForParagraphImage(item)} />
    }
  })
}
