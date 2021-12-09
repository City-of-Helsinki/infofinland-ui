import ParseHtml from '../ParseHtml'
import Block from '@/components/layout/Block'
import cls from 'classnames'
import { H2 } from '../Typo'
import { BLOCK_MARGIN } from '../layout/Block'
import Image from 'next/image'
import ReadMoreBlock from './ReadMoreBlock'
const CONTENT_TYPES = {
  TEXT: 'paragraph--text',
  HEADING: 'paragraph--heading',
  PARAGRAPH_IMAGE: 'paragraph--image',
  ACCORDION: 'accordion',
  COLUMNS: 'columns',
  READMORE: 'paragraph--language_link_collection',
  READMORE_LINK_COLLECTION: 'node--link',
  READMORE_LINK: 'paragraph--language_link',
  LOCALINFO: 'local',
  FILE: 'file--file',
  MEDIA_IMAGE: 'media--image',
}
// import ReadMoreBlock from '@/components/article/ReadMoreBlock'

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
    <div className="relative rounded border-white">
      <Image
        alt={alt}
        src={src}
        height={height}
        width={width}
        title={title}
        layout="responsive"
        objectFit="contain"
      />
    </div>
    <p className="text-body-small text-gray-dark">{field_image_caption}</p>
  </Block>
)

export default function ContentMapper({ content }) {
  if (content?.length === 0) {
    return null
  }

  const media = content.filter(({ type }) => type == CONTENT_TYPES.MEDIA_IMAGE)
  const files = content.filter(({ type }) => type === CONTENT_TYPES.FILE)
  const linkCollections = content.filter(
    ({ type }) => type === CONTENT_TYPES.READMORE_LINK_COLLECTION
  )
  const links = content.filter(
    ({ type }) => type === CONTENT_TYPES.READMORE_LINK
  )

  const paragraphs = content.filter(({ type }) =>
    [
      CONTENT_TYPES.READMORE,
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

  const getReadMoreLinks = ({ relationships }) => {
    console.log(relationships)
    let content = []
    const linksIds = relationships.field_link_collection.data.map(
      ({ id }) => id
    )
    const linkCollection = linkCollections.filter(({ id }) =>
      linksIds.includes(id)
    )

    content = linkCollection.map(
      ({ relationships, title, field_link_target_site: siteName }) => {
        const relatedLinksIds = relationships.field_links.data.map(
          ({ id }) => id
        )

        const relatedLinks = links.filter(({ id }) =>
          relatedLinksIds.includes(id)
        )
        console.log({ relatedLinks })
        const pageUrl = relatedLinks.at(0).field_language_link
        const languages = relatedLinks.map(
          ({ field_language_link: url, langcode: lang }) => ({
            url,
            text: 'demo',
            lang,
          })
        )
        return {
          pageName: title,
          siteName,
          pageUrl,
          siteUrl: 'TODO',
          languages,
        }
      }
    )
    console.log({ content })
    return content
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

      case CONTENT_TYPES.READMORE:
        return <ReadMoreBlock content={getReadMoreLinks(item)} />
    }
  })
}
