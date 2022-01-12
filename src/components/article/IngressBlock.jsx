import ParseHtml from '../ParseHtml'
import Block from '@/components/layout/Block'

const IngressBlock = ({field_description})=>(
<Block className="ifu-article__ingress text-body-large my-8">
  <ParseHtml html={field_description} />
</Block>)


export default IngressBlock
