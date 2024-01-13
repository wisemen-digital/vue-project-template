import { useLocalStorage } from '@vueuse/core'
import { defineStore } from 'pinia'

import type { CurrentUser } from '@/models'

export const useLoginStore = defineStore('login', () => {
  const lastLoggedInUser = useLocalStorage<CurrentUser | null>('lastLoggedInUser', null, {
    serializer: {
      read: value => JSON.parse(value),
      write: value => JSON.stringify(value),
    },
  })

  const setLastLoggedInUser = (user: CurrentUser | null): void => {
    lastLoggedInUser.value = user
  }

  return {
    lastLoggedInUser: readonly(lastLoggedInUser),
    setLastLoggedInUser,
  }
})
