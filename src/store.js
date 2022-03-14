import { atom } from 'jotai'
import { atomWithStorage, createJSONStorage, selectAtom } from 'jotai/utils'
import { LANG_MESSAGE_ID } from './components/messages/LanguageMessageCard'

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

/** Visibility of language menu*/
export const languageMenuVisibilityAtom = atom(false)

/** Visibility of language popup*/
export const languageMessageIsOpenAtom = atom(false)

/** Visibility state of feeback form */
export const feedbackFormVisibilityAtom = atom(false)

/**
 * Page atoms
 */

export const pageAtom = atom({}
//   {
//   search:{},
//   node: { id: null },
//   themeMenu: menuErrorResponse(),
//   menus: {
//     main: {},
//     about: {},
//     'footer-about': {},
//     cities: {},
//     'cities-landing': {},
//   },
// }

)

pageAtom.debugLabel = 'page props root atom'

export const isAboutPageAtom = atom((get) => get(pageAtom).isAboutPage)

export const searchResultsAtom = atom((get) => get(pageAtom).search?.hits?.hits)

export const searchResultsTermAtom = selectAtom(pageAtom, p => p.q )

export const searchResultsCountAtom = selectAtom(searchResultsAtom, h => h?.length || 0)

export const municipalitiesAtom = atom((get) => get(pageAtom).municipalities)

export const messagesAtom = atom((get) => get(pageAtom).messages)

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

export const footerMenuAtom = selectAtom(menusAtom,menus=> menus && menus['footer-about'])
export const citiesLandingMenuAtom = selectAtom(menusAtom, menus=> menus && menus['cities-landing'])
export const citiesMenuAtom = selectAtom(menusAtom, menus => menus?.cities)
export const mainMenuAtom = selectAtom(menusAtom,menu=>menu?.main)
export const aboutMenuAtom = selectAtom(menusAtom, menu=>menu?.about)
export const themeMenuAtom = atom((get) => get(pageAtom).themeMenu)

/**
 * Node atom collection
 */

export const nodeAtom = selectAtom(pageAtom, page=>page?.node)
export const nodeIdAtom = selectAtom(pageAtom, page=>page?.node?.id)

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
