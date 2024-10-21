import { defineStore } from 'pinia'
import {
  computed,
  ref,
} from 'vue'

import { CURRENT_ENVIRONMENT } from '@/constants/environment.constant.ts'
import { oAuthClient } from '@/libs/oAuth.lib.ts'
import { AuthTransformer } from '@/models/auth/auth.transformer.ts'
import type { AuthUser } from '@/models/auth/current-user/currentUser.model'
import type { AuthUserDto } from '@/models/auth/current-user/currentUserDto.model.ts'
import { UuidUtil } from '@/utils/uuid.util.ts'

export const useAuthStore = defineStore('auth', () => {
  const currentUser = ref<AuthUser | null>(null)

  const isAuthenticated = computed<boolean>(() => currentUser.value === null)

  async function getCurrentUser(): Promise<AuthUser> {
    if (CURRENT_ENVIRONMENT === 'e2e') {
      return {
        uuid: UuidUtil.getRandom(),
        email: 'test@example.com',
        firstName: 'Test',
        fullName: 'Test User',
        lastName: 'User',
      }
    }

    if (currentUser.value !== null) {
      return currentUser.value
    }

    const response = await oAuthClient.getUserInfo<AuthUserDto>()

    currentUser.value = AuthTransformer.toCurrentUser(response)

    return currentUser.value
  }

  function setCurrentUser(user: AuthUser | null): void {
    currentUser.value = user
  }

  async function getLoginUrl(): Promise<string> {
    return await oAuthClient.getLoginUrl()
  }

  function getLogoutUrl(): string {
    return oAuthClient.getLogoutUrl()
  }

  function isLoggedIn(): boolean {
    return oAuthClient.isLoggedIn()
  }

  async function login(code: string): Promise<void> {
    await oAuthClient.loginAuthorization(code)
  }

  function logout(): void {
    oAuthClient.logout()
    setCurrentUser(null)
  }

  return {
    isAuthenticated,
    isLoggedIn,
    currentUser,
    getCurrentUser,
    getLoginUrl,
    getLogoutUrl,
    login,
    logout,
  }
})
