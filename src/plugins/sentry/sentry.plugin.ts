import * as Sentry from '@sentry/vue'
import type { App } from 'vue'

import {
  CURRENT_BUILD_NUMBER,
  CURRENT_ENVIRONMENT,
  SENTRY_DSN,
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
    replaysOnErrorSampleRate: 1.0,
    replaysSessionSampleRate: 0.1,
    sampleRate: 1,
    tracesSampleRate: 1,
  })
}
