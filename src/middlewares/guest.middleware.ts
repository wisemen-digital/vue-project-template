import { oAuthClient } from '@/libs/oAuth.lib.ts'
import { MiddlewareUtil } from '@/utils/middleware.util'

export const guest = MiddlewareUtil.createMiddleware(() => {
  const isLoggedIn = oAuthClient.isLoggedIn()

  if (!isLoggedIn) {
    return
  }

  return {
    name: 'index',
  }
})
