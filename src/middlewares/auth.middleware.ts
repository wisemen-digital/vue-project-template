import { isAxiosError } from 'axios'

import { CURRENT_ENVIRONMENT } from '@/constants/environment.constant.ts'
import { oAuthClient } from '@/libs/oAuth.lib.ts'
import { useAuthStore } from '@/stores/auth.store.ts'
import { LoggerUtil } from '@/utils/logger.util'
import { MiddlewareUtil } from '@/utils/middleware.util'

export const authMiddleware = MiddlewareUtil.createMiddleware(async () => {
  if (CURRENT_ENVIRONMENT === 'e2e') {
    return
  }

  const authStore = useAuthStore()

  const hasTokens = oAuthClient.isLoggedIn()

  if (!hasTokens) {
    return {
      name: 'login',
    }
  }

  try {
    await authStore.getCurrentUser()
  }
  catch (error) {
    if (isAxiosError(error)) {
      authStore.logout()
    }

    LoggerUtil.logError(error)

    return {
      name: 'login',
    }
  }
})
