import { defineStore } from 'pinia'

import { oAuthClient } from '@/libs'
import type { CurrentUser } from '@/models'
import { useGetCurrentUser } from '@/modules/auth/api'

export const useAuthStore = defineStore('auth', () => {
  const {
    data,
    isError,
    refetch,
  } = useGetCurrentUser()

  const currentUser = ref<CurrentUser | null>(null)

  const isAuthenticated = computed<boolean>(() => {
    return currentUser.value === null
  })

  const getCurrentUser = async (): Promise<CurrentUser> => {
    if (isError.value)
      throw new Error('Failed to get current user')

    if (currentUser.value !== null)
      return currentUser.value

    await refetch()

    return currentUser.value!
  }

  const setCurrentUser = (user: CurrentUser | null): void => {
    currentUser.value = user
  }

  const login = async ({ username, password }: { username: string, password: string }): Promise<void> => {
    await oAuthClient.login(username, password)
  }

  const logout = (): void => {
    oAuthClient.logout()
    setCurrentUser(null)
  }

  // In case the user is updated via a mutation, we want to update its value
  watch(data, (data) => {
    setCurrentUser(data)
  })

  return {
    currentUser,
    isAuthenticated,
    getCurrentUser,
    setCurrentUser,
    login,
    logout,
  }
})
