import { oAuthClient } from '@/libs/oAuth.lib.ts'
import type { RouteMiddleware } from '@/models/core/routeMiddleware.model.ts'
import { useAuthStore } from '@/stores/auth.store.ts'

export async function auth(): Promise<RouteMiddleware | void> {
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
		console.error(error)
		authStore.logout()

		return {
			name: 'login-form',
		}
	}
}
