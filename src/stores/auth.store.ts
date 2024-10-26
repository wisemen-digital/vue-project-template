import { defineStore } from 'pinia'
import {
  computed,
  ref,
} from 'vue'

import { CURRENT_ENVIRONMENT } from '@/constants/environment.constant.ts'
import { oAuthClient } from '@/libs/oAuth.lib.ts'
import type { AuthUser } from '@/models/auth-user/authUser.model'
import { AuthService } from '@/modules/auth/api/services/auth.service'
import { UuidUtil } from '@/utils/uuid.util.ts'

export const useAuthStore = defineStore('auth', () => {
  const authUser = ref<AuthUser | null>(null)

  const isAuthenticated = computed<boolean>(() => authUser.value === null)

  async function getAuthUser(): Promise<AuthUser> {
    if (CURRENT_ENVIRONMENT === 'e2e') {
      return {
        uuid: UuidUtil.getRandom(),
        email: 'test@example.com',
        firstName: 'Test',
        fullName: 'Test User',
        lastName: 'User',
      }
    }

    if (authUser.value !== null) {
      return authUser.value
    }

    authUser.value = await AuthService.getAuthUser()

    return authUser.value
  }

  function setAuthUser(user: AuthUser | null): void {
    authUser.value = user
  }

  function logout(): void {
    oAuthClient.logout()
    setAuthUser(null)
  }

  return {
    isAuthenticated,
    authUser,
    getAuthUser,
    logout,
  }
})
