import { defineStore } from 'pinia'
import {
  computed,
  ref,
} from 'vue'

import { oAuthClient } from '@/libs/oAuth.lib.ts'
import { AuthUserTransformer } from '@/models/auth-user/auth.transformer'
import type { AuthUser } from '@/models/auth-user/authUser.model'

async function getLoginUrl(): Promise<string> {
  return await oAuthClient.getLoginUrl()
}

function getLogoutUrl(): string {
  return oAuthClient.getLogoutUrl()
}

async function loginWithCode(code: string): Promise<void> {
  await oAuthClient.loginWithCode(code)
}

async function isLoggedIn(): Promise<boolean> {
  return await oAuthClient.isLoggedIn()
}

export const useAuthStore = defineStore('auth', () => {
  const authUser = ref<AuthUser | null>(null)

  const isAuthenticated = computed<boolean>(() => authUser.value === null)

  const logoutCallback = ref<(() => void) | null>(null)

  async function getAuthUser(): Promise<AuthUser> {
    if (authUser.value !== null) {
      return authUser.value
    }

    const user = await oAuthClient.getUserInfo()

    authUser.value = AuthUserTransformer.fromDto(user)

    return authUser.value
  }

  function setAuthUser(user: AuthUser | null): void {
    authUser.value = user
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
