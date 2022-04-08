import NodeCache from 'node-cache'
const stdTTL = process.env.NODE_ENV !== 'production' ? 10 : 60
const checkperiod = process.env.NODE_ENV !== 'production' ? 30 : 60
const cache = new NodeCache({ stdTTL, checkperiod })
export default cache
