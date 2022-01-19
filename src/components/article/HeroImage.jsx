import Image from 'next/image'
import { HERO_MARGIN } from '@/components/layout/Block'
import ArticleHeading from './ArticleHeading'
import blurPlaceholder from '../blurPlaceholder'
import cls from 'classnames'

const HeroImage = ({ heroImage, ...rest }) => {
  if (heroImage) {
    return (
      <>
        <div
          className={cls(
            HERO_MARGIN,
            'overflow-hidden mb-6 h-hero  md:h-heroxl text-center rounded relative'
          )}
        >
          <Image
            placeholder="blur"
            blurDataURL={blurPlaceholder}
            src={heroImage}
            alt=""
            priority
            layout="fill"
            className="block w-full h-full rounded"
            objectFit="cover"
          />
        </div>
        <ArticleHeading forHeroImage {...rest} />
      </>
    )
  } else {
    return (
      <div className={cls({ 'h-hero md:h-heroxl relative': !heroImage })}>
        <ArticleHeading  {...rest} />
      </div>
    )
  }
}

export default HeroImage
