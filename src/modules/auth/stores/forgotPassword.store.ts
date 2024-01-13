import { defineStore } from 'pinia'
import { readonly, ref } from 'vue'

export const useForgotPasswordStore = defineStore('forgotPassword', () => {
	const lastLoginAttemptEmail = ref<string | null>(null)

	function setLastLoginAttemptEmail(email: string | null): void {
		lastLoginAttemptEmail.value = email
	}

	return {
		lastLoginAttemptEmail: readonly(lastLoginAttemptEmail),
		setLastLoginAttemptEmail,
	}
})
