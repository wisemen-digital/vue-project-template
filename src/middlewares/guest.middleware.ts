import { oAuthClient } from '@/libs/oAuth.lib.ts'
import type { RouteMiddleware } from '@/models/core/routeMiddleware.model.ts'

export function guest(): RouteMiddleware | void {
	const isLoggedIn = oAuthClient.isLoggedIn()

	if (isLoggedIn) {
		return {
			name: 'index',
		}
	}
}
