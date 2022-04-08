import NodeCache from 'node-cache'
const stdTTL = process.env.NODE_ENV !== 'production' ? 10 : 60
const checkperiod = process.env.NODE_ENV !== 'production' ? 30 : 45
const cache = new NodeCache({ stdTTL, checkperiod })
export const MENU_CACHE_TTL = 120
export default cache
