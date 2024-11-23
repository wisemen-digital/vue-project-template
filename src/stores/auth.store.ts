import { defineStore } from 'pinia'
import {
  computed,
  ref,
} from 'vue'

import { CURRENT_ENVIRONMENT } from '@/constants/environment.constant.ts'
import { oAuthClient } from '@/libs/oAuth.lib.ts'
import { AuthUserTransformer } from '@/models/auth-user/auth.transformer'
import type { AuthUser } from '@/models/auth-user/authUser.model'
import type { UserUuid } from '@/models/user/userUuid.model'
import { UuidUtil } from '@/utils/uuid.util.ts'

export const useAuthStore = defineStore('auth', () => {
  const authUser = ref<AuthUser | null>(null)

  const isAuthenticated = computed<boolean>(() => authUser.value === null)

  const logoutCallback = ref<(() => void) | null>(null)

  async function getAuthUser(): Promise<AuthUser> {
    if (CURRENT_ENVIRONMENT === 'e2e') {
      const user = {
        uuid: UuidUtil.getRandom<UserUuid>(),
        email: 'test@example.com',
        firstName: 'Test',
        fullName: 'Test User',
        lastName: 'User',
      }

      authUser.value = user

      return user
    }

    if (authUser.value !== null) {
      return authUser.value
    }

    const user = await oAuthClient.getUserInfo()

    authUser.value = AuthUserTransformer.fromDto(user)

    return authUser.value
  }

  function isLoggedIn(): boolean {
    return oAuthClient.isLoggedIn()
  }

  function setAuthUser(user: AuthUser | null): void {
    authUser.value = user
  }

  async function getLoginUrl(): Promise<string> {
    return await oAuthClient.getLoginUrl()
  }

  function getLogoutUrl(): string {
    return oAuthClient.getLogoutUrl()
  }

  async function loginWithCode(code: string): Promise<void> {
    await oAuthClient.loginWithCode(code)
  }

  function logout(): void {
    oAuthClient.logout()
    setAuthUser(null)
    logoutCallback.value?.()
  }

  function onLogout(callback: () => void): void {
    logoutCallback.value = callback
  }

  return {
    isAuthenticated,
    isLoggedIn,
    authUser,
    getAuthUser,
    getLoginUrl,
    getLogoutUrl,
    loginWithCode,
    logout,
    onLogout,
  }
})
