<script setup lang="ts" generic="T extends InputType">
import type { z } from 'zod'

import type { InputType, InputValue } from '@/ui/types'
import { generateUuid } from '@/ui/utils'

import type { Props as AppInputProps } from './AppInput.vue'

export interface Props<T extends InputType> extends Omit<AppInputProps<T>, 'isInvalid'> {
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
	 * Determines if the input is required.
	 */
	isRequired?: boolean
}

const props = withDefaults(defineProps<Props<T>>(), {
	errors: null,
	label: null,
	description: null,
	isRequired: false,
})

const value = defineModel<InputValue<T>>({
	required: true,
})

const id = `app-form-input-${generateUuid()}`

const isPasswordVisible = ref<boolean>(false)

/**
 * For some reason, props which are defined in AppInput are parsed as attributes instead of props
 * This is a workaround to get the props from AppInput.
 */
const attrs = useAttrs()

const isInvalid = computed<boolean>(() => {
	const { errors, isTouched } = props

	return isTouched && errors != null
})

const computedValue = computed<InputValue<T>>({
	get: () => value.value,
	set: (newValue: InputValue<T>) => {
		if (props.type === 'number') {
			value.value = (newValue === '' ? '' : Number(newValue)) as InputValue<T>
		} else {
			value.value = newValue
		}
	},
})

const computedType = computed<InputType>(() => {
	const { type } = props

	if (type === 'password' && isPasswordVisible.value) {
		return 'text'
	}

	return type ?? 'text'
})

function onTogglePassword(): void {
	isPasswordVisible.value = !isPasswordVisible.value
}
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

		<AppInput
			:id="id"
			v-model="computedValue"
			v-bind="{
				...(props as Record<string, unknown>),
				...attrs,
				class: undefined,
			}"
			:is-invalid="isInvalid"
			:type="computedType"
		>
			<template #left>
				<slot name="left" />
			</template>

			<template #right>
				<slot name="right">
					<AppButton
						v-if="type === 'password'"
						class="scale-[85%]"
						:icon-left="isPasswordVisible ? 'eyeSlash' : 'eye'"
						size="icon"
						variant="ghost"
						@click="onTogglePassword"
					/>
				</slot>
			</template>
		</AppInput>

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
