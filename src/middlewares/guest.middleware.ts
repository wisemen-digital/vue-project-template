import { oAuthClient } from '@/libs/oAuth.lib.ts'
import type { RouteMiddlewareReturnType } from '@/models/core/routeMiddleware.model'

export function guest(): RouteMiddlewareReturnType {
	const isLoggedIn = oAuthClient.isLoggedIn()

	if (!isLoggedIn) {
		return
	}

	return {
		name: 'index',
	}
}
