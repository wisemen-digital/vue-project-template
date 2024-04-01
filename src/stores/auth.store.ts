import { useLocalStorage } from '@vueuse/core'
import { defineStore } from 'pinia'
import {
  computed,
  readonly,
  ref,
} from 'vue'

import { oAuthClient } from '@/libs/oAuth.lib.ts'
import { AuthTransformer } from '@/models/auth/auth.transformer'
import type { CurrentUser } from '@/models/auth/current-user/currentUser.model'
import type { LoginForm } from '@/models/auth/login/loginForm.model'
import { AuthService } from '@/modules/auth/api/services/auth.service'

export const useAuthStore = defineStore('auth', () => {
  const lastLoginAttemptEmail = ref<null | string>(null)
  const currentUser = ref<CurrentUser | null>(null)

  const lastLoggedInUser = useLocalStorage<CurrentUser | null>('lastLoggedInUser', null, {
    serializer: {
      read: value => JSON.parse(value),
      write: value => JSON.stringify(value),
    },
  })

  const isAuthenticated = computed<boolean>(() => currentUser.value === null)

  function setLastLoginAttemptEmail(email: null | string): void {
    lastLoginAttemptEmail.value = email
  }

  function setLastLoggedInUser(user: CurrentUser | null): void {
    lastLoggedInUser.value = user
  }

  async function getCurrentUser(): Promise<CurrentUser> {
    if (currentUser.value !== null) {
      return currentUser.value
    }

    currentUser.value = await AuthService.getCurrentUser()

    return currentUser.value
  }

  function setCurrentUser(user: CurrentUser | null): void {
    currentUser.value = user
  }

  async function login(data: LoginForm): Promise<void> {
    const { password, username } = AuthTransformer.toLoginDto(data)
    await oAuthClient.login(username, password)
  }

  function logout(): void {
    oAuthClient.logout()
    setCurrentUser(null)
  }

  return {
    currentUser,
    getCurrentUser,
    isAuthenticated,
    lastLoggedInUser: readonly(lastLoggedInUser),
    lastLoginAttemptEmail: readonly(lastLoginAttemptEmail),
    login,
    logout,
    setCurrentUser,
    setLastLoggedInUser,
    setLastLoginAttemptEmail,
  }
})
