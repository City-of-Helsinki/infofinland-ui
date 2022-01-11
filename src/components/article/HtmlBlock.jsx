import ParseHtml from '../ParseHtml'
import Block from '@/components/layout/Block'
import cls from 'classnames'

const HtmlBlock = ({ field_text }) => (
  <Block className={cls('my-8 ifu-article__bodyblock', field_text?.format)}>
    <ParseHtml html={field_text?.processed} />
  </Block>
)

export default HtmlBlock
