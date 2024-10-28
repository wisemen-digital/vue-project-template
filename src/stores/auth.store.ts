import { defineStore } from 'pinia'
import {
  computed,
  ref,
} from 'vue'

import {
  AUTH_APPLE_IDP_ID,
  AUTH_GOOGLE_IDP_ID,
  CURRENT_ENVIRONMENT,
} from '@/constants/environment.constant.ts'
import { oAuthClient } from '@/libs/oAuth.lib.ts'
import { AuthUserTransformer } from '@/models/auth-user/auth.transformer'
import type { AuthUser } from '@/models/auth-user/authUser.model'
import { UuidUtil } from '@/utils/uuid.util.ts'

export const useAuthStore = defineStore('auth', () => {
  const authUser = ref<AuthUser | null>(null)

  const isAuthenticated = computed<boolean>(() => authUser.value === null)

  const logoutCallback = ref<(() => void) | null>(null)

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

  async function getIdentityProviderLoginUrl(provider: string): Promise<string> {
    if (provider === 'apple') {
      return await oAuthClient.getIdentityProviderLoginUrl(AUTH_APPLE_IDP_ID)
    }

    if (provider === 'google') {
      return await oAuthClient.getIdentityProviderLoginUrl(AUTH_GOOGLE_IDP_ID)
    }

    throw new Error('Unsupported identity provider')
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
    getIdentityProviderLoginUrl,
    getLoginUrl,
    getLogoutUrl,
    loginWithCode,
    logout,
    onLogout,
  }
})
