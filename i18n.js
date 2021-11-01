const languages = [
  { code: 'fi', text: 'Suomi' },
  { code: 'sv', text: 'Svenska' },
  { code: 'en', text: 'English' },
  { code: 'ru', text: 'Pусский' },
  { code: 'et', text: 'Eesti keel' },
  { text: 'Français', code: 'fr' },
  { text: 'Soomali', code: 'so' },
  { code: 'es', text: 'Español' },
  { code: 'tr', text: 'Türkçe' },
  { code: 'zh', text: '中文' },
  { code: 'fa', text: ' فارسی' },
  { code: 'ar', text: 'العربية' },
]

const locales = languages.map(({ code }) => code)

module.exports = {
  locales,
  languages,
  defaultLocale: 'fi',
  fallbackLocale: 'en',
  pages: {
    '*': ['common'],
  },
}
