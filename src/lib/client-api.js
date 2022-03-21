import axios from 'axios'

/** The Client API urls  */
export const SEARCH_URL = '/api/search/'
export const LOCAL_INFO_URL = '/api/localinfo'
export const LOCALES_URL = '/api/available-locales'

/**
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
