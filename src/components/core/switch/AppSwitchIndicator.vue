<script setup lang="ts">
import { computed } from 'vue'

import AppIcon from '@/components/core/icon/AppIcon.vue'
import { switchWrapper } from '@/components/core/switch/appSwitch.style'

interface Props {
	/**
	 * Determines if the switch is selected.
	 */
	isSelected: boolean

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
}
const {
	isSelected,
	isCheckbox = false,
	isDisabled = false,
	isInvalid = false,
	selectedBackgroundClass = 'bg-primary',
} = defineProps<Props>()
const wrapperClasses = computed<string>(() => {
	return isSelected ? selectedBackgroundClass : 'bg-neutral-200'
})
</script>

<template>
	<div :class="switchWrapper({ isCheckbox, isInvalid, isDisabled, class: wrapperClasses })">
		<AppIcon
			v-if="isCheckbox"
			class="p-0.5 text-white duration-200"
			:class="{
				'opacity-100': isSelected,
				'opacity-0': !isSelected,
			}"
			icon="checkmark"
			size="full"
		/>
		<span
			v-else
			class="inline-block h-5 w-5 rounded-full bg-white duration-100"
			:class="isSelected ? 'translate-x-[1.15rem]' : 'translate-x-0.5'"
		/>
	</div>
</template>
