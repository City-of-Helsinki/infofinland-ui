import Link from 'next/link'
import cls from 'classnames'
import Icon, { IconAngleRight } from '@/components/Icons'

const Breadcrumbs = ({ items }) => {
  const parent = items?.at(-2)
  const showBreadcrumbs = items?.length > 1
  return (
    <nav className="block relative pt-4 pb-2 mb-2 text-black">
      {/* Mobile */}
      {parent && (
        <Link href={parent.url} passHref prefetch={false}>
          <a
            className="md:hidden mb-4 text-small md:text-body-small hover:underline"
            title={parent.title}
          >
            <IconAngleRight
              className=" transform scale-150 rotate-180 -translate-y-px fill-current me-3 ifu-breadcrumb__arrow"
              aria-hidden
            />

            <span className="inline-block transform -translate-x-1">
              {parent.title}
            </span>
          </a>
        </Link>
      )}
      {/* Desktop navi */}
      <div
        className={cls('hidden md:block justify-items-start', {
          'h-6': !showBreadcrumbs,
        })}
      >
        {showBreadcrumbs && (
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
        )}
        <div className="flex-wrap leading-5 ps-4">
          {showBreadcrumbs && (
            <div className="inline-block">
              <IconAngleRight
                className=" transform scale-150 fill-current me-3 ifu-breadcrumb__arrow"
                aria-hidden
              />
            </div>
          )}
          {showBreadcrumbs &&
            items?.map(({ title, url }, i) => (
              <div key={`crumb-${i}-${title}`} className="inline-block">
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
