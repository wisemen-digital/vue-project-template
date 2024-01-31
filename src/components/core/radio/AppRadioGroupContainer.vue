<script setup lang="ts" generic="T">
import { RadioGroup } from '@headlessui/vue'
import { useFocusWithin } from '@vueuse/core'
import { ref, watch } from 'vue'

export interface AppRadioProps<T> {
	/**
	 * Key of the value for comparing.
	 */
	by?: keyof NonNullable<T> | ((a: T, z: T) => boolean)

	/**
	 * List of possible items.
	 */
	items: NonNullable<T>[]

	/**
	 * Determines if the select is disabled.
	 */
	isDisabled?: boolean

	/**
	 * Determines if is invalid or valid.
	 */
	isInvalid?: boolean
}

const { items, isDisabled = false, isInvalid = false } = defineProps<AppRadioProps<T>>()

const emits = defineEmits<{
	blur: []
}>()
const model = defineModel<T>('modelValue', { required: true })

const group = ref<HTMLElement | null>(null)
const hasBeenFocused = ref<boolean>(false)
const { focused } = useFocusWithin(group)

function onBlur(): void {
	hasBeenFocused.value = true
	emits('blur')
}

watch(
	() => focused.value,
	() => {
		if (focused.value) {
			hasBeenFocused.value = true
		} else {
			onBlur()
		}
	}
)
</script>

<template>
	<!-- eslint-disable vue/valid-v-model -->
	<RadioGroup
		ref="group"
		v-model="model as any"
		:by="by as any"
		:disabled="isDisabled"
	>
		<slot
			:is-disabled="isDisabled"
			:is-invalid="isInvalid"
			:items="items"
			:selected-item="model"
		/>
	</RadioGroup>
</template>
