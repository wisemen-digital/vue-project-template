<script setup lang="ts" generic="TFormType extends z.ZodType">
import type { Form } from 'formango'
import { computed } from 'vue'
import type { z } from 'zod'

import type { Props as ButtonProps } from '@/components/app/button/AppButton.vue'
import AppButton from '@/components/app/button/AppButton.vue'
import type { Routes } from '@/routes/routes'

interface Props extends Omit<ButtonProps<keyof Routes>, 'form'> {
	form: Form<TFormType>
	isAlwaysEnabled?: boolean
	isDisabled?: boolean
}

const props = withDefaults(defineProps<Props>(), {
	isAlwaysEnabled: false,
	isDisabled: false,
})

const isButtonDisabled = computed<boolean>(() => {
	if (props.isDisabled) {
		return true
	}

	if (!props.isAlwaysEnabled) {
		return !props.form.isDirty
	}

	return false
})
</script>

<template>
	<AppButton
		:is-disabled="isButtonDisabled"
		:is-loading="props.form.isSubmitting"
		type="submit"
		@click="props.form.submit"
	>
		<slot />
	</AppButton>
</template>
