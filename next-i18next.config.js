const languages = [
  { code: 'fi', text: 'Suomi' },
  { code: 'sv', text: 'Svenska' },
  { code: 'en', text: 'English' },
  { code: 'ru', text: 'Pусский' },
  { code: 'et', text: 'Eesti keel' },
  { code: 'fr', text: 'Français' },
  { code: 'so', text: 'Soomaali' },
  { code: 'es', text: 'Español' },
  { code: 'tr', text: 'Türkçe' },
  { code: 'zh', text: '中文' },
  { code: 'fa', text: ' فارسی' },
  { code: 'ar', text: 'العربية' },
]
const rtlLocales = ['ar', 'fa']
const locales = languages.map(({ code }) => code)

module.exports = {
  i18n: {
    reloadOnPrerender: typeof process.env.development !== 'undefined',
    locales,
    languages,
    rtlLocales,
    defaultLocale: 'fi',
    fallbackLocale: 'en',
  },
}
