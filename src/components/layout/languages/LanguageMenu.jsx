import Link from 'next/link'
import { IconCheck, IconGlobe } from '@/components/Icons'
import Drawer from '@/components/layout/Drawer'
import { useRouter } from 'next/router'
import cls from 'classnames'

import { useTranslation } from 'next-i18next'

import { i18n } from '@/next-i18next.config'

//For accessibility and to avoid over-engineering and excessive imports,
// Label translations are copied here for multi lang use.
const LABELS = {
  fi: 'Valitse kieli',
  sv: 'Välj språk',
  en: 'Select language',
  ru: 'Выбрать язык',
  et: 'Vali keel',
  fr: 'Sélectionner la langue',
  so: 'Dooro luqadda',
  es: 'Elegir idioma',
  tr: 'Dil seçin',
  zh: '选择语言',
  fa: 'زبان را انتخاب کن',
  ar: 'اختر اللغة',
}

export const LanguageMenu = ({ closeMenu }) => {
  const { t } = useTranslation('common')
  const { asPath, locale } = useRouter()
  return (
    <div>
      <label className="block px-14 mb-8 text-body-large font-bold">
        {t('languageMenu.label')}
      </label>
      {i18n.supportedLanguages.map((lang) => {
        const { text, code } = lang
        const isSelected = locale === code
        return (
          <div
            onClick={closeMenu}
            key={`lang-${code}`}
            className={cls({
              'font-bold': isSelected,
            })}
          >
            <Link
              passHref
              href={asPath}
              locale={code}
              scroll={false}
              prefetch={false}
            >
              <a
                className={cls(
                  'flex items-center py-2 px-14 hover:bg-gray-white clear-start',
                  {
                    // 'system-zh-font':code === 'zh'
                  }
                )}
                title={text}
                lang={code}
                hrefLang={code}
              >
                <span className="inline-block text-body-small text-bodytext-color float-start">
                  {text}
                </span>
                {isSelected && <IconCheck className="ms-4" />}
              </a>
            </Link>
          </div>
        )
      })}
    </div>
  )
}

export const LangMenuDrawer = ({ closeMenu, isOpen }) => (
  <Drawer close={closeMenu} isOpen={isOpen}>
    <LanguageMenu closeMenu={closeMenu} />
  </Drawer>
)

export const LanguageMenuButton = ({ onClick }) => {
  const { t } = useTranslation('common')
  let { locale } = useRouter()
  if (i18n.disabledLocales.includes(locale)) {
    locale = i18n.defaultLocale
  }

  const { text } = i18n.supportedLanguages.find(({ code }) => code === locale)
  const assisted = i18n.supportedLanguages.filter(({ code }) => code !== locale)
  return (
    <button
      aria-haspopup="dialog"
      title={t('languageMenu.label')}
      className=" flex lg:hidden items-center h-10 md:me-2"
      onClick={onClick}
    >
      <span className="text-action uppercase">{text}</span>
      {assisted.map(({ code }) => (
        <span className="hidden" key={`assist-label-${code}`} lang={code}>
          {LABELS[code]}
        </span>
      ))}
      <IconGlobe className="mx-2 xl:mx-0 w-4 md:w-5 md:h-5" />
    </button>
  )
}
