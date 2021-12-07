import cls from 'classnames'
// import Image from 'next/image'
import { longTextClass } from '@/components/Typo'
import { IconCalendar } from '@/components/Icons'
import Breadcrumbs from '@/components/layout/Breadcrumbs'
import { useRouter } from 'next/router'
import { DateTime } from 'luxon'

// Tailwind color classes. Must be written out or css purge will remove them.
const BG_COLORS = {
  red: 'bg-article-red',
  green: 'bg-article-green',
  blue: 'bg-article-blue',
  orange: 'bg-article-orange',
}

export const BLOCK_MARGIN = `px-6 lg:px-12 lg:mx-12  xl:mx-28 2xl:mx-48  3xl:ms-64  3xl:max-w-4xl`

export const HERO_MARGIN =
  'px-6 lg:px-0 lg:mx-12 xl:mx-28 2xl:mx-48  3xl:ms-64  3xl:max-w-4xl'

const ArticleHeading = ({ heroImage, title, date, themeHero, fiTitle }) => {
  const { locale } = useRouter()
  const titleMargin = themeHero ? HERO_MARGIN : BLOCK_MARGIN
  return (
    <div className={titleMargin}>
      <div className={cls({ 'absolute bottom-5 md:bottom-8': !heroImage })}>
        {/* article category */}

        <span
          lang="fi"
          className={cls('block text-action mb-3', {
            'text-gray-darker': heroImage,
            'text-bodytext-color mt-6': !heroImage,
            invisible: locale === 'fi',
          })}
        >
          {fiTitle}
        </span>
        {/* article title / hero text */}
        <h1
          className={cls(
            'mb-2 md:mb-6  max-w-article me-2 ifu-hero__title',
            longTextClass(title, {
              size: 40,
              classes: [
                ' text-h2 md:text-h1xl',
                'text-h3 md:text-h3 lg:text-h1',
              ],
            })
          )}
        >
          {title}
        </h1>

        {/* article date */}

        <div className="flex items-center mb-8 text-body-small text-bodytext-color">
          <IconCalendar className="md:w-4 md:h-4 transform translate-y-px" />
          <span className="px-2 transform translate-y-px">
            {DateTime.fromISO(date).toFormat('dd.MM.yyyy')}
          </span>
        </div>
      </div>
    </div>
  )
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
