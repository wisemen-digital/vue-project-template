<script setup lang="ts" generic="T">
import AppSelectContainer from '@/components/core/select/AppSelectContainer.vue'
import AppSelectInput from '@/components/core/select/AppSelectInput.vue'
import AppSelectOption from '@/components/core/select/AppSelectOption.vue'
import AppSelectOptions from '@/components/core/select/AppSelectOptions.vue'

export interface AppSelectProps<T> {
	/**
	 * Function that determines the output of an item.
	 */
	displayFunction?: (value: T) => string

	/**
	 * Key of the value for comparing.
	 */
	keyValue?: keyof T

	/**
	 * List of possible items.
	 */
	items: T[]

	/**
	 * Determines if the select is disabled.
	 */
	isDisabled?: boolean

	/**
	 * Placeholder text inside the select.
	 */
	placeholder?: string

	/**
	 * Determines if you can filter inside the input.
	 */
	isFilterable?: boolean

	/**
	 * Determines if is invalid or valid.
	 */
	isInvalid?: boolean
}

const {
	items,
	displayFunction = (value: T): string => {
		return String(value)
	},
	isFilterable = false,
	isInvalid = false,
} = defineProps<AppSelectProps<T>>()

const emits = defineEmits<{
	'hide': []
	'show': []
	'update:search': [string]
}>()

const model = defineModel<T | T[]>({
	required: true,
})

function onHide(): void {
	emits('hide')
}

function onShow(): void {
	emits('show')
}

function onUpdateSearch(search: string): void {
	emits('update:search', search)
}
</script>

<template>
	<AppSelectContainer
		v-slot="{ items: slotItems, isOpen }"
		v-model="model"
		:display-function="displayFunction"
		:is-disabled="isDisabled"
		:is-filterable="isFilterable"
		:is-invalid="isInvalid"
		:items="items"
		@hide="onHide"
		@show="onShow"
		@update:search="onUpdateSearch"
	>
		<AppSelectInput
			:is-open="isOpen"
			:placeholder="placeholder"
		/>
		<AppSelectOptions
			v-slot="{ item, active, disabled, selected }"
			:is-open="isOpen"
			:items="slotItems"
		>
			<slot>
				<AppSelectOption
					:is-active="active"
					:is-disabled="disabled"
					:is-selected="selected"
					:value="item"
				/>
			</slot>
		</AppSelectOptions>
	</AppSelectContainer>
</template>
