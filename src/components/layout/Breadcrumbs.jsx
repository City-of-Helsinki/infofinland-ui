import Link from 'next/link'

import Icon, { IconAngleRight } from '@/components/Icons'

const Breadcrumbs = ({ pages }) => (
  <nav className="block relative py-2 mt-3 mb-2 text-black">
    <div className=" justify-items-start">
      <div className="flex-none w-8 float-start">
        <Link href="/" passHref>
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
        {pages.map(({ text, url }, i) => (
          <div key={`crumb-${i}-${text}`} className="inline-block">
            <Link href={url} passHref>
              <a
                className="text-small md:text-body-small hover:underline"
                title={text}
              >
                {text}
              </a>
            </Link>
            {i + 1 < pages.length && (
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

export default Breadcrumbs
