import Block from "../layout/Block"
import { ArticleImage } from "./ImageBlock"
import ParseHtml from "../ParseHtml"
import { CONTENT_TYPES } from "@/lib/DRUPAL_API_TYPES"
import { TEXT_HTML_FORMAT } from "./ContentMapper"
import cls from 'classnames'
import { getImage } from "@/lib/ssr-api"

const ColumnMapper = ({type,field_text,field_image, field_image_caption})=> {

  switch (type) {
    case CONTENT_TYPES.TEXT:
      if (
        field_text?.format !== TEXT_HTML_FORMAT ||
        !field_text?.processed
      ) {
        return null
      }
      return (
      <div className={cls('ifu-article__bodyblock', field_text?.format)}>
        <ParseHtml html={field_text?.processed} />
      </div>)

    case CONTENT_TYPES.PARAGRAPH_IMAGE:
      return <ArticleImage {...getImage({field_image})} caption={field_image_caption}/>

    default:
      return null

  }
}

export default function Columns({field_columns_left_column, field_columns_right_column})  {
  return (
    <Block>
      <div className="lg:grid grid-cols-2 gap-6">
        <div className="mb-8 lg:mb-0">
          <ColumnMapper {...field_columns_left_column}/>
        </div>
        <div className="mb-8 lg:mb-0">
          <ColumnMapper {...field_columns_right_column}/>
        </div>
      </div>
    </Block>
  )
}
