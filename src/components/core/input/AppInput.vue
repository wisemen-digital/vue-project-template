<!-- eslint-disable-next-line vue/max-len -->
<script setup lang="ts" generic="T extends InputType">
import { computed, ref, useAttrs } from 'vue'

import AppIcon from '@/components/core/icon/AppIcon.vue'
import type { InputProps, InputType, InputValue } from '@/types/core/input.type'

import { input, inputIcon, inputWrapper } from './appInput.style'

const props = withDefaults(defineProps<InputProps<T>>(), {
	// @ts-expect-error Yet another vue ts error
	type: 'text',
	isOutsideFocused: false,
	isDisabled: false,
	isInvalid: false,
	isCompact: false,
	isReadonly: false,
	placeholder: undefined,
	iconLeft: null,
	iconRight: null,
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
		isFocused: isFocused.value || props.isOutsideFocused,
		class: attrs.class as string,
	})
})

const inputClasses = computed<string>(() => input({ isReadonly: props.isReadonly }))

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
			:placeholder="placeholder"
			:readonly="isReadonly"
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
