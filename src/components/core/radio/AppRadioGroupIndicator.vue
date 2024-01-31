<script setup lang="ts">
import {
	radioGroupIndicatorContainerVariants,
	radioGroupIndicatorVariants,
} from '@/components/core/radio/appRadioGroup.style'

interface Props {
	/**
	 *  Whether the radio group indicator is active.
	 */
	isActive?: boolean
	/**
	 *  Whether the radio group indicator is checked.
	 */
	isChecked?: boolean
	/**
	 *  Whether the radio group indicator is disabled.
	 */
	isDisabled?: boolean
	/**
	 *  Whether the radio group indicator is invalid.
	 */
	isInvalid?: boolean
}
const { isChecked = false } = defineProps<Props>()
</script>

<template>
	<div
		:class="
			radioGroupIndicatorContainerVariants({
				isInvalid,
			})
		"
	>
		<div
			:class="
				radioGroupIndicatorVariants({
					isChecked,
				})
			"
		/>
	</div>
</template>
