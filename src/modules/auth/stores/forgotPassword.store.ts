import { defineStore } from 'pinia'

export const useForgotPasswordStore = defineStore('forgotPassword', () => {
  const lastLoginAttemptEmail = ref<string | null>(null)

  const setLastLoginAttemptEmail = (email: string | null): void => {
    lastLoginAttemptEmail.value = email
  }

  return {
    lastLoginAttemptEmail: readonly(lastLoginAttemptEmail),
    setLastLoginAttemptEmail,
  }
})
