import * as Sentry from '@sentry/vue'
import type { App } from 'vue'
import type { Router } from 'vue-router'

import { EnvironmentMode } from '@/utils/environment.util'

const { VITE_SENTRY_DSN, VITE_ENVIRONMENT, VITE_SENTRY_SAMPLE_RATE, VITE_APP_VERSION } = import.meta.env

export function configureSentry(app: App<Element>, router: Router): void {
	if (VITE_SENTRY_DSN === undefined) {
		return
	}

	if (VITE_ENVIRONMENT === EnvironmentMode.DEVELOPMENT) {
		return
	}

	return Sentry.init({
		app,
		dsn: VITE_SENTRY_DSN,
		environment: VITE_ENVIRONMENT,
		release: VITE_APP_VERSION,
		integrations: [
			new Sentry.BrowserTracing({
				routingInstrumentation: Sentry.vueRouterInstrumentation(router),
			}),
			new Sentry.Replay(),
		],
		tracesSampleRate: VITE_SENTRY_SAMPLE_RATE ?? 1,
		replaysSessionSampleRate: 0.1,
		replaysOnErrorSampleRate: 1.0,
		sampleRate: 1,
		attachStacktrace: true,
	})
}
