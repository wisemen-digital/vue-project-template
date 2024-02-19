<script setup lang="ts">
import { ComboboxButton, ComboboxInput, ListboxButton } from '@headlessui/vue'
import { computed, ref } from 'vue'
import { useI18n } from 'vue-i18n'

import AppIcon from '@/components/core/icon/AppIcon.vue'
import { input, inputIcon, inputWrapper } from '@/components/core/input/appInput.style'
import { useAppSelectContext } from '@/composables/core/select/appSelectContext.composable'
import type { Icon } from '@/icons/icons'

interface Props {
	/**
	 * Placeholder text inside the select.
	 */
	placeholder?: string

	/**
	 * The icon to display on the left side of the input.
	 */
	iconLeft?: Icon

	/**
	 * Determines if the select is open.
	 */
	isOpen: boolean
}
const { isOpen } = defineProps<Props>()

const emits = defineEmits<{
	blur: []
}>()

const { t } = useI18n()

const { getDisplayValue, search, value, isFilterable, isDisabled, isInvalid } = useAppSelectContext()

const isFocused = ref<boolean>(false)
const hasValue = computed<boolean>(() => {
	if (Array.isArray(value.value)) {
		return value.value.length > 0
	} else {
		return value.value !== null && value.value !== undefined && value.value !== ''
	}
})

function handleSearchChange(event: Event): void {
	search.value = (event.target as HTMLInputElement).value
}

function onFocus(): void {
	isFocused.value = true
}

function onBlur(): void {
	isFocused.value = false

	if (!isOpen) {
		emits('blur')
	}
}
</script>

<template>
	<div v-if="isFilterable">
		<div
			:class="
				inputWrapper({
					isDisabled,
					isFocused: isFocused || isOpen,
					isInvalid,
				})
			"
		>
			<slot name="left">
				<AppIcon
					v-if="iconLeft != null"
					class="ml-3"
					:class="inputIcon()"
					:icon="iconLeft"
				/>
			</slot>
			<ComboboxInput
				:class="input({ isSelect: true })"
				:disabled="isDisabled"
				:display-value="hasValue && !isOpen ? (getDisplayValue as any) : () => undefined"
				:placeholder="hasValue ? getDisplayValue(value) : placeholder ?? t('label.select')"
				@blur="onBlur"
				@change="handleSearchChange"
				@focus="onFocus"
			/>
			<ComboboxButton
				v-slot="{ open }"
				class="inset-y-0 right-0 flex items-center pr-2"
			>
				<AppIcon
					aria-hidden="true"
					class="size-3 shrink-0 transition-transform duration-200"
					:class="[
						{
							'rotate-180': open,
						},
						inputIcon(),
					]"
					icon="chevronDown"
				/>
			</ComboboxButton>
		</div>
	</div>
	<div v-else>
		<ListboxButton
			:class="
				inputWrapper({
					isFocused: isFocused || isOpen,
					isDisabled,
					isInvalid,
				})
			"
			@blur="onBlur"
			@focus="onFocus"
		>
			<slot name="left">
				<AppIcon
					v-if="iconLeft != null"
					class="ml-3"
					:class="inputIcon()"
					:icon="iconLeft"
				/>
			</slot>

			<div
				class="flex w-full items-center justify-between"
				:class="input({ isSelect: true })"
			>
				<span class="truncate">
					<template v-if="hasValue">
						{{ getDisplayValue(value) }}
					</template>

					<span
						v-else-if="placeholder != null"
						class="text-input-foreground/50"
					>
						{{ placeholder }}
					</span>
				</span>
			</div>
			<div class="inset-y-0 right-0 flex items-center pr-2">
				<AppIcon
					aria-hidden="true"
					class="size-3 shrink-0 transition-transform duration-200"
					:class="[
						{
							'rotate-180': isOpen,
						},
						inputIcon(),
					]"
					icon="chevronDown"
				/>
			</div>
		</ListboxButton>
	</div>
</template>
