import { useLocalStorage } from '@vueuse/core'
import { defineStore } from 'pinia'
import { computed, readonly, ref, watch } from 'vue'

import { oAuthClient } from '@/libs/oAuth.lib.ts'
import type { CurrentUser } from '@/models/auth/currentUser.model.ts'
import { useAuthCurrentUserQuery } from '@/modules/auth/api/queries/authCurrentUser.query.ts'
import { mapLoginFormToLoginRequestDto } from '@/transformers/auth.transformer'

export const useAuthStore = defineStore('auth', () => {
	const { data, isError, refetch } = useAuthCurrentUserQuery()

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
		if (isError.value) {
			throw new Error('Failed to get current user')
		}

		if (currentUser.value !== null) {
			return currentUser.value
		}

		await refetch()

		return currentUser.value!
	}

	function setCurrentUser(user: CurrentUser | null): void {
		currentUser.value = user
	}

	async function login(data: { email: string; password: string }): Promise<void> {
		const { username, password } = mapLoginFormToLoginRequestDto(data)
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
