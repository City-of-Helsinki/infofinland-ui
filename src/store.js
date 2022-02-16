import { atom } from 'jotai'
import axios from 'axios'
import { focusAtom } from 'jotai/optics'
import { atomWithStorage, splitAtom } from 'jotai/utils'

/** @module store */

/** The name of the module. */
export const name = 'store'

/** localStorage key for storing cookie consent value*/
export const COOKIE_CONSENT_KEY = 'infofinland-cc'

/** localStorage key for storing municipality selection*/
export const CITY_ATOM_KEY = 'city'

// export const cities = atom([])

/** Chosen municipality for local information blocks*/
export const selectedCityAtom = atomWithStorage(CITY_ATOM_KEY, undefined)

/** Visibility state of municipality menu*/
export const cityMenuVisibilityAtom = atom(false)

/** Visibility language menu*/
export const languageMenuVisibilityAtom = atom(false)

/** Visibility of language popup*/
export const languageMessageIsOpenAtom = atom(false)

/** Visibility state of feeback form */
export const feedbackFormVisibilityAtom = atom(false)

// const menu = atom({})

/** Page atoms */

export const pageAtom = atom({ node: { id: null } })
export const municipalitiesAtom = focusAtom(pageAtom, (optics) =>
  optics.prop('municipalities')
)
export const footerMenuAtom = focusAtom(pageAtom, (optics) =>
  optics.prop('footerMenu')
)

export const citiesMenuAtom = focusAtom(pageAtom, (optics) =>
  optics.prop('citiesMenu')
)

export const mainMenuAtom = focusAtom(pageAtom, (optics) => optics.prop('menu'))
export const nodeAtom = focusAtom(pageAtom, (optics) => optics.prop('node'))
export const nodeIdAtom = focusAtom(nodeAtom, (optics) => optics.prop('id'))

/** Cookie consent atom */

export const cookieConsentAtom = atomWithStorage(COOKIE_CONSENT_KEY, undefined)
export const isCookieConsentSetAtom = atom(
  (get) => typeof get(cookieConsentAtom) !== 'undefined'
)

/** Message queue */

// TODO  get this from page props when drupal serves it
export const messages = atom({
  messages: [
    {
      title: 'Haluatko vaihtaa kieltä?',
      text: 'Infofinland-sivusto on saatavilla 12 eri kielellä. Haluatko vaihtaa käyttökieltä?',
      waiting: false,
    },
  ],
  warnings: [],
  alerts: [
    {
      waiting: true,
      title: 'Alert',
      text: 'some stuff withouth html, maybe try that later',
      confirm: () => null,
    },
  ],
})

const alertMessagesAtom = focusAtom(messages, (optics) => optics.prop('alerts'))

export const alertMessageAtoms = splitAtom(alertMessagesAtom)

/**
 *  Searchbar store
 */

/** the search keyword being typed to input */
export const searchQueryValue = atom('')

/** The Client API urls  */
export const SEARCH_URL = '/api/search'
export const LOCAL_INFO_URL = '/api/localinfo'

// TODO move these to lib/browser-api.js ?
/**
 * Get search results based on searchQueryValue
 * @param {string} q - the search term.
 */

export const getSearchResults = async (q) => {
  const { data } = await axios.get(SEARCH_URL, { params: { q } })
  return data.results
}

export const getLocalInformation = async (params) => {
  const { data } = await axios.get(LOCAL_INFO_URL, { params })
  return data?.node
}
