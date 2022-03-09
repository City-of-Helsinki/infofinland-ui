import cls from 'classnames'
import { longTextClass } from '@/components/Typo'
import { IconCalendar } from '@/components/Icons'
import { DateTime } from 'luxon'

import { useRouter } from 'next/router'
import { useTranslation } from 'next-i18next'

export default function ArticleHeading({
  forHeroImage = false,
  title,
  date,
  themeHero,
  fiTitle,
}) {
  const { locale } = useRouter()
  const { t } = useTranslation('common')

  const titleMargin = themeHero ? 'ifu-block--article' : 'ifu-block--hero'
  return (
    <div className={titleMargin}>
      <div className={cls({ 'absolute bottom-5 md:bottom-8': !forHeroImage })}>
        {/* article category */}
        <span
          lang="fi"
          className={cls('block text-action mb-3', {
            'text-gray-darker': forHeroImage,
            'text-bodytext-color mt-6': !forHeroImage,
            invisible: locale === 'fi',
          })}
        >
          {fiTitle}
        </span>
        {/* article title / hero text */}
        <h1
          className={cls(
            'mb-2 md:mb-6  max-w-article me-2 ifu-hero__title text-bodytext-color',
            longTextClass(title, {
              size: 40,
              classes: [
                ' text-h2 md:text-h1 lg:text-h1xl',
                'text-h3 md:text-h3 lg:text-h1',
              ],
            })
          )}
        >
          {title}
        </h1>
        {/* article date */}
        <div className="flex items-center mb-8 text-body-small text-bodytext-color">
          <IconCalendar
            className="md:w-4 md:h-4 transform translate-y-px lg:ms-2"
            title={t('article.published')}
          />
          <span className="px-2 transform translate-y-px">
            {DateTime.fromISO(date).toFormat('dd.MM.yyyy')}
          </span>
        </div>
      </div>
    </div>
  )
}
