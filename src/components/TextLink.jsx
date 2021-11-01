import Link from 'next/link'
import cls from 'classnames'

const TextLink = ({ href, className, children, ...linkProps }) => (
  <Link href={href} passHref>
    <a className={cls('ifu-text-link', className)} {...linkProps}>
      {children}
    </a>
  </Link>
)

export default TextLink
