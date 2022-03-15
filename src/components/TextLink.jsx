import Link from 'next/link'
import cls from 'classnames'

const TextLink = ({
  href,
  className,
  children,
  locale = false,
  ...linkProps
}) => (
  <Link href={href} passHref prefetch={false} locale={locale}>
    <a className={cls('ifu-text-link', className)} {...linkProps}>
      {children}
    </a>
  </Link>
)

export default TextLink
