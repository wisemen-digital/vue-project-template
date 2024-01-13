import { oAuthClient } from '@/libs'
import type { RouteMiddleware } from '@/models/core'
import { useAuthStore } from '@/stores'

export const auth: RouteMiddleware = async () => {
  const authStore = useAuthStore()
  const hasTokens = oAuthClient.isLoggedIn()
  
  if (!hasTokens) {
    return {
      name: 'login-form',
    }
  }
  
  try {
    await authStore.getCurrentUser()
  }
  catch (error) {
    console.error(error)
    authStore.logout()
    
    return {
      name: 'login-form',
    }
  }
}
