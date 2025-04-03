import { useAuthStore } from '@/stores/auth.store'
import { MiddlewareUtil } from '@/utils/middleware.util'

export const guest = MiddlewareUtil.createMiddleware(async () => {
  const authStore = useAuthStore()

  const isLoggedIn = await authStore.isLoggedIn()

  if (!isLoggedIn) {
    return
  }

  return { name: 'index' }
})
