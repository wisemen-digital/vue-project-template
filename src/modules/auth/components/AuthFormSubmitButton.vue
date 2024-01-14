<script setup lang="ts">
import type { Form } from 'formango'

import AppFormSubmitButton from '@/components/core/AppFormSubmitButton.vue'

interface Props {
	// eslint-disable-next-line @typescript-eslint/no-explicit-any
	form: Form<any>
}

const { form } = defineProps<Props>()
</script>

<template>
	<AppFormSubmitButton
		class="mt-4"
		:form="form"
	>
		<slot />
	</AppFormSubmitButton>
</template>
