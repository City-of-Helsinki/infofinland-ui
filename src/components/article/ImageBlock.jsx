import Block from '@/components/layout/Block'
import Image from 'next/image'
import { getFit } from '@/lib/content-utils'


export const ArticleImage = ( { src, height, width, title, alt ,caption})=>(
<>
<div className="ifu-article__image--basic">
{src  &&<Image
  alt={alt}
  src={src}
  // width={width}
  // height={height}
  title={title}
  layout="fill"
  objectFit={getFit({ width, height })}
/>}
</div>

{caption && <p className="text-body-small text-gray-dark">{caption}</p>}

</>)

const ImageBlock = ({ caption, src, height, width, title, alt }) => {
    return (
      <Block className="my-16" hero>
          <ArticleImage
            alt={alt}
            src={src}
            width={width}
            height={height}
            caption={caption}
            title={title}
          />
      </Block>
    )
  }

export default ImageBlock
