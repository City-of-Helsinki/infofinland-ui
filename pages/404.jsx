import Head from 'next/head'
import Layout from '@/components/layout/Layout'
import { useRouter } from 'next/router'
import cls from 'classnames'
import { longTextClass } from '@/components/Typo'
import { i18n } from '@/next-i18next.config'
import { map, omit } from 'lodash'
import * as DrupalApi from '@/lib/ssr-api'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'
import getConfig from 'next/config'

export async function getStaticProps(context) {
  const { serverRuntimeConfig } = getConfig()

  const common = await DrupalApi.getCommonApiContent(context)
  return {
    props: {
      texts: TEXTS_404,
      ...common,
      ...(await serverSideTranslations(context.defaultLocale, ['common'])),
    },
    revalidate: serverRuntimeConfig.REVALIDATE_TIME,
  }
}

const TEXTS_404 = {
  fi: {
    title: 'Sivua ei löydy.',
    help: 'Voit etsiä sivun haulla tai sivukartasta.',
  },
  sv: {
    title: 'Sidan kunde inte hittas.',
    help: 'Du kan söka efter sidan med hjälp av sökfunktionen eller via webbplatsöversikten.',
  },
  en: {
    title: 'Page not found',
    help: 'You can locate the page you were looking for by using the search function or the site map.',
  },
  ru: {
    title: 'Страница не найдена',
    help: 'Искать необходимую страницу можно с помощью поиска или на карте сайте.',
  },
  et: {
    title: 'Lehekülge ei leitud',
    help: 'VVõid otsida lehekülge otsingu abil või sisujuhist.',
  },
  fr: {
    title: 'La page est introuvable',
    help: 'VVous pouvez chercher la page en effectuant une recherche ou sur le plan du site.',
  },
  so: {
    title: 'Bogga lama helin',
    help: 'Ku raadi bogga raadinta ama ka raadi kaartada bogga.',
  },
  es: {
    title: 'Página no localizada',
    help: 'Puede buscar la página correspondiente mediante “acceso” o a través del mapa de sitio.',
  },
  tr: {
    title: 'Sayfa bulunamadı',
    help: 'İstediğiniz sayfayı arama bölümünden ya da site haritasından arayabilirsiniz.',
  },
  zh: { title: '无法找到该页', help: '您可搜寻网页或网页地图。' },
  fa: {
    title: ' صفحه مورد نظر یافت نشد',
    help: '.می توانید صفحه مورد نظر خود را با استفاده از جستجوگر و یا با مراجعه به نقشه سایت، جستجو کنید.',
  },
  ar: {
    title: 'لم يتم العثور على الصفحة',
    help: 'يمكنك أن تبحث عن الصفحة بالبحث العام أو من خريطة الموقع.',
  },
}

const PageNotFound = ({ texts }) => {
  const { locale } = useRouter()
  const content = omit(texts, locale)

  return (
    <Layout>
      <Head>
        <title>{texts[locale].title}</title>
      </Head>

      <div
        className={cls(
          'flex items-center border-s-10 border-neon-pink shadow-404title rounded h-32 mt-6 md:mt-12',
          'mx-2 md:px-6 lg:px-12 lg:mx-12  xl:mx-28 2xl:mx-48  3xl:ms-64  3xl:max-w-4xl'
        )}
      >
        <span className="flex-none px-4 text-h2 md:text-h1xl font-bold">
          404
        </span>

        <h1 className="flex-grow text-body md:text-body-large md:ms-6 lg:ms-12">
          {texts[locale].title}
          <span
            className={cls(
              'hidden md:block',
              longTextClass(texts[locale].help, {
                size: 50,
                classes: ['text-body md:text-body-large', 'text-small'],
              })
            )}
          >
            {texts[locale].help}
          </span>
        </h1>
      </div>
      <div className="lg:grid md:grid-rows-6 md:grid-flow-col md:gap-x-32 md:gap-y-8 mt-8 md:mt-16 mb-8 md:mb-16 ifu-block--hero">
        <p className="block md:hidden mb-8 text-body-small">
          {texts[locale].help}
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
    </Layout>
  )
}

export default PageNotFound
