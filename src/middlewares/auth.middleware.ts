import { isAxiosError } from 'axios'

import { oAuthClient } from '@/libs/oAuth.lib.ts'
import type { RouteMiddlewareReturnType } from '@/models/core/routeMiddleware.model.ts'
import { useAuthStore } from '@/stores/auth.store.ts'
import { logError } from '@/utils/logger.util'

export async function auth(): Promise<RouteMiddlewareReturnType> {
	const authStore = useAuthStore()
	const hasTokens = oAuthClient.isLoggedIn()

	if (!hasTokens) {
		return {
			name: 'login-form',
		}
	}

	try {
		await authStore.getCurrentUser()
	} catch (error) {
		if (isAxiosError(error)) {
			authStore.logout()
		}

		logError(error)

		return {
			name: 'login-form',
		}
	}
}
