import { defineStore } from 'pinia'
import { computed, ref, watch } from 'vue'

import { oAuthClient } from '@/libs/oAuth.lib.ts'
import type { CurrentUser } from '@/models/auth/currentUser.model.ts'
import { useGetCurrentUser } from '@/modules/auth/api/currentUser.get.ts'
import { mapLoginFormToLoginRequestDto } from '@/transformers/auth.transformer'

export const useAuthStore = defineStore('auth', () => {
	const { data, isError, refetch } = useGetCurrentUser()

	const currentUser = ref<CurrentUser | null>(null)

	const isAuthenticated = computed<boolean>(() => {
		return currentUser.value === null
	})

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
		setCurrentUser,
		login,
		logout,
	}
})
