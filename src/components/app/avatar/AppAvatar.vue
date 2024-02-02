<script setup lang="ts">
import { computed } from 'vue'

import AppButton from '@/components/core/button/AppButton.vue'
import type { CurrentUser } from '@/models/auth/currentUser.model.ts'

const props = defineProps<{
	user: CurrentUser | null
}>()

const userInitials = computed<string>(() => {
	if (!props.user) {
		return ''
	}

	const firstNameLetter = props.user.firstName.charAt(0)
	const lastNameLetter = props.user.lastName.charAt(0)

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
