import ParseHtml from '../ParseHtml'
import Block from '@/components/layout/Block'
import cls from 'classnames'

const HtmlBlock = ({ field_text, className }) => (
  <Block className={cls('ifu-block__html', field_text?.format, className)}>
    <ParseHtml html={field_text?.processed} />
  </Block>
)

export default HtmlBlock
