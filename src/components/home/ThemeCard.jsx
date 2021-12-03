import cls from 'classnames'
import Link from 'next/link'
import Image from 'next/image'
import { longTextClass } from '@/components/Typo'

const MAX_TITLE_LENGTH = 40

const ThemeCard = ({ title, url, image, blue, green }) => (
  <Link passHref href={url} prefetch={false}>
    <a
      className={cls('rounded block', {
        'bg-blue-white hover:bg-blue-lighter shadow-themecard-blue': blue,
        'bg-green-lighter hover:bg-green-light shadow-themecard-green': green,
      })}
    >
      {image && (
        <span className="hidden md:block rounded">
          <Image
            src={image}
            height={100}
            width={300}
            alt=""
            layout="responsive"
            className="rounded-t"
          />
        </span>
      )}
      <span className="flex md:h-24">
        <span
          className={cls(
            'px-4 font-bold  my-4',
            longTextClass(title, {
              size: MAX_TITLE_LENGTH,
              classes: ['text-body-large', 'text-body'],
            })
          )}
        >
          {title}
        </span>
      </span>
    </a>
  </Link>
)

export default ThemeCard
