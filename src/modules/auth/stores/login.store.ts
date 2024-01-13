import { useLocalStorage } from '@vueuse/core'
import { defineStore } from 'pinia'
import { readonly } from 'vue'

import type { CurrentUser } from '@/models/auth/currentUser.model.ts'

export const useLoginStore = defineStore('login', () => {
	const lastLoggedInUser = useLocalStorage<CurrentUser | null>('lastLoggedInUser', null, {
		serializer: {
			read: (value) => JSON.parse(value),
			write: (value) => JSON.stringify(value),
		},
	})

	function setLastLoggedInUser(user: CurrentUser | null): void {
		lastLoggedInUser.value = user
	}

	return {
		lastLoggedInUser: readonly(lastLoggedInUser),
		setLastLoggedInUser,
	}
})
