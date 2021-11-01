import Link from 'next/link'
import { IconCheck, IconGlobe } from '../Icons'
import Drawer from '../layout/Drawer'
import { useRouter } from 'next/router'
import cls from 'classnames'
import useTranslation from 'next-translate/useTranslation'

import { languages } from '../../../i18n'

export const LanguageMenu = ({ closeMenu }) => {
  const { t } = useTranslation('common')

  const { pathname, query, locale } = useRouter()
  return (
    <div role="listbox">
      <label className="block px-14 mb-8 text-body-large font-bold">
        {t('languageMenu.label')}
      </label>
      {languages.map((lang) => {
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
              href={{ pathname, query }}
              locale={code}
              scroll={false}
            >
              <a
                role="option"
                aria-selected={code === locale}
                className="flex items-center py-2 px-14 hover:bg-gray-white clear-start"
                title={text}
                lang={code}
                hrefLang={code}
              >
                <span className="inline-block w-16 text-body-small font-bold text-gray-medium uppercase text-bodytext-color-op5 pe-8 float-start">
                  {code}
                </span>
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
  const { locale } = useRouter()
  // const { text } = languages.find(({ code }) => code === locale)
  return (
    <button
      title={t('languageMenu.label')}
      className=" block lg:hidden h-8 transform -translate-y-0.5 md:me-2"
      onClick={onClick}
    >
      <span className=" inline-block text-action uppercase">{locale}</span>
      {/* <span className=" hidden md:inline-block text-action uppercase">
        {text}
      </span> */}
      <IconGlobe className="mx-2 xl:mx-0 w-4 md:w-5 h-4 md:h-5" />
    </button>
  )
}
