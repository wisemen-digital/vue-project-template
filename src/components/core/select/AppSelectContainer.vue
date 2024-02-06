<script setup lang="ts" generic="T, TModel extends T[] | T | undefined">
import { Combobox, Listbox } from '@headlessui/vue'
import { Float } from '@headlessui-float/vue'
import { computed, ref, watch } from 'vue'

import { useProvideAppSelectContext } from '@/composables/core/select/appSelectContext.composable'
import { popoverTransition } from '@/transitions'

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
	isDisabled = false,
	isFilterable = false,
	isInvalid = false,
} = defineProps<AppSelectProps<T>>()

const emits = defineEmits<{
	'hide': []
	'show': []
	'update:search': [string]
}>()

const model = defineModel<TModel>('modelValue', { required: true })
const isMultiple = computed<boolean>(() => Array.isArray(model.value))
const search = ref<string>('')

function getDisplayValue(value: T | T[] | undefined): string {
	if (value == null) {
		return ''
	} else if (Array.isArray(value)) {
		return value.map((value) => displayFunction(value)).join(', ')
	} else {
		return displayFunction(value)
	}
}

const filteredItems = computed<T[]>(() => {
	if (!isFilterable) {
		return items
	}

	return items.filter((item) => {
		return getDisplayValue(item)?.toLowerCase().includes(search.value.toLowerCase())
	})
})

useProvideAppSelectContext({
	value: model,
	search,
	getDisplayValue,
	isFilterable: computed<boolean>(() => isFilterable),
	isInvalid: computed<boolean>(() => isInvalid),
	isDisabled: computed<boolean>(() => isDisabled),
})

watch(search, () => {
	onSearchChange(search.value)
})

function onSearchChange(search: string): void {
	emits('update:search', search)
}

function onHide(): void {
	emits('hide')
}

function onShow(): void {
	emits('show')
}
</script>

<template>
	<!-- eslint-disable vue/valid-v-model -->
	<div class="text-left">
		<Combobox
			v-if="isFilterable"
			v-slot="{ open }"
			v-model="model as any"
			:disabled="isDisabled"
			immediate
			:multiple="isMultiple"
		>
			<Float
				adaptive-width
				flip
				:offset="4"
				placement="bottom-start"
				v-bind="popoverTransition"
				@hide="onHide"
				@show="onShow"
			>
				<slot
					:is-open="open"
					:items="filteredItems"
				/>
			</Float>
		</Combobox>
		<Listbox
			v-else
			v-slot="{ open }"
			v-model="model as any"
			:disabled="isDisabled"
			immediate
			:multiple="isMultiple"
		>
			<Float
				adaptive-width
				flip
				:offset="4"
				placement="bottom-start"
				v-bind="popoverTransition"
				@hide="onHide"
				@show="onShow"
			>
				<slot
					:is-open="open"
					:items="filteredItems"
				/>
			</Float>
		</Listbox>
	</div>
</template>
