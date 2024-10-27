import { useLocalStorage } from '@vueuse/core'
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
import { AuthTransformer } from '@/models/auth/auth.transformer'
import type { CurrentUser } from '@/models/auth/current-user/currentUser.model'
import type { LoginForm } from '@/models/auth/login/loginForm.model'
import type { ResetPasswordForm } from '@/models/auth/reset-password/resetPasswordForm.model.ts'
import { LoggerUtil } from '@/utils/logger.util.ts'
import { UuidUtil } from '@/utils/uuid.util.ts'

export const useAuthStore = defineStore('auth', () => {
  const lastLoginAttemptEmail = ref<null | string>(null)
  const currentUser = ref<CurrentUser | null>(null)

  const lastLoggedInUser = useLocalStorage<CurrentUser | null>('lastLoggedInUser', null, {
    serializer: {
      read: (value) => JSON.parse(value),
      write: (value) => JSON.stringify(value),
    },
  })

  const isAuthenticated = computed<boolean>(() => currentUser.value === null)

  function setLastLoginAttemptEmail(email: null | string): void {
    lastLoginAttemptEmail.value = email
  }

  function setLastLoggedInUser(user: CurrentUser | null): void {
    lastLoggedInUser.value = user
  }

  function isLoggedIn(): boolean {
    return oAuthClient.isLoggedIn()
  }

  async function getCurrentUser(): Promise<CurrentUser> {
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

    const user = await oAuthClient.getUserInfo()

    currentUser.value = AuthTransformer.toCurrentUser(user)

    return currentUser.value
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

  function setCurrentUser(user: CurrentUser | null): void {
    currentUser.value = user
  }

  async function loginWithCode(code: string): Promise<void> {
    await oAuthClient.loginWithCode(code)
  }

  // TODO implement login
  async function login(data: LoginForm): Promise<void> {
    // const { password, username } = AuthTransformer.toLoginDto(data)

    // await oAuthClient.loginPassword(username, password)

    LoggerUtil.logInfo('login', data)

    return await Promise.resolve()
  }

  // TODO implement resetPassword
  async function resetPassword(form: ResetPasswordForm): Promise<void> {
    LoggerUtil.logInfo('resetPassword', form)

    return await Promise.resolve()
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
    getIdentityProviderLoginUrl,
    getLoginUrl,
    getLogoutUrl,
    lastLoggedInUser: computed<CurrentUser | null>(() => lastLoggedInUser.value),
    lastLoginAttemptEmail: computed<null | string>(() => lastLoginAttemptEmail.value),
    login,
    loginWithCode, logout,
    resetPassword,
    setLastLoggedInUser,
    setLastLoginAttemptEmail,
  }
})
