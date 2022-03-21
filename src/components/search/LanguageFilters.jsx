import { i18n } from '@/next-i18next.config'
import { useTranslation } from 'next-i18next'
import { useEffect, useState } from 'react'
import { IconGlobe } from '../Icons'
import { IconCircleArrowRight } from '../Icons'
import { useRouter } from 'next/router'
const getLangMap = (languages) =>
  i18n.locales.reduce((obj, lang) => {
    obj[lang] = languages?.includes(lang)
    return obj
  }, {})
const LanguageFilters = () => {
  const { t } = useTranslation('common')
  const { query, locale } = useRouter()
  const { languages } = query
  const [selectedLanguages, setLanguages] = useState(getLangMap(languages))
  const [show, setShow] = useState(false)
  console.log(selectedLanguages)
  const toggle = () => setShow(!show)

  useEffect(() => {
    setLanguages(getLangMap(languages))
  }, [languages])


return ( <div className="flex absolute -bottom-24 lg:-bottom-10 left-0 flex-wrap items-center">
          <span className="inline-block">
            <IconGlobe
              className="w-6 h-6 me-2"
              title={t('languageMenu.label')}
              disabled
            />
          </span>
          {!show && (
            <button type="button" onClick={toggle}>
              <IconCircleArrowRight className=" w-5 h-5" />
            </button>
          )}
          {show &&


          i18n.languages.map(({ code, text }) => {
            const id = `query-lang-${code}`

            return (
              <label
                htmlFor={id}
                key={id}
                className="flex items-center me-2"
                title={text}
              >
                {code.toUpperCase()}
                <input
                  type="checkbox"
                  className="ifu-search__input--checkbox"
                  onChange={() => {
                    setLanguages({
                      ...selectedLanguages,
                      [code]: !selectedLanguages[code],
                    })
                  }}
                  checked={code === locale || selectedLanguages[code]||false}
                  disabled={code === locale}
                  name="languages"
                  id={id}
                  value={code}
                  title={text}
                />
              </label>
            )
          })
          }
          {show && (
            <button type="button" onClick={toggle}>
              <IconCircleArrowRight className="w-5 h-5 rotate-180" />
            </button>
          )}
        </div>)


}

export default LanguageFilters
