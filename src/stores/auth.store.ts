import { useLocalStorage } from '@vueuse/core'
import { defineStore } from 'pinia'
import { computed, readonly, ref } from 'vue'

import { oAuthClient } from '@/libs/oAuth.lib.ts'
import { transformLoginFormToLoginDto } from '@/models/auth/auth.transformer'
import type { CurrentUser } from '@/models/auth/current-user/currentUser.model'
import type { LoginForm } from '@/models/auth/login/loginForm.model'
import { authService } from '@/modules/auth/api/services/auth.service'

export const useAuthStore = defineStore('auth', () => {
	const lastLoginAttemptEmail = ref<string | null>(null)
	const currentUser = ref<CurrentUser | null>(null)

	const lastLoggedInUser = useLocalStorage<CurrentUser | null>('lastLoggedInUser', null, {
		serializer: {
			read: (value) => JSON.parse(value),
			write: (value) => JSON.stringify(value),
		},
	})

	const isAuthenticated = computed<boolean>(() => currentUser.value === null)

	function setLastLoginAttemptEmail(email: string | null): void {
		lastLoginAttemptEmail.value = email
	}

	function setLastLoggedInUser(user: CurrentUser | null): void {
		lastLoggedInUser.value = user
	}

	async function getCurrentUser(): Promise<CurrentUser> {
		if (currentUser.value !== null) {
			return currentUser.value
		}

		return await authService.getCurrentUser()
	}

	function setCurrentUser(user: CurrentUser | null): void {
		currentUser.value = user
	}

	async function login(data: LoginForm): Promise<void> {
		const { username, password } = transformLoginFormToLoginDto(data)
		await oAuthClient.login(username, password)
	}

	function logout(): void {
		oAuthClient.logout()
		setCurrentUser(null)
	}

	return {
		currentUser,
		isAuthenticated,
		getCurrentUser,
		lastLoggedInUser: readonly(lastLoggedInUser),
		lastLoginAttemptEmail: readonly(lastLoginAttemptEmail),
		setLastLoginAttemptEmail,
		setLastLoggedInUser,
		setCurrentUser,
		login,
		logout,
	}
})
