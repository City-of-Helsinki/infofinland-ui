import { atom } from 'jotai'
import {
  atomWithStorage,
  createJSONStorage,
  selectAtom,
  splitAtom,
} from 'jotai/utils'
import { LANG_MESSAGE_ID } from './components/messages/LanguageMessageCard'

/** @module store */

/**
 * Ensure browser-only atoms are not causing render mismatches on SSR
 * https://github.com/pmndrs/jotai/discussions/910
 */

/**
 * TODO: see if sessionStorage atom works with separate delayed storage,
 * use for language switcher
 *
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

export const pageAtom = atom({})

pageAtom.debugLabel = 'page props root atom'

export const isAboutPageAtom = atom((get) => get(pageAtom).isAboutPage)

export const searchAtom = atom((get) => get(pageAtom).search)

export const searchErrorAtom = selectAtom(searchAtom, (search) => search?.error)

export const searchResultsAtom = selectAtom(
  searchAtom,
  (search) => search?.results?.hits?.hits
)

export const searchResultsAtoms = splitAtom(searchAtom)

export const searchResultsTermAtom = selectAtom(searchAtom, (s) => s?.q)

export const searchResultPageSizeAtom = selectAtom(
  searchAtom,
  (s) => Number(s?.size) || 0
)
export const searchResultPageFromAtom = selectAtom(
  searchAtom,
  (s) => Number(s?.from) || 0
)
export const searchResultCurrentPageZeroIndexAtom = atom(
  (get) => get(searchResultPageFromAtom) / get(searchResultPageSizeAtom)
)

// export const searchResultCurrentPageAtom = selectAtom(searchResultCurrentPageZeroIndexAtom,  page =>
//   page + 1
// )

export const searchResultsCountAtom = selectAtom(
  searchAtom,
  (s) => Number(s?.results?.hits?.total?.value) || 0
)

export const searchResultPageCountAtom = atom((get) =>
  Math.ceil(get(searchResultsCountAtom) / get(searchResultPageSizeAtom))
)

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

export const footerMenuAtom = selectAtom(
  menusAtom,
  (menus) => menus && menus['footer-about']
)
export const citiesLandingMenuAtom = selectAtom(
  menusAtom,
  (menus) => menus && menus['cities-landing']
)
export const citiesMenuAtom = selectAtom(menusAtom, (menus) => menus?.cities)
export const mainMenuAtom = selectAtom(menusAtom, (menu) => menu?.main)
export const aboutMenuAtom = selectAtom(menusAtom, (menu) => menu?.about)
export const themeMenuAtom = atom((get) => get(pageAtom).themeMenu)

/**
 * Node atom collection
 */

export const nodeAtom = selectAtom(pageAtom, (page) => page?.node)
export const nodeIdAtom = selectAtom(pageAtom, (page) => page?.node?.id)

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
