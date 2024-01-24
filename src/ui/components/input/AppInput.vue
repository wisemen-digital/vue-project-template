<!-- eslint-disable-next-line vue/max-len -->
<script setup lang="ts" generic="T extends InputType">
import type { InputHTMLAttributes } from 'vue'
import { computed, ref, useAttrs } from 'vue'

import type { Icon } from '@/icons/icon.type.ts'
import AppIcon from '@/ui/components/icon/AppIcon.vue'
import type { InputType, InputValue } from '@/ui/types/input.type.ts'

import { input, inputIcon, inputWrapper } from './appInput.style'

export interface Props<T extends InputType> extends /* @vue-ignore */ Omit<InputHTMLAttributes, 'disabled'> {
	/**
	 * The type of input for the component. Can be one of:
	 * 'date', 'email', 'number', 'password', 'text', 'time', 'datetime-local'
	 * Defaults to 'text'.
	 */
	type?: T

	/**
	 * Whether the input is disabled or not.
	 * If true, the input is disabled and cannot be focused.
	 */
	isDisabled?: boolean

	/**
	 * Whether the input border should be red.
	 */
	isInvalid?: boolean

	/**
	 * The icon to display on the left side of the input.
	 */
	iconLeft?: Icon | null

	/**
	 * The icon to display on the right side of the input.
	 */
	iconRight?: Icon | null

	/**
	 *
	 */
	isCompact?: boolean

	/**
	 *
	 */
	dataMasks?: string | null
}

const props = withDefaults(defineProps<Props<T>>(), {
	// @ts-expect-error Yet another vue ts error
	type: 'text',
	isDisabled: false,
	isInvalid: false,
	isCompact: false,
	iconLeft: null,
	iconRight: null,
	dataMasks: undefined,
})

const value = defineModel<InputValue<T>>({
	required: true,
})

const computedValue = computed<InputValue<T>>({
	get: () => value.value,
	set: (newValue: InputValue<T>) => {
		const { type } = props

		if (type === 'number') {
			value.value = (newValue === '' ? '' : Number(newValue)) as InputValue<T>
		} else {
			value.value = newValue
		}
	},
})

const isFocused = ref<boolean>(false)

const attrs = useAttrs()

const inputWrapperClasses = computed<string>(() => {
	const { isDisabled, isInvalid, isCompact } = props

	return inputWrapper({
		isDisabled,
		isInvalid,
		isCompact,
		isFocused: isFocused.value,
		class: attrs.class as string,
	})
})

const inputClasses = computed<string>(() => input())

const inputIconClasses = computed<string>(() => {
	const { isInvalid } = props

	return inputIcon({
		isInvalid,
	})
})

const inputAttrs = computed<Record<string, unknown>>(() => ({
	...props,
	...attrs,
	class: undefined,
}))

function onFocus(): void {
	isFocused.value = true
}

function onBlur(): void {
	isFocused.value = false
}
</script>

<template>
	<div :class="inputWrapperClasses">
		<slot name="left">
			<AppIcon
				v-if="iconLeft !== null"
				class="ml-3"
				:class="inputIconClasses"
				:icon="iconLeft"
			/>
		</slot>

		<input
			v-model="computedValue"
			v-bind="inputAttrs"
			:class="inputClasses"
			:disabled="isDisabled"
			:type="type as string"
			@blur="onBlur"
			@focus="onFocus"
		/>

		<slot name="right">
			<AppIcon
				v-if="iconRight !== null"
				class="mr-3"
				:class="inputIconClasses"
				:icon="iconRight"
			/>
		</slot>
	</div>
</template>
