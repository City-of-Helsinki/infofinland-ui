import cls from 'classnames'

export const longTextClass = (text, { size, classes: [short, long] }) =>
  cls({
    [short]: text.length < size,
    [long]: text.length >= size,
  })

export const H1 = ({ children, text, className }) => (
  <h1
    className={cls(
      'text-bodytext-color font-sans text-h1 md:text-h1xl',
      className
    )}
  >
    {text}
    {children}
  </h1>
)

export const H2 = ({ children, className }) => (
  <h2
    className={cls(
      'text-bodytext-color font-sans text-h2 md:text-h2xl',
      className
    )}
  >
    {children}
  </h2>
)

export const H3 = ({ children, className }) => (
  <h3
    className={cls(
      'text-bodytext-color font-sans text-h3 md:text-h3xl',
      className
    )}
  >
    {children}
  </h3>
)

export const H4 = ({ children, className, bold }) => (
  <h4
    className={cls(
      'text-bodytext-color font-sans text-h4 md:text-h4xl',
      className,
      {
        'font-bold': bold,
      }
    )}
  >
    {children}
  </h4>
)

export const H5 = ({ children, className, bold }) => (
  <h4
    className={cls(
      'text-bodytext-color font-sans text-h5 md:text-h5xl',
      className,
      {
        'font-bold': bold,
      }
    )}
  >
    {children}
  </h4>
)

export const H6 = ({ children, className, bold }) => (
  <h4
    className={cls('text-bodytext-color font-sans text-h6', className, {
      'font-bold': bold,
    })}
  >
    {children}
  </h4>
)

export const HR = ({ className }) => <hr className={cls('my-8', className)} />
