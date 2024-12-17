// This file configures the initialization of Sentry on the client.
// The config you add here will be used whenever a users loads a page in their browser.
// https://docs.sentry.io/platforms/javascript/guides/nextjs/

import * as Sentry from '@sentry/nextjs'
import getConfig from 'next/config'

const { SENTRY_DSN_PUBLIC: dsn, SENTRY_RELEASE: release, SENTRY_ENVIRONMENT: environment } =
  getConfig().publicRuntimeConfig

Sentry.init({
  dsn,
  release,
  environment,

  // Define how likely traces are sampled. Adjust this value in production, or use tracesSampler for greater control.
  tracesSampleRate: 1,

  // Setting this option to true will print useful information to the console while you're setting up Sentry.
  debug: false,
})
