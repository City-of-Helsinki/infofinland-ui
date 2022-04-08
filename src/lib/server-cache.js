import NodeCache from 'node-cache'
const stdTTL = process.env.NODE_ENV !== 'production' ? 0 : 60
const cache = new NodeCache({ stdTTL })
export default cache
