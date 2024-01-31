<script setup lang="ts" generic="T">
import { RadioGroupOption } from '@headlessui/vue'

interface Props {
	/**
	 * List of possible items.
	 */
	items: NonNullable<T>[]

	/**
	 * Key of the value for disabled state.
	 */
	disabledKey?: keyof NonNullable<T>
}
const { items, disabledKey } = defineProps<Props>()

function isDisabled(item: NonNullable<T>): boolean {
	if (disabledKey) {
		return !!item[disabledKey]
	}

	return false
}
</script>

<template>
	<div>
		<RadioGroupOption
			v-for="(item, index) in items"
			:key="index"
			v-slot="{ active, checked, disabled }"
			:disabled="isDisabled(item)"
			:value="item as any"
		>
			<slot
				:is-active="active"
				:is-checked="checked"
				:is-disabled="disabled"
				:item="item"
			/>
		</RadioGroupOption>
	</div>
</template>
