import { i18n } from '@/next-i18next.config'
import { useEffect, useState } from 'react'
import { useRouter } from 'next/router'
const getLangMap = (languages) =>
  i18n.locales.reduce((obj, lang) => {
    obj[lang] = languages?.includes(lang)
    return obj
  }, {})
const LanguageFilters = () => {
  const { query, locale } = useRouter()
  const { languages } = query
  const [selectedLanguages, setLanguages] = useState(getLangMap(languages))

  useEffect(() => {
    setLanguages(getLangMap(languages))
  }, [languages])

  return i18n.languages.map(({ code, text }) => {
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
          checked={code === locale || selectedLanguages[code]}
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

export default LanguageFilters
