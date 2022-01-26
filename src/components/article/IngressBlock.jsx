import ParseHtml from '../ParseHtml'
import Block from '@/components/layout/Block'

const IngressBlock = ({ field_description }) => (
  <Block className="lg:my-16 mt-8 mb-16 text-body-large ifu-article__ingress">
    <ParseHtml html={field_description} />
  </Block>
)

export default IngressBlock
