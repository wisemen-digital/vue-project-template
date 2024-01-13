<script setup lang="ts" generic="T extends SelectValue | SelectValue[]">
import type { z } from 'zod'

import type { SelectValue } from '@/ui/types'
import { generateUuid } from '@/ui/utils'

import type { Props as AppSelectProps } from './AppSelect.vue'

export interface Props<T extends SelectValue | SelectValue[]> extends Omit<AppSelectProps<T>, 'isInvalid'> {
	/**
	 * The error messages associated with the component, if any.
	 * It should be an object with an "_errors" property containing an array of strings.
	 */
	errors?: z.ZodFormattedError<string> | undefined | null

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
	 * Determines if the select is required.
	 */
	isRequired?: boolean

	placeholder?: string | null
}

const props = withDefaults(defineProps<Props<T>>(), {
	errors: null,
	label: null,
	description: null,
	isRequired: false,
	placeholder: null,
})

const emit = defineEmits<{
	(event: 'update:filter', value: string): void
	(event: 'scroll:bottom'): void
}>()

const value = defineModel<T>({
	required: true,
})

const id = `app-form-select-${generateUuid()}`

/**
 * For some reason, props which are defined in AppSelect are parsed as attributes instead of props
 * This is a workaround to get the props from AppSelect.
 */
const attrs = useAttrs()

const isInvalid = computed<boolean>(() => {
	const { errors, isTouched } = props

	return isTouched && errors != null
})
</script>

<template>
	<div :class="attrs.class">
		<AppFormLabel
			v-if="label !== null"
			:id="id"
			:is-disabled="isDisabled ?? false"
			:is-invalid="isInvalid"
			:is-required="isRequired"
			:label="label"
		/>

		<AppSelect
			:id="id"
			v-model="value"
			v-bind="{
				...(props as any),
				...attrs,
				class: undefined,
			}"
			:is-invalid="isInvalid"
			:placeholder="placeholder"
			@scroll:bottom="emit('scroll:bottom')"
			@update:filter="emit('update:filter', $event)"
		>
			<template #left>
				<slot name="left" />
			</template>

			<slot />
		</AppSelect>

		<AppText
			v-if="description !== null"
			class="mt-1"
			variant="caption"
		>
			{{ description }}
		</AppText>

		<AppFormError
			:errors="errors"
			:is-touched="isTouched"
		/>
	</div>
</template>
