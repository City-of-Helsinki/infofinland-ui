import Layout from '@/components/layout/Layout'
import { useRouter } from 'next/router'
import cls from 'classnames'
import { longTextClass } from '@/components/Typo'
import { i18n } from '@/next-i18next.config'
import map from 'lodash/map'
import omit from 'lodash/omit'
import { getCachedMenus } from '@/lib/ssr-api'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'
import getConfig from 'next/config'
import TextLink from '@/components/TextLink'
import { DotsLoader } from '@/components/Loaders'
import Block from '@/components/layout/Block'
import { getLocalesForPath } from '@/lib/client-api'
import useSWR from 'swr'
import CommonHead from '@/components/layout/CommonHead'

export async function getStaticProps(context) {
  // const { REVALIDATE_TIME } = getConfig().serverRuntimeConfig
  const menus = await getCachedMenus(context.locale)
  return {
    props: {
      texts: TEXTS_404,
      menus,
      ...(await serverSideTranslations(context.defaultLocale, ['common'])),
    },
    // revalidate: REVALIDATE_TIME,
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
  uk: {
    title: 'Сторінку не знайдено',
    help: 'Потрібну сторінку можна шукати за допомогою функції пошуку або на карті сайту.',
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

const TEXTS_LANG_404 = {
  fi: {
    title: 'Sivua ei löydy tällä kielellä',
    help: 'Valitettavasti sivua ei ole valitsemallasi kielellä.',
    languages: 'Löydät tietoa aiheesta seuraavilla kielillä:',
  },
  sv: {
    title: 'Sidan finns inte på detta språk',
    help: 'Tyvärr finns sidan inte på det språk du har valt.',
    languages: 'Du hittar information om ärendet på följande språk:',
  },
  en: {
    title: 'Page not found in this language',
    help: 'Unfortunately, the page does not exist in the language of your choice.',
    languages: 'Information is available in the following languages:',
  },
  ru: {
    title: 'Страница на данном языке не найдена',
    help: 'К сожалению, страницы на выбранном вами языке, не существует.',
    languages: 'Информация по теме доступна на следующих языках:',
  },
  et: {
    title: 'Leht ei ole selles keeles saadaval',
    help: 'Kahjuks ei ole leht sinu valitud keeles saadaval.',
    languages: 'Leiad teema kohta teavet järgmistes keeltes:',
  },
  fr: {
    title: 'La page est introuvable dans cette langue',
    help: 'Malheureusement, cette page n’est pas disponible dans la langue sélectionnée.',
    languages:
      'Vous trouverez davantage d’informations sur le sujet dans les langues suivantes :',
  },
  so: {
    title: 'Luqaddan bogga laguma helo',
    help: 'Nasiibdarro luqadda aad dooratay kuma jirto bogga.',
    languages:
      'Macluumaadka ku saabsan mowduucan waxaad ku heleysaa luqadaha soo socda:',
  },
  uk: {
    title: 'Сторінка цією мовою не знайдена',
    help: 'На жаль, сторінки вибраною вами мовою не існує.',
    languages: 'Інформація на цю тему доступна такими мовами:',
  },
  es: {
    title: 'La página no existe en este idioma',
    help: 'Lamentablemente, la página no existe en el idioma que ha elegido.',
    languages:
      'Encontrará información sobre este tema en los siguientes idiomas:',
  },
  tr: {
    title: 'Sayfa bu dilde mevcut değil',
    help: 'Ne yazık ki sayfa seçtiğiniz dilde mevcut değil.',
    languages: 'Konuyla ilgili bilgiyi aşağıdaki dillerde bulabilirsiniz:',
  },
  zh: {
    title: '本页不支持该语言',
    help: '很遗憾！',
    languages: '本页不支持您所选的语言您可通过下列语言了解相关信息：',
  },
  fa: {
    title: 'ین صفحه در حال حاضر در دسترس نیست',
    help: 'متأسفانه این صفحه به زبانی که انتخاب کردید وجود ندارد. ',
    languages: 'می توانید در مورد این موضوع به زبان های زیر اطلاعات کسب کنید:',
  },
  ar: {
    title: 'الصفحة غير متوفرة بهذه اللغة',
    help: 'للأسف الصفحة غير متوفرة باللغة التي اخترتها. ',
    languages: 'تجد معلومات عن الموضوع باللغات التالية:',
  },
}

const LocalesLinks = ({ locales, dir }) => {
  return (
    <p className="overflow-hidden mt-2 leading-loose">
      {locales.map(({ locale, path, id }, i) => {
        const language = i18n.languages.find(({ code }) => code === locale)
        if (!language) {
          return null
        }
        return (
          <TextLink
            dir={dir}
            key={`langlink-for-${locale}-${id}`}
            locale={locale}
            href={path}
            className={cls('float-start inline-block', {})}
          >
            <span
              className={cls({
                'pe-2': i === 0,
                'px-2 border-black': i > 0,
                'border-s': dir === i18n.DIRECTION_LTR && i > 0,
                'border-r': dir === i18n.DIRECTION_RTL && i > 0,
              })}
            >
              {language.text}
            </span>
          </TextLink>
        )
      })}
    </p>
  )
}

const Texts404 = ({ locales = [], locale, path }) => {
  // if there are no localizations, show basic-404
  // if all localizations exist, page is not shown for other reasons. Show basic 404
  // if some localizations exist, show available-languages-404
  const texts =
    locales.length > 0 || locales.length === i18n.locales.length
      ? TEXTS_LANG_404
      : TEXTS_404
  const content = omit(texts, locale)
  return (
    <>
      <CommonHead
        node={{
          title: texts[locale].title,
          field_description: texts[locale].help,
        }}
        key={`head-404-${path}`}
      />

      <div
        className={cls(
          'flex items-center border-s-10 border-neon-pink shadow-404title rounded h-32 mt-6 md:mt-12',
          'mx-2 md:px-6 lg:px-12 lg:mx-12  xl:mx-28 2xl:mx-48  3xl:ms-64  3xl:max-w-4xl'
        )}
      >
        <span
          className="flex-none px-4 text-h2 md:text-h1xl font-bold"
          aria-hidden
        >
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
            {locales.length === 0 && texts[locale].help}
          </span>
        </h1>
      </div>
      <div className="pb-8 mt-10 border-b border-gray-lighter ifu-block--hero">
        {locales.length > 0 && (
          <>
            <p className="mb-2 lg:mb-0 lg:text-body-large font-bold leading-snug lg:leading-normal">
              {texts[locale].help}
            </p>

            {texts[locale].languages}
            <LocalesLinks
              locales={locales}
              dir={
                i18n.rtlLocales.includes(locale)
                  ? i18n.DIRECTION_RTL
                  : i18n.DIRECTION_LTR
              }
            />
          </>
        )}
      </div>

      <div className="lg:grid md:grid-rows-6 md:grid-flow-col md:gap-x-32 md:gap-y-8 mt-8 mb-8 md:mb-16 ifu-block--hero">
        {map(content, ({ title, help }, additionalLocale) => {
          const dir = i18n.rtlLocales.includes(additionalLocale)
            ? i18n.DIRECTION_RTL
            : i18n.DIRECTION_LTR
          return (
            <div
              key={`${additionalLocale}-content`}
              lang={additionalLocale}
              className="mb-8 lg:mb-0 text-body-small"
              dir={dir}
            >
              <p className="font-bold leading-loose">{title}</p>
              <p className="">{help}</p>

              {locales.length > 0 && <p>{texts[additionalLocale].languages}</p>}

              {locales.length > 0 && (
                <LocalesLinks locales={locales} dir={dir} />
              )}
            </div>
          )
        })}
      </div>
    </>
  )
}

export const PageNotFound = ({ menus }) => {
  const { locale, asPath } = useRouter()
  const cacheKey = asPath ? asPath : null
  const fetcher = () => getLocalesForPath({ path: asPath })
  const { data: locales, error } = useSWR(cacheKey, fetcher)

  return (
    <Layout menus={menus}>
      {!locales && !error && (
        <Block>
          <div className="flex justify-center items-center w-full h-64">
            <DotsLoader />
          </div>
        </Block>
      )}

      {(locales || error) && (
        <Texts404 locales={locales} locale={locale} path={asPath} />
      )}
    </Layout>
  )
}

export default PageNotFound
