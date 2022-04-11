// import NodeCache from 'node-cache'
// import getConfig from 'next/config'

import NodeCache from 'node-cache'

// const CACHE_NAME = 'Page Cache'
const stdTTL = process.env.NODE_ENV !== 'production' ? 10 : 60
const checkperiod = process.env.NODE_ENV !== 'production' ? 30 : 45
/**
 *
 * Generic cache for entries that don't need to refresh themselves.
 *  Used for api calls and less used ssr items
 */

const cache = new NodeCache({ stdTTL, checkperiod })

export default cache
