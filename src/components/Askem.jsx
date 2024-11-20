import cls from 'classnames'
import { useAskem } from '@/hooks/useAskem'
import { useRouter } from 'next/router'

export const Askem = ({locale}) => {
  useAskem(locale);
  return (
    <section className="feedback">
      <div
        className={cls(
          'askem px-2 lg:px-0 lg:mx-12 xl:mx-28 2xl:mx-48  3xl:ms-64  3xl:max-w-4xl',
          'h-20'
        )}
      >
        askem askem {locale}
      </div>
    </section>
  )
}
