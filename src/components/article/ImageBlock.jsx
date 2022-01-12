import Block from '@/components/layout/Block'
import Image from 'next/image'

const getFit = ({ width, height }) => (width < height ? 'contain' : 'cover')

export const ArticleImage = ({
  src,
  height,
  width,
  title,
  alt,
  caption,
  className,
  fit,
  layout = 'fill',
}) => (
  <>
    <div className={className}>
      {src && (
        <Image
          alt={alt}
          src={src}
          title={title}
          layout={layout}
          objectFit={fit || getFit({ width, height })}
          {...(layout === 'fill' ? {} : { width, height })}
        />
      )}
    </div>

    {caption && (
      <p className="mt-2 text-body-small text-gray-dark">{caption}</p>
    )}
  </>
)

const ImageBlock = ({ caption, src, height, width, title, alt }) => {
  return (
    <Block className="my-16" hero>
      <ArticleImage
        className="overflow-hidden relative bg-gray-lighter-teal rounded aspect-video"
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
