import { useLocalStorage } from '@vueuse/core'
import { defineStore } from 'pinia'
import { computed, readonly, ref, watch } from 'vue'

import { oAuthClient } from '@/libs/oAuth.lib.ts'
import { transformLoginFormToLoginDto } from '@/models/auth/auth.transformer'
import type { CurrentUser } from '@/models/auth/current-user/currentUser.model'
import { useAuthCurrentUserQuery } from '@/modules/auth/api/queries/authCurrentUser.query.ts'
import { useEnvironment } from '@/utils/environment.util'

export const useAuthStore = defineStore('auth', () => {
	const lastLoginAttemptEmail = ref<string | null>(null)
	const currentUser = ref<CurrentUser | null>(null)

	const { data, isError, refetch: refetchCurrentUser } = useAuthCurrentUserQuery()
	const { isDevelopment } = useEnvironment()

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
		if (isDevelopment.value) {
			return Promise.resolve({
				id: '1',
				email: '',
				firstName: '',
				fullName: '',
				lastName: '',
			})
		}

		if (isError.value) {
			throw new Error('Failed to get current user')
		}

		if (currentUser.value !== null) {
			return currentUser.value
		}

		await refetchCurrentUser()

		return currentUser.value!
	}

	function setCurrentUser(user: CurrentUser | null): void {
		currentUser.value = user
	}

	async function login(data: { email: string; password: string }): Promise<void> {
		if (isDevelopment.value) {
			return
		}

		const { username, password } = transformLoginFormToLoginDto(data)
		await oAuthClient.login(username, password)
	}

	function logout(): void {
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
		lastLoggedInUser: readonly(lastLoggedInUser),
		lastLoginAttemptEmail: readonly(lastLoginAttemptEmail),
		setLastLoginAttemptEmail,
		setLastLoggedInUser,
		setCurrentUser,
		login,
		logout,
	}
})
