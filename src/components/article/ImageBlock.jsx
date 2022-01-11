import Block from '@/components/layout/Block'
import Image from 'next/image'
import { getFit } from '@/lib/content-utils'
import cls from 'classnames'

export const ArticleImage = ( { src, height, width, title, alt ,caption,className,fit, layout='fill'})=>(
<>
<div className={className}>
{src  &&<Image
  alt={alt}
  src={src}
  width={width}
  height={height}
  title={title}
  layout={layout}
  objectFit={fit || getFit({ width, height })}
/>}
</div>

{caption && <p className="text-body-small text-gray-dark mt-2">{caption}</p>}
</>)

const ImageBlock = ({ caption, src, height, width, title, alt }) => {
    return (
      <Block className="my-16" hero>
          <ArticleImage
            className="bg-gray-lighter-teal rounded relative overflow-hidden aspect-video"
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
