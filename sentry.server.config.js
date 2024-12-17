import * as Sentry from "@sentry/nextjs";
import getConfig from 'next/config'

const { SENTRY_DSN: dsn, SENTRY_RELEASE: release, SENTRY_ENVIRONMENT: environment } =
  getConfig().serverRuntimeConfig

Sentry.init({
  dsn,
  release,
  environment,

  // Replay may only be enabled for the client-side
  integrations: [Sentry.replayIntegration()],

  // Capture percentage of transactions for tracing.
  // Learn more at
  // https://docs.sentry.io/platforms/javascript/configuration/options/#traces-sample-rate
  tracesSampleRate: 0.2,

  // Capture Replay for 1% of all sessions,
  // plus for 100% of sessions with an error
  // Learn more at
  // https://docs.sentry.io/platforms/javascript/session-replay/configuration/#general-integration-configuration
  replaysSessionSampleRate: 0.01,
  replaysOnErrorSampleRate: 1.0,

  // Note: if you want to override the automatic release value, do not set a
  // `release` value here - use the environment variable `SENTRY_RELEASE`, so
  // that it will also get attached to your source maps
});
