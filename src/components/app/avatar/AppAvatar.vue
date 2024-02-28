<script setup lang="ts">
import { computed } from 'vue'

import AppButton from '@/components/app/button/AppButton.vue'

const props = defineProps<{
	firstName: string
	lastName: string
}>()

const userInitials = computed<string>(() => {
	const firstNameLetter = props.firstName.charAt(0)
	const lastNameLetter = props.lastName.charAt(0)

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
