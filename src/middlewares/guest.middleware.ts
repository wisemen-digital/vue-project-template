import { oAuthClient } from '@/libs'
import type { RouteMiddleware } from '@/models/core'

export const guest: RouteMiddleware = () => {
  const isLoggedIn = oAuthClient.isLoggedIn()

  if (isLoggedIn) {
    return {
      name: 'index',
    }
  }
}
