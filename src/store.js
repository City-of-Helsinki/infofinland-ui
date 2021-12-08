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
/** Chosen municipality for local information blocks*/
export const selectedCity = atomWithStorage(CITY_ATOM_KEY, undefined)
/** Visibility state of municipality menu*/
export const cityMenuVisibility = atom(false)

/** Visibility language menu*/
export const languageMenuVisibility = atom(false)

/** Visibility of language popup*/
export const languageMessageIsOpen = atom(false)

/** Visibility state of feeback form */
export const feedbackFormVisibility = atom(false)

// const menu = atom({})

/** Cookie consent atom */

export const cookieConsent = atomWithStorage(COOKIE_CONSENT_KEY, undefined)
export const isCookieConsentSet = atom(
  (get) => typeof get(cookieConsent) !== 'undefined'
)

/** Message queue */
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

export const alertMessages = focusAtom(messages, (optics) =>
  optics.prop('alerts')
)
export const alertMessageAtoms = splitAtom(alertMessages)

/**
 *  Searchbar store
 */

/** the search keyword being typed to input */
export const searchQueryValue = atom('')

/** The search API url  */
export const SEARCH_URL = '/api/search'

/**
 * Get search results based on searchQueryValue
 * @param {string} q - the search term.
 */

export const getSearchResults = async (q) => {
  const { data } = await axios.get(SEARCH_URL, { params: { q } })
  return data.results
}
