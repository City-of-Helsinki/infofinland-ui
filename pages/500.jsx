import { useRouter } from 'next/router'
import cls from 'classnames'
import map from 'lodash/map'
import omit from 'lodash/omit'
import { BlankLayout } from '@/components/layout/Layout'
import CommonHead from '@/components/layout/CommonHead'
import { longTextClass } from '@/components/Typo'
import { i18n } from '@/next-i18next.config'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'
import { IconExclamationBubble } from '@/components/Icons'
import InfoFinlandLogoSVG from '@/components/logo'
export async function getStaticProps(context) {
  return {
    props: {
      ...(await serverSideTranslations(context.defaultLocale, ['common'])),
    },
  }
}

const TEXTS = {
  fi: {
    title: 'Sivustolla tapahtui virhe',
    help: 'Lataa sivu uudestaan',
  },
  sv: {
    title: 'Det har uppstått ett fel på webbplatsen',
    help: 'Ladda om sidan',
  },
  en: {
    title: 'Something went wrong',
    help: 'Try to refresh the page',
  },
  ru: {
    title: 'Перезагрузить страницу',
    help: 'Перейти к содержанию',
  },
  et: {
    title: 'Saidil ilmnes viga',
    help: 'Laadi leht uuesti',
  },
  fr: {
    title: 'Une erreur s’est produite sur la page',
    help: 'Télécharger à nouveau la page',
  },
  so: {
    title: 'Khalad baa bogga ka dhacay',
    help: 'Markale dib u soo kici bogga',
  },
  uk: {
    title: 'Виникла помилка',
    help: 'Перезавантажити сторінку',
  },
  es: {
    title: 'Se ha producido un error en el portal',
    help: 'Recargue la página.',
  },
  tr: {
    title: 'Sayfada hata oluştu',
    help: 'Sayfayı yeniden yükleyin',
  },
  zh: { title: '网站出现错误', help: '重新载入页面' },
  fa: {
    title: 'در صفحات خطا پیش آمد',
    help: 'این صفحه را دو باره بارگذاری کنید',
  },
  ar: {
    title: 'این صفحه را دو باره بارگذاری کنید',
    help: 'حمّل الصفحة من جديد',
  },
}

const Error500 = () => {
  const { locale } = useRouter()
  const content = omit(TEXTS, locale)

  return (
    <>
      <CommonHead
        node={{
          title: TEXTS[locale].title,
          field_description: TEXTS[locale].help,
        }}
        key="head-500"
      />
      <BlankLayout>
        <div className="py-4 border-t border-b border-gray-lighter fmb-8">
          <div className="md:mx-auto md:max-w-4xl">
            {/* eslint-disable-next-line @next/next/no-html-link-for-pages */}
            <a href="/">
              <InfoFinlandLogoSVG />
            </a>
          </div>
        </div>
        <div
          className={cls(
            'flex items-center border-s-10 border-neon-pink shadow-404title rounded h-32 mt-6 md:mt-12',
            'mx-2 md:px-6 md:mx-auto md:max-w-4xl'
          )}
        >
          <span className="flex-none px-4 font-bold">
            <IconExclamationBubble className=" h-56 scale-150 fill-red me-4 lg:me-0" />
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
            'mx-4 md:px-6 md:mx-auto md:max-w-4xl'
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
                dir={i18n.rtlLocales.includes(locale) ? 'rtl' : 'ltr'}
              >
                <p className="text-body-small font-bold">{title}</p>
                <p className="text-body-small">{help}</p>
              </div>
            )
          })}
        </div>
      </BlankLayout>
    </>
  )
}

export default Error500
