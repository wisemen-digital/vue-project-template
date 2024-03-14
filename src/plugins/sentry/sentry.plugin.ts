import * as Sentry from '@sentry/vue'
import type { App } from 'vue'
import type { Router } from 'vue-router'

import { EnvironmentMode } from '@/utils/environment.util'

export function configureSentry(app: App<Element>, router: Router): void {
  if (import.meta.env.SENTRY_DSN === undefined) {
    return
  }

  if (import.meta.env.MODE === EnvironmentMode.DEVELOPMENT) {
    return
  }

  return Sentry.init({
    app,
    attachStacktrace: true,
    dsn: import.meta.env.SENTRY_DSN,
    environment: import.meta.env.ENVIRONMENT,
    integrations: [
      new Sentry.BrowserTracing({
        routingInstrumentation: Sentry.vueRouterInstrumentation(router),
      }),
      new Sentry.Replay(),
    ],
    release: import.meta.env.APP_VERSION,
    replaysOnErrorSampleRate: 1.0,
    replaysSessionSampleRate: 0.1,
    sampleRate: 1,
    tracesSampleRate: import.meta.env.SENTRY_SAMPLE_RATE ?? 1,
  })
}
