/***
 *
 * NPM logging levels  = {
  error: 0,
  warn: 1,
  info: 2,
  http: 3,
  verbose: 4,
  debug: 5,
  silly: 6
}
 *
 */

import { createLogger, format, transports } from 'winston'

const LEVEL = process.env.NODE_ENV === 'production' ? 'info': 'verbose'
const ERROR_LOG = 'error.log'
const ALL_EVENTS_LOG = 'events.log'
const CONSOLE_LEVEL  =  process.env.NODE_ENV === 'production' ? 'warn': 'verbose'
const logger = createLogger({
  level: LEVEL,
  format: format.combine(
    format.timestamp({
      format: 'DD-MM-YYYY HH:mm:ss',
    }),
    format.errors({ stack: true }),
    format.splat(),
    format.json()
  ),
  defaultMeta: {
    service: process.env.SITE_HOST,
    api: process.env.NEXT_PUBLIC_DRUPAL_BASE_URL,
  },
  transports: [
    new transports.Console({
      format: format.combine(format.colorize(), format.simple()),
      level:CONSOLE_LEVEL
    }),
    new transports.File({ filename: ERROR_LOG, level: 'error' }),
    new transports.File({ filename: ALL_EVENTS_LOG }),
  ],
})

export default logger

