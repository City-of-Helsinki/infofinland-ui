import cls from 'classnames'
import Link from 'next/link'
import Image from 'next/image'
import { longTextClass } from '@/components/Typo'

const MAX_TITLE_LENGTH = 40

const ThemeCard = ({ title, url, image, blue, green }) => (
  <div
    className={cls('rounded', {
      'bg-blue-white hover:bg-blue-lighter shadow-themecard-blue': blue,
      'bg-green-lighter hover:bg-green-light shadow-themecard-green': green,
    })}
  >
    {image && (
      <div className="hidden md:block rounded">
        <Image
          src={image}
          alt={title}
          layout="responsive"
          className="rounded-t"
        />
      </div>
    )}
    <div className="flex md:h-24">
      <p
        className={cls(
          'px-4 font-bold  my-4',
          longTextClass(title, {
            size: MAX_TITLE_LENGTH,
            classes: ['text-body-large', 'text-body'],
          })
        )}
      >
        <Link passHref href={url}>
          <a className="block">{title}</a>
        </Link>
      </p>
    </div>
  </div>
)

export default ThemeCard
