const languages = [
  { code: 'fi', text: 'Suomi' },
  { code: 'sv', text: 'Svenska' },
  { code: 'en', text: 'English' },
  { code: 'ru', text: 'Pусский' },
  { code: 'et', text: 'Eesti keel' },
  { code: 'uk', text: 'Українська' },
  { code: 'fr', text: 'Français' },
  { code: 'so', text: 'Soomaali' },
  { code: 'es', text: 'Español' },
  { code: 'tr', text: 'Türkçe' },
  { code: 'zh', text: '中文' },
  { code: 'fa', text: ' فارسی' },
  { code: 'ar', text: 'العربية' },
]
const rtlLocales = ['ar', 'fa']
const disabledLocales = ['so']
const locales = languages.map(({ code }) => code)
const supportedLanguages = languages.filter(
  ({ code }) => !disabledLocales.includes(code)
)
const supportedLocales = locales.filter(
  (code) => !disabledLocales.includes(code)
)

const DIRECTION_LTR = 'ltr'
const DIRECTION_RTL = 'rtl'

module.exports = {
  i18n: {
    locales,
    defaultLocale: 'en',
  },
  reloadOnPrerender: process.env.NODE_ENV === 'development',
  i18nCustom: {
    disabledLocales,
    supportedLocales,
    supportedLanguages,
    languages,
    rtlLocales,
    fallbackLocale: 'fi',
    DIRECTION_LTR,
    DIRECTION_RTL,
    // localeDetection: false,
  }
}
