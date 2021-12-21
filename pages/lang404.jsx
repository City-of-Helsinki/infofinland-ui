import { getCommonApiContent } from '@/lib/ssr-api'
import PageNotFound from './404'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'
import getConfig from 'next/config'

const TEXTS = {
  fi: {
    title: 'Sivua ei löydy tällä kielellä',
    help: 'Valitettavasti sivua ei ole valitsemallasi kielellä.',
  },
  sv: {
    title: 'Sidan finns inte på detta språk',
    help: 'Tyvärr finns sidan inte på det språk du har valt.',
  },
  en: {
    title: 'Page not found in this language',
    help: 'Unfortunately, the page does not exist in the language of your choice.',
  },
  ru: {
    title: 'Страница на данном языке не найдена',
    help: 'К сожалению, страницы на выбранном вами языке, не существует.',
  },
  et: {
    title: 'Leht ei ole selles keeles saadaval',
    help: 'Kahjuks ei ole leht sinu valitud keeles saadaval.',
  },
  fr: {
    title: 'La page est introuvable dans cette langue',
    help: 'Malheureusement, cette page n’est pas disponible dans la langue sélectionnée.',
  },
  so: {
    title: 'Luqaddan bogga laguma helo',
    help: 'Nasiibdarro luqadda aad dooratay kuma jirto bogga.',
  },
  es: {
    title: 'La página no existe en este idioma',
    help: 'Lamentablemente, la página no existe en el idioma que ha elegido.',
  },
  tr: {
    title: 'Sayfa bu dilde mevcut değil',
    help: 'Ne yazık ki sayfa seçtiğiniz dilde mevcut değil.',
  },
  zh: {
    title: '本页不支持该语言',
    help: '很遗憾！本页不支持您所选的语言您可通过下列语言了解相关信息：',
  },
  fa: {
    title: 'ین صفحه در حال حاضر در دسترس نیست',
    help: 'می توانید در مورد این موضوع به زبان های زیر اطلاعات کسب کنید.',
  },
  ar: {
    title: 'الصفحة غير متوفرة بهذه اللغة',
    help: 'تجد معلومات عن الموضوع باللغات التالية',
  },
}

export async function getStaticProps(context) {
  const { serverRuntimeConfig } = getConfig()

  const common = await getCommonApiContent(context)
  return {
    props: {
      texts: TEXTS,
      ...common,
      ...(await serverSideTranslations(context.defaultLocale, ['common'])),
    },
    revalidate: serverRuntimeConfig.REVALIDATE_TIME,
  }
}

export default PageNotFound
