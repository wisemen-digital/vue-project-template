import { useAuthStore } from '@/stores/auth.store.ts'
import { MiddlewareUtil } from '@/utils/middleware.util'

export const guest = MiddlewareUtil.createMiddleware(() => {
  const authStore = useAuthStore()

  if (!authStore.isLoggedIn()) {
    return
  }

  return {
    name: 'index',
  }
})
