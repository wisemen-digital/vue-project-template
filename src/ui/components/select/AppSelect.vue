<script setup lang="ts" generic="T extends SelectValue | SelectValue[]">
import {
	Combobox,
	ComboboxButton,
	ComboboxInput,
	ComboboxOptions,
	Listbox,
	ListboxButton,
	ListboxOptions,
} from '@headlessui/vue'
import { Float } from '@headlessui-float/vue'
import { computed, provide, ref, useSlots } from 'vue'

import { Icon } from '@/icons/icon.type.ts'
import AppIcon from '@/ui/components/icon/AppIcon.vue'
import type { SelectValue } from '@/ui/types/select.type.ts'

import { input, inputIcon, inputWrapper } from '../input/appInput.style'
import { selectDropdown } from './appSelect.style'

export interface Props<T> {
	/**
	 * A function that converts the input value to a string for display.
	 * @param value The value of the input.
	 * @returns A string representation of the value.
	 */
	displayValue: (value: NonNullable<T>) => string

	/**
	 * Whether the input should be filterable / searchable.
	 */
	isFilterable?: boolean

	/**
	 *
	 */
	isDisabled?: boolean

	/**
	 *
	 */
	isInvalid?: boolean

	/**
	 *
	 */
	by?: string | null

	/**
	 *
	 */
	id?: string | null

	/**
	 *
	 */
	iconLeft?: Icon | null

	/**
	 *
	 */
	placeholder?: string | null

	/**
	 *
	 */
	isCompact?: boolean
}

const {
	displayValue,
	isDisabled = false,
	isInvalid = false,
	isFilterable = false,
	isCompact = false,
	by = null,
	id = null,
	iconLeft = null,
	placeholder = null,
} = defineProps<Props<T>>()

const emit = defineEmits<{
	(event: 'focus'): void
	(event: 'blur'): void
	(event: 'scroll:bottom'): void
	(event: 'update:filter', value: string): void
}>()

const value = defineModel<T>({
	required: true,
})

const floatProps = {
	'flip': true,
	'adaptive-width': true,
	'auto-update': {
		animationFrame: false,
	},
	'enter': 'transition duration-150',
	'enter-from': 'scale-y-[0.85] opacity-0',
	'enter-to': 'scale-100 opacity-100',
	'leave': 'transition duration-150',
	'leave-from': 'scale-100 opacity-100',
	'leave-to': 'scale-y-[0.95] opacity-0',
	'tailwindcss-origin-class': true,
	'portal': true,
}

const isFocused = ref<boolean>(false)

const slots = useSlots()

const selectClasses = computed<string>(() => input())
const selectDropdownClasses = computed<string>(() => selectDropdown())

const inputIconClasses = computed<string>(() =>
	inputIcon({
		isInvalid,
	})
)

const hasDefaultSlotContent = computed<boolean>(() => {
	const defaultSlot = slots.default?.()

	return Boolean(defaultSlot && defaultSlot[0].children !== null && (defaultSlot[0].children.length as number) > 0)
})

const isMultiple = computed<boolean>(() => Array.isArray(value.value))

const hasValue = computed<boolean>(() => {
	return isMultiple.value ? (value.value as unknown[]).length > 0 : value.value != null
})

function onFocus(): void {
	isFocused.value = true
}

function onShow(): void {
	emit('update:filter', '')
}

function onBlur(isOpen: boolean): void {
	isFocused.value = false

	if (!isOpen) {
		emit('update:filter', '')
		emit('blur')
	}
}

function onScroll(e: Event): void {
	const target = e.target as HTMLElement

	const isScrolledToBottom = target.scrollHeight - target.scrollTop === target.clientHeight

	if (isScrolledToBottom) {
		emit('scroll:bottom')
	}
}

provide('isFilterable', isFilterable)
</script>

<template>
	<Combobox
		v-if="isFilterable"
		v-slot="{ open }"
		v-model="value"
		as="div"
		:by="by ?? undefined"
		:disabled="isDisabled"
		:immediate="true"
		:multiple="isMultiple"
	>
		<div
			class="pr-8"
			:class="
				inputWrapper({
					isDisabled,
					isInvalid,
					isCompact,
					isFocused: isFocused || open,
				})
			"
		>
			<slot name="left">
				<AppIcon
					v-if="iconLeft !== null"
					class="ml-3"
					:class="inputIconClasses"
					:icon="iconLeft"
				/>
			</slot>

			<ComboboxInput
				:id="id ?? undefined"
				:class="selectClasses"
				:display-value="hasValue && !open ? (displayValue as any) : undefined"
				:placeholder="hasValue && open ? displayValue(value!) : placeholder"
				@blur="onBlur(open)"
				@change="emit('update:filter', $event.target.value)"
				@focus="onFocus"
			/>

			<Float
				v-if="hasDefaultSlotContent"
				v-bind="floatProps"
				:offset="{
					mainAxis: 1,
				}"
				@close="emit('blur')"
				@show="onShow"
			>
				<ComboboxButton class="absolute left-0 top-0 flex size-full items-center justify-end bg-transparent p-3">
					<AppIcon
						class="size-3"
						:icon="Icon.CHEVRON_DOWN"
					/>
				</ComboboxButton>

				<ComboboxOptions
					:class="selectDropdownClasses"
					@scroll="onScroll"
				>
					<slot />
				</ComboboxOptions>
			</Float>
		</div>
	</Combobox>

	<Listbox
		v-else
		v-slot="{ open }"
		v-model="value"
		as="div"
		:by="by ?? undefined"
		:disabled="isDisabled"
		:multiple="isMultiple"
	>
		<Float
			v-bind="floatProps"
			@close="emit('blur')"
			@show="onShow"
		>
			<ListboxButton
				:id="id ?? undefined"
				class="text-left outline-none"
				:class="
					inputWrapper({
						isCompact,
						isFocused: isFocused || open,
						isDisabled,
						isInvalid,
					})
				"
				@blur="onBlur(open)"
				@focus="onFocus"
			>
				<slot name="left">
					<AppIcon
						v-if="iconLeft !== null"
						class="ml-3"
						:class="inputIconClasses"
						:icon="iconLeft"
					/>
				</slot>

				<div class="flex w-full items-center justify-between overflow-hidden p-3">
					<span class="truncate text-sm text-inherit">
						<template v-if="value != null">
							{{ displayValue(value) }}
						</template>

						<span
							v-else-if="placeholder !== null"
							class="text-muted-foreground/50"
						>
							{{ placeholder }}
						</span>
					</span>

					<AppIcon
						class="size-3 shrink-0"
						:icon="Icon.CHEVRON_DOWN"
					/>
				</div>
			</ListboxButton>

			<ListboxOptions
				:class="selectDropdownClasses"
				@scroll="onScroll"
			>
				<slot />
			</ListboxOptions>
		</Float>
	</Listbox>
</template>
