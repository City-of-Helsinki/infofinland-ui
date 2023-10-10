import Link from 'next/link'
import cls from 'classnames'

const TextLink = ({
  href,
  className,
  children,
  locale = false,
  ...linkProps
}) => {
  // IFU-807 - Drupal api returns newline and it needs to be trimmed
  const text = typeof children === 'string' ? children.trim() : children

  return (
    <Link href={href} passHref prefetch={false} locale={locale}>
      <a className={cls('ifu-text-link', className)} {...linkProps}>
        {text}
      </a>
    </Link>
  )
}

export default TextLink
