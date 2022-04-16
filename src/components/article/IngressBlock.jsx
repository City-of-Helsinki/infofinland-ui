import ParseHtml from '../ParseHtml'
import Block from '@/components/layout/Block'

const IngressBlock = ({ field_description }) => (
  <Block className="ifu-article__ingress">
    <ParseHtml html={field_description} />
  </Block>
)

export default IngressBlock
