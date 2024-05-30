import * as Sentry from '@sentry/vue'
import type { App } from 'vue'

import {
  CURRENT_BUILD_NUMBER,
  CURRENT_ENVIRONMENT,
  SENTRY_DSN,
  SENTRY_SAMPLE_RATE,
} from '@/constants/environment.constant.ts'

export function configureSentry(app: App<Element>): void {
  if (SENTRY_DSN === undefined) {
    return
  }

  if (CURRENT_ENVIRONMENT === 'development') {
    return
  }

  return Sentry.init({
    app,
    attachStacktrace: true,
    dsn: SENTRY_DSN,
    environment: CURRENT_ENVIRONMENT,
    release: CURRENT_BUILD_NUMBER,
    replaysOnErrorSampleRate: SENTRY_SAMPLE_RATE ?? 0.1,
    replaysSessionSampleRate: SENTRY_SAMPLE_RATE ?? 0.1,
    sampleRate: SENTRY_SAMPLE_RATE ?? 0.1,
    tracesSampleRate: SENTRY_SAMPLE_RATE ?? 0.1,
  })
}
