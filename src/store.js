import { atom } from 'jotai'
import axios from 'axios'
import { focusAtom } from 'jotai/optics'
import { atomWithStorage, splitAtom } from 'jotai/utils'

export const SEARCH_URL = '/api/search'
export const CITY_ATOM_KEY = 'city'
export const LANG_ATOM_KEY = 'language'
export const selectedCity = atomWithStorage(CITY_ATOM_KEY, undefined)
export const cityMenuVisibility = atom(false)
export const languageMenuVisibility = atom(false)
export const feedbackFormVisibility = atom(false)
export const languageMessageIsOpen = atom(false)

// TODO make one queue and add types to message objects
// If typescript, add message object type
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

// Search store

export const getSearchResults = async (q) => {
  const { data } = await axios.get(SEARCH_URL, { params: { q } })
  console.log({ data })
  return data.results
}

export const searchQueryValue = atom('')

export const fetchSearchResults = atom(async (get) => {
  const q = get(searchQueryValue)
  if (!q) {
    return []
  } else {
    return await getSearchResults(q)
  }
})
