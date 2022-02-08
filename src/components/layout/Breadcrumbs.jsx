import Link from 'next/link'
import Icon, { IconAngleRight } from '@/components/Icons'
import { useTranslation } from 'next-i18next'

const MobileLink = ({ url, title }) => (
  <Link href={url} passHref prefetch={false}>
    <a
      className="md:hidden mb-4 text-small md:text-body-small hover:underline"
      title={title}
    >
      <IconAngleRight
        className=" transform scale-150 rotate-180 -translate-y-px fill-current me-3 ifu-breadcrumb__arrow"
        aria-hidden
      />

      <span className="inline-block transform -translate-x-1">{title}</span>
    </a>
  </Link>
)

const Breadcrumbs = ({ items }) => {
  const parent = items[items.length - 2]
  const { t } = useTranslation('common')

  return (
    <nav className="block relative pt-4 pb-2 mb-2 h-12 text-black">
      {/* Mobile */}
      {parent && <MobileLink url={parent.url} title={parent.title} />}

      {!parent && <MobileLink url="/" title={t('breadcrumbs.frontpage')} />}
      {/* Desktop navi */}
      <div className="hidden md:block justify-items-start">
        <div className="flex-none w-8 float-start">
          <Link href="/" passHref prefetch={false}>
            <a
              className="inline-block relative flex-none mt-1 text-small md:text-body-small"
              title="home"
            >
              <Icon
                icon="home"
                className=" absolute -top-1 transform scale-125 translate-y-1"
              />
            </a>
          </Link>
        </div>

        <div className="flex-wrap leading-5 ps-4">
          <div className="inline-block">
            <IconAngleRight
              className=" transform scale-150 fill-current me-3 ifu-breadcrumb__arrow"
              aria-hidden
            />
          </div>
          {items?.map(({ title, url, id }, i) => (
            <div key={`crumb-${id}`} className="inline-block">
              <Link href={url} passHref prefetch={false}>
                <a
                  className="text-small md:text-body-small hover:underline"
                  title={title}
                >
                  {title}
                </a>
              </Link>
              {i + 1 < items.length && (
                <IconAngleRight
                  className=" mx-3 transform scale-150 fill-current ifu-breadcrumb__arrow"
                  aria-hidden
                />
              )}
            </div>
          ))}
        </div>
      </div>
    </nav>
  )
}

export default Breadcrumbs
