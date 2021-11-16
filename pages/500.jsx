import Head from 'next/head'
import { useRouter } from 'next/router'
import cls from 'classnames'
import { map, omit } from 'lodash'

import Layout from '@/components/layout/Layout'
import { HERO_MARGIN } from '@/components/article/Article'
import { longTextClass } from '@/components/Typo'
import { rtlLocales } from '@/i18n'

const TEXTS = {
  fi: {
    title: 'Sivustolla tapahtui virhe',
    help: 'Lataa sivu uudestaan',
  },
  sv: {
    title: '?',
    help: '?',
  },
  en: {
    title: 'Something went wrong',
    help: 'Try to refresh the page',
  },
  ru: {
    title: '?',
    help: '?',
  },
  et: {
    title: '?',
    help: '?',
  },
  fr: {
    title: '?',
    help: '?',
  },
  so: {
    title: '?',
    help: '?',
  },
  es: {
    title: '?',
    help: '?',
  },
  tr: {
    title: '?',
    help: '?',
  },
  zh: { title: '?', help: '?' },
  fa: {
    title: '?',
    help: '?',
  },
  ar: {
    title: '?',
    help: '?',
  },
}

const Error500 = () => {
  const { locale } = useRouter()
  const content = omit(TEXTS, locale)

  return (
    <Layout>
      <Head>
        <title>{TEXTS[locale].title}</title>
      </Head>

      <div
        className={cls(
          'flex items-center border-s-10 border-neon-pink shadow-404title rounded h-32 mt-6 md:mt-12',
          'mx-2 md:px-6 lg:px-12 lg:mx-12  xl:mx-28 2xl:mx-48  3xl:ms-64  3xl:max-w-4xl'
        )}
      >
        <span className="flex-none px-4 text-h2 md:text-h1xl font-bold">
          500
        </span>

        <h1 className="flex-grow text-body md:text-body-large md:ms-6 lg:ms-12">
          {TEXTS[locale].title}
          <span
            className={cls(
              'hidden md:block',
              longTextClass(TEXTS[locale].help, {
                size: 50,
                classes: ['text-body md:text-body-large', 'text-small'],
              })
            )}
          >
            {TEXTS[locale].help}
          </span>
        </h1>
      </div>
      <div
        className={cls(
          'lg:grid md:grid-rows-6 md:grid-flow-col md:gap-y-8 md:gap-x-32 mt-8 md:mt-16 mb-8 md:mb-16',
          HERO_MARGIN
        )}
      >
        <p className="block md:hidden mb-8 text-body-small">
          {TEXTS[locale].help}
        </p>
        {map(content, ({ title, help }, locale) => {
          return (
            <div
              key={`${locale}-content`}
              lang={locale}
              className="mb-8 lg:mb-0"
              dir={rtlLocales.includes(locale) ? 'rtl' : 'ltr'}
            >
              <p className="text-body-small font-bold">{title}</p>
              <p className="text-body-small">{help}</p>
            </div>
          )
        })}
      </div>
    </Layout>
  )
}

export default Error500
