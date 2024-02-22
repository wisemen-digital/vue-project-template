<script setup lang="ts">
import { computed } from 'vue'

import { formLabel } from './formLabel.style'

const props = withDefaults(
	defineProps<{
		label: string
		id: string
		isDisabled?: boolean
		isInvalid?: boolean
		isRequired: boolean
	}>(),
	{
		isDisabled: false,
		isRequired: false,
	}
)

const formLabelClasses = computed<string>(() =>
	formLabel({
		isInvalid: props.isInvalid,
		isDisabled: props.isDisabled,
	})
)

const computedLabel = computed<string | null>(() => {
	return props.isRequired ? `${props.label} *` : props.label
})
</script>

<template>
	<label
		:class="formLabelClasses"
		:for="props.id"
	>
		{{ computedLabel }}
	</label>
</template>
