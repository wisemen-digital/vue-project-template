<script setup lang="ts" generic="TValue">
import { computed } from 'vue'
import type { z } from 'zod'

import AppFormError from '@/components/core/form-error/AppFormError.vue'
import AppFormLabel from '@/components/core/form-label/AppFormLabel.vue'
import type { AppSwitchProps } from '@/components/core/switch/AppSwitch.vue'
import AppSwitch from '@/components/core/switch/AppSwitch.vue'
import AppTextFormDescription from '@/components/core/text/AppTextFormDescription.vue'
import { generateUuid } from '@/utils/core/uuid/generateUuid.util'

export interface Props<T> extends Omit<AppSwitchProps<T>, 'isInvalid'> {
	/**
	 * The error messages associated with the component, if any.
	 * It should be an object with an "_errors" property containing an array of strings.
	 */
	errors?: z.ZodFormattedError<string> | null | undefined

	/**
	 * The label to be displayed above the component.
	 */
	label?: string | null

	/**
	 * Extra information to be displayed below the input.
	 */
	description?: string | null

	/**
	 * Determines if the component has emitted a `blur` event.
	 */
	isTouched: boolean

	/**
	 * Determines if the input is required.
	 */
	isRequired?: boolean
}

const props = withDefaults(defineProps<Props<TValue>>(), {
	errors: null,
	label: null,
	description: null,
	isRequired: false,
})

const emits = defineEmits<{
	blur: []
	focus: []
}>()

const value = defineModel<TValue | null>({
	required: true,
})

const id = `app-form-switch-${generateUuid()}`

const isInvalid = computed<boolean>(() => {
	const { errors, isTouched } = props

	return isTouched && errors != null
})

function onBlur(): void {
	emits('blur')
}

function onFocus(): void {
	emits('focus')
}
</script>

<template>
	<div class="flex flex-col">
		<AppFormLabel
			v-if="label !== null"
			:id="id"
			:is-disabled="isDisabled ?? false"
			:is-invalid="isInvalid"
			:is-required="isRequired"
			:label="label"
		/>

		<AppSwitch
			:id="id"
			v-model="value"
			v-bind="props"
			:is-invalid="isInvalid"
			@blur="onBlur"
			@focus="onFocus"
		/>

		<AppTextFormDescription
			v-if="description !== null"
			class="mt-1"
		>
			{{ description }}
		</AppTextFormDescription>

		<AppFormError
			:errors="errors"
			:is-touched="isTouched"
		/>
	</div>
</template>
