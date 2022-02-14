import cls from 'classnames'
// import Image from 'next/image'
import Breadcrumbs from '@/components/layout/Breadcrumbs'
import HeroImage from './HeroImage'
import { HERO_MARGIN } from '@/components/layout/Block'

// Tailwind color classes. Must be written out, not interpolated, for minification
// Failsafe classes if dynamic color taxonomy is not set in Drupal or not given to page
const BG_COLORS = {
  punainen: 'ifu-article__bg--red',
  vihreä: 'ifu-article__bg--green',
  sininen: 'ifu-article__bg--blue',
  oranssi: 'ifu-article__bg--orange',
  red: 'ifu-article__bg--red',
  green: 'ifu-article__bg--green',
  blue: 'ifu-article__bg--blue',
  orange: 'ifu-article__bg--orange',
}

const Article = ({ children, breadcrumbs, color, ...heroProps }) => {
  // Set article background from drupal if color code is given
  // Otherwise, use RED.
  const hex = color?.field_color_hex?.color
  const colorName = color?.name?.toLowerCase()
  let colorClass =
    typeof hex !== 'undefined'
      ? 'ifu-article__bg--dynamic'
      : BG_COLORS[colorName]
  colorClass = colorClass || BG_COLORS.red

  return (
    <>
      {colorName && (
        <style global jsx>{`
          :root {
            --bgColor: ${hex};
          }
        `}</style>
      )}
      <div className={cls('relative', colorClass)}>
        <div className={HERO_MARGIN}>
          <Breadcrumbs items={breadcrumbs} />
        </div>

        <HeroImage {...heroProps} />
        {children}
      </div>
    </>
  )
}

export default Article
