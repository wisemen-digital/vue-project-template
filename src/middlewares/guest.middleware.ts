import { oAuthClient } from '@/libs/oAuth.lib.ts'
import { createMiddleware } from '@/utils/middleware.util'

export const guest = createMiddleware(() => {
  const isLoggedIn = oAuthClient.isLoggedIn()

  if (!isLoggedIn) {
    return
  }

  return {
    name: 'index',
  }
})
