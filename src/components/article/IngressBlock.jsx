import ParseHtml from '../ParseHtml'
import Block from '@/components/layout/Block'

const IngressBlock = ({ field_description }) => (
  <Block className="mt-8 lg:mt-16 mb-8 lg:mb-8 text-body-large ifu-article__ingress">
    <ParseHtml html={field_description} />
  </Block>
)

export default IngressBlock
