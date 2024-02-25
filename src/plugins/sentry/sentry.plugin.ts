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
		dsn: import.meta.env.SENTRY_DSN,
		environment: import.meta.env.ENVIRONMENT,
		release: import.meta.env.APP_VERSION,
		integrations: [
			new Sentry.BrowserTracing({
				routingInstrumentation: Sentry.vueRouterInstrumentation(router),
			}),
			new Sentry.Replay(),
		],
		tracesSampleRate: import.meta.env.SENTRY_SAMPLE_RATE ?? 1,
		replaysSessionSampleRate: 0.1,
		replaysOnErrorSampleRate: 1.0,
		sampleRate: 1,
		attachStacktrace: true,
	})
}
