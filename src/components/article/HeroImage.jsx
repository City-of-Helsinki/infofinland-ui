import { useState } from 'react'
import Image from 'next/image'
import ArticleHeading from './ArticleHeading'
import cls from 'classnames'
import { RingsLoader } from '../Loaders'

const HeroImage = ({ heroImage, ...rest }) => {
  const [loading, setLoading] = useState(true)

  if (heroImage) {
    return (
      <>
        <div
          className="ifu-block--hero overflow-hidden mb-6 h-hero  md:h-heroxl text-center rounded relative">
          <div className="relative h-full bg-gray-white">
            {loading && <RingsLoader />}
            <Image
              src={heroImage}
              // src="/foo.png"
              alt=""
              priority
              layout="fill"
              onLoadingComplete={() => setLoading(false)}
              className={cls('block w-full h-full roundedbg-gray-teal', {
                ' animate-pulse': loading,
              })}
              objectFit="cover"
            />
          </div>
        </div>
        <ArticleHeading forHeroImage {...rest} />
      </>
    )
  } else {
    return (
      <div className={cls({ 'h-hero md:h-heroxl relative': !heroImage })}>
        <ArticleHeading {...rest} />
      </div>
    )
  }
}

export default HeroImage
