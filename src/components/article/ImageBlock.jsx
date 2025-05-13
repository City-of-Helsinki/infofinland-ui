import Block from '@/components/layout/Block'
import Image from "next/legacy/image"
import { useTranslation } from 'next-i18next'
import cls from 'classnames'
import { RingsLoader } from '../Loaders'
import { useState } from 'react'
const getFit = ({ width, height }) => (width < height ? 'contain' : 'cover')

export const ArticleImage = ({
  src,
  height,
  width,
  title,
  alt,
  caption,
  photographer,
  className,
  fit,
  layout = 'fill',
}) => {
  const { t } = useTranslation('common')
  const [loading, setLoading] = useState(true)
  return (
    <>
      <div className={cls(className, 'ifu-loader__rings')}>
        {loading && <RingsLoader />}
        {src && (
          <Image
            alt={alt}
            src={src}
            // src="/foo.png"
            title={title}
            layout={layout}
            onLoadingComplete={() => setLoading(false)}
            objectFit={fit || getFit({ width, height })}
            {...(layout === 'fill' ? {} : { width, height })}
          />
        )}
      </div>

      {caption && (
        <p className="mt-2 text-body-small text-gray-dark">{caption}</p>
      )}
      {photographer && (
        <p className="mt-2 text-action text-gray-dark">
          {t('images.photographer')}: {photographer}
        </p>
      )}
    </>
  )
}

const ImageBlock = ({ caption, src, height, width, title, alt }) => {
  return (
    <Block className="my-16" hero>
      <ArticleImage
        className="overflow-hidden relative bg-gray-white rounded aspect-video"
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
