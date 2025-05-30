import { useRouter } from 'next/router'
import Link from 'next/link'
import { IconGlobe } from '@/components/Icons'
import cls from 'classnames'
import { useTranslation } from 'next-i18next'
import { i18n } from '@/next-i18next.config'
import { getLocalesForPath } from '@/lib/client-api'
import useSWR from 'swr'
import { useState, useEffect } from 'react'

const LanguageSelector = ({ openMenu }) => {
  const { locale, asPath: path } = useRouter()
  const { t } = useTranslation('common')
  const cacheKey = path ? path : null
  const fetcher = () => getLocalesForPath({ path })
  const { data: locales, error } = useSWR(cacheKey, fetcher)
  const [href, setHref] = useState('');

  // Do not cache the language selection links as the href will include
  // whatever the user might've included in the URL pathname and we do not
  // want other users to see that.
  useEffect(() => {
    setHref(path)
  }, [path])

  return (
    <>
      <div
        dir="ltr"
        className=" hidden lg:block text-action leading-10 divide-x xl:divide-x-0 divide-black me-4 md:ms-1"
      >
        <button
          className=" xl:hidden lg:px-0 pe-2 ps-2"
          onClick={openMenu}
          aria-haspopup="dialog"
        >
          <span className="hidden md:inline-block xl:hidden">
            {t('languageSelector.button')}
          </span>
          <IconGlobe className="xl:hidden mx-2 xl:mx-0 w-5 h-5" />
        </button>
        {i18n.supportedLanguages.map(({ text, code }) => {
          const isLocalized =
            locales?.find((page) => page?.locale === code) !== undefined
          return (
            <Link
              href={href}
              locale={code}
              passHref
              scroll={false}
              prefetch={false}
              key={`lang-${code}`}
              className={cls(
                'xl:inline-block px-3 2xl:px-4 font-bold text-center uppercase ',
                {
                  'text-black': error || !locales || isLocalized,
                  'text-gray': locales?.length > 0 && !isLocalized && !error,
                }
              )}
              title={text}
              hrefLang={code}
              lang={code}>

              <span
                className={cls('xl:hidden', {
                  ' border-b-2 border-black': locale === code,
                })}
              >
                {code === 'zh' ? text : code}
              </span>
              <span
                className={cls(
                  'hidden xl:inline-block hover:border-black border-b-2 transition-all ease duration-150',
                  {
                    'border-black': locale === code,
                    'border-white': locale !== code,
                  }
                )}
              >
                {text}
              </span>

            </Link>
          );
        })}
      </div>
    </>
  );
}

export default LanguageSelector
