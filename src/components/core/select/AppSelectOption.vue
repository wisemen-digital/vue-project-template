<script setup lang="ts" generic="T">
import { computed } from 'vue'

import type { AppSelectOptionProps } from '@/components/core/select/appSelect.style'
import { appSelectOptionVariants } from '@/components/core/select/appSelect.style'
import { useAppSelectContext } from '@/composables/core/select/appSelectContext.composable'

interface Props {
	/**
	 * The value of the option.
	 */
	value: T

	/**
	 * Determines if the option is active.
	 */
	isActive?: boolean

	/**
	 * Determines if the option is selected.
	 */
	isSelected?: boolean

	/**
	 * Determines if the option is disabled.
	 */
	isDisabled?: boolean
}

const { value, isActive = false, isSelected = false, isDisabled = false } = defineProps<Props>()

const optionStatus = computed<AppSelectOptionProps['variant']>(() => {
	if (isDisabled) {
		return 'disabled'
	} else {
		return 'default'
	}
})

const { getDisplayValue } = useAppSelectContext()
</script>

<template>
	<button :class="appSelectOptionVariants({ variant: optionStatus, selected: isSelected, active: isActive })">
		{{ getDisplayValue(value) }}
	</button>
</template>
@/composables/core/select/appSelectContext.composable
