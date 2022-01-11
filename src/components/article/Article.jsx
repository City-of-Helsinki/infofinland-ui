import cls from 'classnames'
// import Image from 'next/image'
import Breadcrumbs from '@/components/layout/Breadcrumbs'
import Image from 'next/image'
import { HERO_MARGIN } from '@/components/layout/Block'
import ArticleHeading from './ArticleHeading'
import blurPlaceholder from '../blurPlaceholder'
// Tailwind color classes. Must be written out or css purge will remove them.
const BG_COLORS = {
  red: 'bg-article-red',
  green: 'bg-article-green',
  blue: 'bg-article-blue',
  orange: 'bg-article-orange',
}

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
        <ArticleHeading heroImage={heroImage} {...rest} />
      </>
    )
  } else {
    return (
      <div className={cls({ 'h-hero md:h-heroxl relative': !heroImage })}>
        <ArticleHeading heroImage={heroImage} {...rest} />
      </div>
    )
  }
}

const Article = ({ children, breadcrumbs, color, ...heroProps }) => {
  return (
    <div className={cls(' relative', BG_COLORS[color])}>
      {/* scrollable breadcrumbs  */}
      <div
        className={cls(HERO_MARGIN, {
          'px-6 lg:px-12': !heroProps.heroImage,
        })}
      >
        <Breadcrumbs items={breadcrumbs} />
      </div>

      <HeroImage {...heroProps} />
      {children}
    </div>
  )
}

export default Article
