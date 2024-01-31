<script setup lang="ts">
import { ComboboxOption, ListboxOption } from '@headlessui/vue'
import { inject } from 'vue'

import { selectOption } from './appSelect.style'

const { isDisabled } = defineProps<{
	/**
	 * Determines if the option is disabled.
	 */
	isDisabled?: boolean
}>()

const isFilterable = inject('isFilterable', false)
</script>

<template>
	<Component
		:is="isFilterable ? ComboboxOption : ListboxOption"
		v-slot="{ selected, active, disabled }"
		as="template"
		:disabled="isDisabled"
	>
		<div
			:class="
				selectOption({
					isSelected: selected,
					isActive: active,
					isDisabled: disabled,
				})
			"
		>
			<div class="flex size-5 shrink-0 items-center justify-center">
				<AppIcon
					v-if="selected"
					class="size-3.5"
					icon="checkmark"
				/>
			</div>

			<span class="cursor-[inherit] truncate">
				<slot />
			</span>
		</div>
	</Component>
</template>
