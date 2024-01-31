<script setup lang="ts" generic="TFormType extends z.ZodType">
import type { Form } from 'formango'
import type { z } from 'zod'

import AppFormSubmitButton from '@/components/core/AppFormSubmitButton.vue'

const { form } = defineProps<{
	form: Form<TFormType>
}>()
</script>

<template>
	<AppFormSubmitButton
		class="mt-4"
		:form="form"
	>
		<slot />
	</AppFormSubmitButton>
</template>
