import cls from 'classnames'
// import Image from 'next/image'
import Breadcrumbs from '@/components/layout/Breadcrumbs'
import HeroImage from './HeroImage'
import { HERO_MARGIN } from '@/components/layout/Block'

// Tailwind color classes. Must be written out or css purge will remove them.
const BG_COLORS = {
  punainen: 'bg-article-red',
  vihreä: 'bg-article-green',
  sininen: 'bg-article-blue',
  oranssi: 'bg-article-orange',
  red: 'bg-article-red',
  green: 'bg-article-green',
  blue: 'bg-article-blue',
  orange: 'bg-article-orange',
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
