import axios from 'axios'

/** The Client API urls  */
export const SEARCH_URL = '/api/search'
export const LOCAL_INFO_URL = '/api/localinfo'

/**
 * Get search results based on searchQueryValue
 * @param {string} q - the search term.
 */

export const getSearchResults = async (q) => {
  const { data } = await axios.get(SEARCH_URL, { params: { q } })
  return data.results
}

/**
 * Get search results based on searchQueryValue
 * @param {string} id - the full node id of the local page
 */

export const getLocalInformation = async (params) => {
  const { data } = await axios.get(LOCAL_INFO_URL, { params })
  return data?.node
}
