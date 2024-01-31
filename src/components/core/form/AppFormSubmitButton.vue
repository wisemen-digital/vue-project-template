<script setup lang="ts" generic="TFormType extends z.ZodType">
import type { Form } from 'formango'
import { computed } from 'vue'
import type { z } from 'zod'

import type { Props as ButtonProps } from '@/components/core/button/AppButton.vue'
import AppButton from '@/components/core/button/AppButton.vue'
import type { Routes } from '@/models/core/routes.model.ts'

interface Props extends Omit<ButtonProps<keyof Routes>, 'form'> {
	form: Form<TFormType>
	isAlwaysEnabled?: boolean
	isDisabled?: boolean
}

const { form, iconLeft, isAlwaysEnabled = false, isDisabled = false } = defineProps<Props>()

const isButtonDisabled = computed<boolean>(() => {
	if (isDisabled) {
		return true
	}

	if (!isAlwaysEnabled) {
		return !form.isDirty
	}

	return false
})
</script>

<template>
	<AppButton
		:icon-left="iconLeft"
		:is-disabled="isButtonDisabled"
		:is-loading="form.isSubmitting"
		type="submit"
		@click="form.submit"
	>
		<slot />
	</AppButton>
</template>
