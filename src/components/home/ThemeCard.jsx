import cls from 'classnames'
import Link from 'next/link'
import Image from 'next/image'
import { longTextClass } from '@/components/Typo'
import { RingsLoader } from '../Loaders'
import { useState } from 'react'

const MAX_TITLE_LENGTH = 40

const ThemeImage = ({ src, color}) => {
  const [loading, setLoading] = useState(true)

  return (
    <span className="hidden md:block relative rounded">
      {loading && <RingsLoader color={color} />}
      <Image
        src={src}
        // src={'/fioo'}
        height={220}
        width={460}
        onLoadingComplete={() => setLoading(false)}
        alt=""
        objectFit="cover"
        layout="responsive"
        className="rounded-t"
      />
    </span>
  )
}

const ThemeCard = ({ title, url, image, blue, green }) => (
  <Link passHref href={url} prefetch={false}>
    <a
      className={cls('rounded block', {
        'bg-blue-white hover:bg-blue-lighter shadow-themecard-blue': blue,
        'bg-green-lighter hover:bg-green-light shadow-themecard-green': green,
      })}
    >
      {image && <ThemeImage src={image} color={blue ? 'blue': 'green'} />}
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
