<script setup lang="ts" generic="TValue">
import { Switch } from '@headlessui/vue'
import { computed } from 'vue'

import AppSwitchIndicator from '@/components/core/switch/AppSwitchIndicator.vue'

export interface AppSwitchProps<TValue> {
	/**
	 * The value if the switch is checked.
	 */
	value?: TValue

	/**
	 * Determines if the switch is a checkbox.
	 */
	isCheckbox?: boolean

	/**
	 * Determines if the switch is disabled.
	 */
	isDisabled?: boolean

	/**
	 * Determines if the switch is invalid.
	 */
	isInvalid?: boolean

	/**
	 * The class to apply when the switch is selected.
	 */
	selectedBackgroundClass?: string

	/**
	 * The name of the switch.
	 */
	name?: string
}

const {
	value = true as TValue,
	isDisabled = false,
	isCheckbox = false,
	selectedBackgroundClass = 'bg-primary',
} = defineProps<AppSwitchProps<TValue>>()

const emits = defineEmits<{
	focus: []
	blur: []
}>()

const model = defineModel<TValue | null>({
	required: true,
	default: null,
})

const isSelected = computed<boolean>({
	get() {
		return model.value === value
	},
	set(isSelectedValue: boolean) {
		if (isSelectedValue) {
			model.value = value
		} else {
			model.value = null
		}
	},
})

function onFocus(): void {
	emits('focus')
}

function onBlur(): void {
	emits('blur')
}
</script>

<template>
	<!-- eslint-disable vue/valid-v-model -->
	<Switch
		v-model="isSelected"
		class="flex justify-start"
		:disabled="isDisabled"
		:name="name"
		:value="typeof value === 'string' ? value : undefined"
		@blur="onBlur"
		@focus="onFocus"
	>
		<slot
			:is-checkbox="isCheckbox"
			:is-disabled="isDisabled"
			:is-selected="isSelected"
			:selected-background-class="selectedBackgroundClass"
		>
			<AppSwitchIndicator
				:is-checkbox="isCheckbox"
				:is-disabled="isDisabled"
				:is-selected="isSelected"
				:selected-background-class="selectedBackgroundClass"
			/>
		</slot>
	</Switch>
</template>
