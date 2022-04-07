import { createLogger, format, transports } from 'winston'

const ERROR_LOG = 'error.log'
const ALL_EVENTS_LOG = 'events.log'

const logger = createLogger({
  level: 'info',
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
    }),
    new transports.File({ filename: ERROR_LOG, level: 'error' }),
    new transports.File({ filename: ALL_EVENTS_LOG }),
  ],
})

//
// // If we're not in production then **ALSO** log to the `console`
// // with the colorized simple format.
// //
// if (process.env.NODE_ENV !== 'production') {
//   logger.add(
//     new transports.Console({
//       format: format.combine(format.colorize(), format.simple()),
//     })
//   )
// }

export default logger

// ***************
// Allows for string interpolation
// // ***************

// // info: test message my string {}
// logger.log('info', 'test message %s', 'my string');

// // info: test message 123 {}
// logger.log('info', 'test message %d', 123);

// // info: test message first second {number: 123}
// logger.log('info', 'test message %s, %s', 'first', 'second', { number: 123 });

// // prints "Found error at %s"
// logger.info('Found %s at %s', 'error', new Date());
// logger.info('Found %s at %s', 'error', new Error('chill winston'));
// logger.info('Found %s at %s', 'error', /WUT/);
// logger.info('Found %s at %s', 'error', true);
// logger.info('Found %s at %s', 'error', 100.00);
// logger.info('Found %s at %s', 'error', ['1, 2, 3']);

// // ***************
// // Allows for logging Error instances
// // ***************

// logger.warn(new Error('Error passed as info'));
// logger.log('error', new Error('Error passed as message'));

// logger.warn('Maybe important error: ', new Error('Error passed as meta'));
// logger.log('error', 'Important error: ', new Error('Error passed as meta'));

// logger.error(new Error('Error as info'));
