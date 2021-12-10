import cls from 'classnames'
// import Image from 'next/image'
import Breadcrumbs from '@/components/layout/Breadcrumbs'

import { HERO_MARGIN } from '@/components/layout/Block'
import ArticleHeading from './ArticleHeading'
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
            'overflow-hidden mb-6 h-hero  md:h-heroxl text-center rounded'
          )}
        >
          {/* // eslint-disable-next-line @next/next/no-img-element */}
          <img
            src="/images/article1-sm.png"
            alt=""
            className="block w-full h-full rounded"
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
