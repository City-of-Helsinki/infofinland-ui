import cls from 'classnames'
import { IconCross } from '@/components/Icons'

import { useTranslation } from 'next-i18next';

const Button = ({ children, className, ...buttonProps }) => (
  <button className={cls('ifu-button', className)} {...buttonProps}>
    {children}
  </button>
)

export default Button

export const LinkButton = ({ children, className, ...buttonProps }) => (
  <button
    className={cls(
      'ifu-text-link  px-4 py-2 leading-6  font-sans font-bold',
      className
    )}
    {...buttonProps}
  >
    {children}
  </button>
)

export const CloseButton = ({ close, className }) => {
  const { t } = useTranslation('common')

  return (
    <button
      className={cls('flex items-center mt-4 me-3', className)}
      onClick={close}
    >
      <span className="inline-block px-1 text-small">{t('buttons.close')}</span>
      <IconCross className="inline-block text-black transform -translate-y-0.5 fill-current" />
    </button>
  )
}
