import Link from 'next/link'
import Icon, { IconAngleRight } from '@/components/Icons'
import { useTranslation } from 'next-i18next'
import { useRouter } from 'next/router'

const MobileLink = ({ url, title }) => (
  <Link
    href={url}
    passHref
    locale={false}
    prefetch={false}
    className="flex md:hidden items-center mb-4 text-small md:text-body-small hover:underline"
    title={title}>

    <IconAngleRight
      className=" transform scale-150 rotate-180 fill-current me-3 ifu-breadcrumb__arrow"
      aria-hidden
    />
    <span className="inline-block transform -translate-x-1">{title}</span>

  </Link>
)

const Breadcrumbs = ({ items }) => {
  const parent = items[items.length - 2]
  const { t } = useTranslation('common')
  const { locale } = useRouter()

  return (
    <nav
      className="block relative pt-4 pb-2 mb-2 h-12 text-black"
      aria-label={t('breadcrumbs.title')}
    >
      {/* Mobile */}
      {parent && <MobileLink url={parent.url} title={parent.title} />}
      {!parent && (
        <MobileLink url={`/${locale}/`} title={t('breadcrumbs.frontpage')} />
      )}
      {/* Desktop navi */}
      <div className="hidden md:block justify-items-start">
        <div className="flex-wrap leading-5 ps-4">
          <Link
            href="/"
            passHref
            prefetch={false}
            locale={locale}
            className="flex-none md:text-body-small me-3"
            title={t('breadcrumbs.frontpage')}>

            <Icon icon="home" className="ifu-breadcrumb__icon--home" />

          </Link>

          <IconAngleRight
            className="me-3 ifu-breadcrumb__icon--arrow"
            aria-hidden
          />

          {items?.map(({ title, url, id }, i) => (
            <div key={`crumb-${id}`} className="inline-block">
              {i + 1 === items.length ? (
                <span
                  className="text-small md:text-body-small"
                  aria-current="page"
                >
                  {' '}
                  {title}
                </span>
              ) : (
                <Link
                  href={url}
                  passHref
                  prefetch={false}
                  locale={false}
                  className="text-small md:text-body-small hover:underline"
                  title={title}>

                  {title}

                </Link>
              )}
              {i + 1 < items.length && (
                <IconAngleRight
                  className=" mx-3 ifu-breadcrumb__icon--arrow"
                  aria-hidden
                />
              )}
            </div>
          ))}
        </div>
      </div>
    </nav>
  );
}

export default Breadcrumbs
