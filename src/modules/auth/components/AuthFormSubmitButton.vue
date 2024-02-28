<script setup lang="ts" generic="TFormType extends z.ZodType">
import type { Form } from 'formango'
import type { z } from 'zod'

import AppFormSubmitButton from '@/components/form/form/AppFormSubmitButton.vue'

const props = defineProps<{
	form: Form<TFormType>
}>()
</script>

<template>
	<AppFormSubmitButton
		class="mt-4"
		:form="props.form"
	>
		<slot />
	</AppFormSubmitButton>
</template>
