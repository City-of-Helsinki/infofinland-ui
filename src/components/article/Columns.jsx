import Block from '../layout/Block'
import { ArticleImage } from './ImageBlock'
import ParseHtml from '../ParseHtml'
import { CONTENT_TYPES, TEXT_HTML_FORMAT } from '@/lib/DRUPAL_API_TYPES'
import cls from 'classnames'
import { getImage } from '@/lib/ssr-api'

const ColumnMapper = ({ type, field_text, ...rest }) => {
  switch (type) {
    case CONTENT_TYPES.TEXT:
      if (field_text?.format !== TEXT_HTML_FORMAT || !field_text?.processed) {
        return null
      }
      return (
        <div className={cls('ifu-article__column-block', field_text.format)}>
          <ParseHtml html={field_text.processed} />
        </div>
      )

    case CONTENT_TYPES.PARAGRAPH_IMAGE:
      return (
        <ArticleImage
          className="overflow-hidden relative bg-gray-white rounded aspect-video lg:aspect-square"
          {...getImage(rest)}
        />
      )

    default:
      return null
  }
}

export default function Columns({
  field_columns_left_column,
  field_columns_right_column,
}) {
  return (
    <Block className="py-16 ifu-article__columns">
      <div className="lg:grid grid-cols-2 gap-16">
        <div className="mb-8 lg:mb-0">
          <ColumnMapper {...field_columns_left_column} />
        </div>
        <div className="mb-8 lg:mb-0">
          <ColumnMapper {...field_columns_right_column} />
        </div>
      </div>
    </Block>
  )
}
