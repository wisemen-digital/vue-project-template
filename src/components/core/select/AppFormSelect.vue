<script setup lang="ts" generic="T">
import { computed, useAttrs } from 'vue'
import type { z } from 'zod'

import AppFormError from '@/components/core/form-error/AppFormError.vue'
import AppFormLabel from '@/components/core/form-label/AppFormLabel.vue'
import type { AppSelectProps } from '@/components/core/select/AppSelect.vue'
import AppSelect from '@/components/core/select/AppSelect.vue'
import AppTextFormDescription from '@/components/core/text/AppTextFormDescription.vue'
import { generateUuid } from '@/utils/core/uuid/generateUuid.util'

interface AppFormSelectProps extends AppSelectProps<T> {
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
	isTouched?: boolean

	/**
	 * Determines if the input is required.
	 */
	isRequired?: boolean
}

const {
	errors = null,
	label = null,
	description = null,
	isRequired = false,
	items,
	displayFunction,
	isDisabled,
	isTouched,
	keyValue,
} = defineProps<AppFormSelectProps>()

const emits = defineEmits<{
	blur: []
}>()

const value = defineModel<T | T[]>({
	required: true,
})

const id = `app-form-select-${generateUuid()}`

/**
 * For some reason, props which are defined in AppInput are parsed as attributes instead of props
 * This is a workaround to get the props from AppInput.
 */
const attrs = useAttrs()

function onHide(): void {
	emits('blur')
}

const isInvalid = computed<boolean>(() => {
	return isTouched && errors != null
})
</script>

<template>
	<div :class="attrs.class">
		<AppFormLabel
			v-if="label !== null"
			:id="id"
			:is-disabled="isDisabled ?? false"
			:is-required="isRequired"
			:label="label"
		/>

		<AppSelect
			:id="id"
			v-model="value"
			:display-function="displayFunction"
			:is-disabled="isDisabled"
			:is-filterable="isFilterable"
			:is-invalid="isInvalid"
			:is-touched="isTouched"
			:items="items"
			:key-value="keyValue as keyof T"
			:placeholder="placeholder"
			v-bind="{
				...attrs,
				class: undefined,
			}"
			@hide="onHide"
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
