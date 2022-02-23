import { atom } from 'jotai'
import { focusAtom } from 'jotai/optics'
import { atomWithStorage, splitAtom } from 'jotai/utils'
import { LANG_MESSAGE_ID } from './components/messages/LanguageMessageCard'

/** @module store */

/** The name of the module. */
export const name = 'store'

/** localStorage key for storing cookie consent value*/
export const COOKIE_CONSENT_KEY = 'infofinland-cc'

/** localStorage key for storing municipality selection*/
const CITY_ATOM_KEY = 'city'

const SHOWN_MESSAGES_KEY = 'shown-messages'

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

/** Page atoms */

export const pageAtom = atom({ node: { id: null } })
pageAtom.debugLabel = 'page props root atom'

export const municipalitiesAtom = focusAtom(pageAtom, (optics) =>
  optics.prop('municipalities')
)

export const messagesAtom = focusAtom(pageAtom, (optics) =>
  optics.prop('messages')
)

export const messageAtoms = splitAtom(messagesAtom)

// set lang message as shown. It is controlled separately.
// slight haxor. maybe fix this
export const shownMessagesAtom = atomWithStorage(SHOWN_MESSAGES_KEY, {
  [LANG_MESSAGE_ID]: true,
})

/**
 * Feedback form info page atom
 *
 */
export const feedbackPageAtom = focusAtom(pageAtom, (optics) =>
  optics.prop('feedback')
)

/**
 * Menu atoms
 */
export const footerMenuAtom = focusAtom(pageAtom, (optics) =>
  optics.prop('footerMenu')
)

export const citiesLandingMenuAtom = focusAtom(pageAtom, (optics) =>
  optics.prop('citiesLandingMenu')
)
export const citiesMenuAtom = focusAtom(pageAtom, (optics) =>
  optics.prop('citiesMenu')
)
export const mainMenuAtom = focusAtom(pageAtom, (optics) => optics.prop('menu'))

export const aboutMenuAtom = focusAtom(pageAtom, (optics) =>
  optics.prop('aboutMenu')
)

export const nodeAtom = focusAtom(pageAtom, (optics) => optics.prop('node'))
export const nodeIdAtom = focusAtom(nodeAtom, (optics) => optics.prop('id'))

/** Cookie consent atom */
export const cookieConsentAtom = atomWithStorage(COOKIE_CONSENT_KEY, undefined)
export const isCookieConsentSetAtom = atom(
  (get) => typeof get(cookieConsentAtom) !== 'undefined'
)

/**
 *  Searchbar store
 */

/** the search keyword being typed to input */
export const searchQueryValue = atom('')
