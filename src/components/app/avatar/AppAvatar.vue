<script setup lang="ts">
import { computed } from 'vue'

import AppButton from '@/components/core/button/AppButton.vue'
import type { CurrentUser } from '@/models/auth/currentUser.model.ts'

const { user } = defineProps<{
	user: CurrentUser | null
}>()

const userInitials = computed<string>(() => {
	if (user === null) {
		return ''
	}

	const firstNameLetter = user.firstName.charAt(0)
	const lastNameLetter = user.lastName.charAt(0)

	return `${firstNameLetter}${lastNameLetter}`
})
</script>

<template>
	<AppButton
		class="flex aspect-square items-center justify-center rounded-full bg-primary text-background"
		size="sm"
	>
		{{ userInitials }}
	</AppButton>
</template>
