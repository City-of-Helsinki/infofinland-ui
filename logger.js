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

import * as winston from 'winston'
// import { createLogger, format, transports } from 'winston'
import 'winston-daily-rotate-file'

// const LEVEL = process.env.NODE_ENV === 'production' ? 'info' : 'verbose'
const ERROR_LOG = './logs/errors-%DATE%.log'
const CONSOLE_LEVEL =
  process.env.CONSOLE_LOGGER_LEVEL ||
  (process.env.NODE_ENV === 'production' ? 'warn' : 'verbose')

const errorRotation = new winston.transports.DailyRotateFile({
  filename: ERROR_LOG,
  datePattern: 'YYYY-MM-DD-HH',
  zippedArchive: true,
  maxFiles: '1d',
  level: 'error',
})

const logger = winston.createLogger({
  // level: LEVEL,
  format: winston.format.combine(
    winston.format.timestamp({
      format: 'DD-MM-YYYY HH:mm:ss',
    }),
    winston.format.errors({ stack: true }),
    winston.format.splat(),
    winston.format.json()
  ),
  defaultMeta: {
    site: process.env.SITE_HOST,
    drupal: process.env.NEXT_PUBLIC_DRUPAL_BASE_URL,
  },
  transports: [
    new winston.transports.Console({
      format: winston.format.combine(
        winston.format.colorize(),
        winston.format.simple()
      ),
      level: CONSOLE_LEVEL,
    }),
    errorRotation,
  ],
})

export default logger
