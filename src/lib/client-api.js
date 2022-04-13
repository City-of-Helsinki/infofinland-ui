import axios from 'axios'

/** The Client API urls  */
const SEARCH_URL = '/api/search/'
const LOCAL_INFO_URL = '/api/localinfo'
const LOCALES_URL = '/api/available-locales'
const MESSAGES_URL = '/api/messages'
const MUNICIPALITIES_URL = '/api/municipalities'
const FEEDBACK_CONTENT_URL = '/api/feedback'

/**
 *
 * Get search results based on searchQueryValue
 * @param {string} search - the search term.
 */

export const getSearchResults = async ({ search, locale }) => {
  const { data } = await axios(`${SEARCH_URL}${locale}`, { params: { search } })
  return data
}

export const getLocalInformation = async (params) => {
  const { data } = await axios.get(LOCAL_INFO_URL, { params })
  return data?.node
}

/**
 * get list of localized pages for given path
 * @param {string} search - the search term.
 */

export const getLocalesForPath = async ({ path }) => {
  const { data } = await axios.get(LOCALES_URL, { params: { path } })
  return data
}

export const getMessages = async ({ id, locale }) => {
  const { data } = await axios.get(MESSAGES_URL, { params: { id, locale } })
  return data
}

export const getMunicipalities = async (locale) => {
  const { data } = await axios.get(MUNICIPALITIES_URL, { params: { locale } })
  return data
}
export const getFeedbackContent = async (locale) => {
  const { data } = await axios.get(FEEDBACK_CONTENT_URL, { params: { locale } })
  return data
}
