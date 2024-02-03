<script setup lang="ts" generic="T">
import { ComboboxOption, ComboboxOptions, ListboxOption, ListboxOptions } from '@headlessui/vue'

import AppHeightTransition from '@/components/core/transitions/AppHeightTransition.vue'
import { useAppSelectContext } from '@/composables/core/select/appSelectContext.composable'

interface Props {
	/**
	 * List of possible items.
	 */
	items: T[]

	/**
	 * Determines if the select is open.
	 */
	isOpen: boolean
}
defineProps<Props>()

const { isFilterable } = useAppSelectContext<T>()
</script>

<template>
	<ComboboxOptions
		v-if="isFilterable"
		class="rounded bg-popover p-2 shadow-popover"
	>
		<AppHeightTransition>
			<div>
				<ComboboxOption
					v-for="(item, index) in items"
					:key="index"
					v-slot="{ active, selected, disabled }"
					:value="item as any"
				>
					<slot
						:active="active"
						:disabled="disabled"
						:is-open="isOpen"
						:item="item"
						:selected="selected"
					/>
				</ComboboxOption>
			</div>
		</AppHeightTransition>
	</ComboboxOptions>
	<ListboxOptions
		v-else
		class="rounded border border-solid border-muted bg-popover p-1 shadow-popover-shadow shadow-popover"
	>
		<AppHeightTransition>
			<div class="flex flex-col gap-1">
				<ListboxOption
					v-for="(item, index) in items"
					:key="index"
					v-slot="{ active, selected, disabled }"
					:value="item as any"
				>
					<slot
						:active="active"
						:disabled="disabled"
						:is-open="isOpen"
						:item="item"
						:selected="selected"
					/>
				</ListboxOption>
			</div>
		</AppHeightTransition>
	</ListboxOptions>
</template>
