import axios from 'axios'

/** The Client API urls  */
export const SEARCH_URL = '/api/search'
export const LOCAL_INFO_URL = '/api/localinfo'
export const LOCALES_URL = '/api/available-locales'

/**
 * Get search results based on searchQueryValue
 * @param {string} q - the search term.
 */

export const getSearchResults = async (search) => {
  const { data } = await axios.get(SEARCH_URL, { params: { search } })
  return data?.results
}

/**
 * Get search results based on searchQueryValue
 * @param {string} id - the full node id of the local page
 */

export const getLocalInformation = async (params) => {
  const { data } = await axios.get(LOCAL_INFO_URL, { params })
  return data?.node
}

export const getLocalesForPath = async ({ path }) => {
  const { data } = await axios.get(LOCALES_URL, { params: { path } })
  return data
}
