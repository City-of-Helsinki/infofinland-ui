const nextTranslate = require('next-translate')

//TODO read from drupal, not from config
const cities = ['Vantaa', 'Helsinki', 'Espoo', 'Tampere', 'Turku', 'Vaasa']

const rtlLocales = ['ar', 'fa']
module.exports = nextTranslate(
  /**
   * these are just regular next.config.js settings that
   * are passed throught the nextTranslate config wrapper
   * See i18n.js for localization configs
   * */
  {
    poweredByHeader: false,
    env: {
      cities,
      rtlLocales,
    },
  }
)
