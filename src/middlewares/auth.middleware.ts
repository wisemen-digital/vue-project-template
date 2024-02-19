import { isAxiosError } from 'axios'

import { oAuthClient } from '@/libs/oAuth.lib.ts'
import { useAuthStore } from '@/stores/auth.store.ts'
import { useEnvironment } from '@/utils/environment.util'
import { logError } from '@/utils/logger.util'
import { createMiddleware } from '@/utils/middleware.util'

export const authMiddleware = createMiddleware(async () => {
	const authStore = useAuthStore()

	const { isDevelopment } = useEnvironment()
	const hasTokens = oAuthClient.isLoggedIn()

	if (!hasTokens && !isDevelopment.value) {
		return {
			name: 'login',
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
			name: 'login',
		}
	}
})
