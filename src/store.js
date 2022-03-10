import { atom } from 'jotai'
import { atomWithStorage, splitAtom, createJSONStorage } from 'jotai/utils'
import { LANG_MESSAGE_ID } from './components/messages/LanguageMessageCard'
import { menuErrorResponse } from './lib/ssr-api'

/** @module store */

/**
 * Ensure browser-only atoms are not causing render mismatches on SSR
 * https://github.com/pmndrs/jotai/discussions/910
 */
const storage = createJSONStorage(() => localStorage)
storage.delayInit = true

/** The name of the module. */
export const name = 'store'

/** localStorage key for storing cookie consent value*/
export const COOKIE_CONSENT_KEY = 'infofinland-cc'

/** localStorage key for storing municipality selection*/
const CITY_ATOM_KEY = 'city'

const SHOWN_MESSAGES_KEY = 'shown-messages'

/** Chosen municipality for local information blocks*/
export const selectedCityAtom = atomWithStorage(CITY_ATOM_KEY, false, storage)

/** Visibility state of municipality menu*/
export const cityMenuVisibilityAtom = atom(false)

/** Visibility language menu*/
export const languageMenuVisibilityAtom = atom(false)

/** Visibility of language popup*/
export const languageMessageIsOpenAtom = atom(false)

/** Visibility state of feeback form */
export const feedbackFormVisibilityAtom = atom(false)

/**
 * Page atoms
 */

export const pageAtom = atom({
  node: { id: null },
  themeMenu: menuErrorResponse(),
  menus: {
    main: {},
    about: {},
    'footer-about': {},
    cities: {},
    'cities-landing': {},
  },
})

pageAtom.debugLabel = 'page props root atom'

export const isAboutPageAtom = atom((get) => get(pageAtom).isAboutPage)

export const searchResultsAtom = atom((get) => get(pageAtom).results)

export const searchResultsCountAtom = atom(
  (get) => get(searchResultsAtom)?.length
)
export const municipalitiesAtom = atom((get) => get(pageAtom).municipalities)

export const messagesAtom = atom((get) => get(pageAtom).messages)

export const messageAtoms = splitAtom(messagesAtom)

// set lang message as shown. It is controlled separately.
// slight haxor. maybe fix this
export const shownMessagesAtom = atomWithStorage(
  SHOWN_MESSAGES_KEY,
  {
    [LANG_MESSAGE_ID]: true,
  },
  storage
)

/**
 * Feedback form info page atom
 */
export const feedbackPageAtom = atom((get) => get(pageAtom).feedback)
/**
 * Menu atom collection
 */
export const menusAtom = atom((get) => get(pageAtom).menus)

export const footerMenuAtom = atom((get) => get(menusAtom)['footer-about'])

export const citiesLandingMenuAtom = atom(
  (get) => get(menusAtom)['cities-landing']
)

export const citiesMenuAtom = atom((get) => get(menusAtom).cities)

export const mainMenuAtom = atom((get) => get(menusAtom).main)

export const aboutMenuAtom = atom((get) => get(menusAtom).about)

export const themeMenuAtom = atom((get) => get(pageAtom).themeMenu)

/**
 * Node atom collection
 */

export const nodeAtom = atom((get) => get(pageAtom).node)

export const nodeIdAtom = atom((get) => get(nodeAtom).id)

/** Cookie consent atom */
export const cookieConsentAtom = atomWithStorage(
  COOKIE_CONSENT_KEY,
  undefined,
  storage
)
export const isCookieConsentSetAtom = atom(
  (get) => typeof get(cookieConsentAtom) !== 'undefined'
)

/**
 *  Searchbar store
 */

/** the search keyword being typed to input */
export const searchQueryValue = atom('')
