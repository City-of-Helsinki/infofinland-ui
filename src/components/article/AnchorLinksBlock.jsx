import { CONTENT_TYPES } from '@/lib/DRUPAL_API_TYPES'
import { headingHash } from './ContentMapper'
import Block from '../layout/Block'
import { useTranslation } from 'next-i18next'
const HEADING_TYPES = [CONTENT_TYPES.HEADING, CONTENT_TYPES.ACCORDION]

const getHeadings = (field_content) =>
  field_content
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
    //ignore broken contents
    .filter((h) => !!h)

const AnchorLinksBlock = ({ field_content }) => {
  const { t } = useTranslation('common')
  if (field_content?.length < 1) {
    return null
  }

  const headings = getHeadings(field_content)

  if (!headings || headings?.length === 0) {
    return null
  }

  return (
    <Block>
      <ul
        className="pt-2 mb-10 list-disc list-outside ms-2 lg:ms-4 ps-4"
        title={t('article.index')}
      >
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
