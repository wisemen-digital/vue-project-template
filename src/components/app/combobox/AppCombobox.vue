<script setup lang="ts" generic="T extends string">
import {
	ComboboxAnchor,
	ComboboxArrow,
	ComboboxContent,
	ComboboxEmpty,
	ComboboxInput,
	ComboboxPortal,
	ComboboxRoot,
	ComboboxTrigger,
	ComboboxViewport,
} from 'radix-vue'
import { computed, ref } from 'vue'
import { useI18n } from 'vue-i18n'

import AppIcon from '@/components/app/icon/AppIcon.vue'
import type { DataItem } from '@/types/dataItem.type'

import AppComboboxItem from './AppComboboxItem.vue'

const props = withDefaults(
	defineProps<{
		modelValue: T | T[] | null
		options: DataItem<T>[]
		isInvalid?: boolean
		placeholder?: string | null
		emptyText?: string | null
	}>(),
	{
		isInvalid: false,
		placeholder: null,
		emptyText: null,
	}
)

const emit = defineEmits<{
	'update:modelValue': [value: T | T[] | null]
}>()

const model = computed<T | T[] | undefined>({
	get: () => props.modelValue ?? undefined,
	set: (value) => {
		emit('update:modelValue', value ?? null)
	},
})

const { t } = useI18n()

const isOpen = ref<boolean>(false)

const isMultiple = computed<boolean>(() => Array.isArray(model.value))

const placeholderValue = computed<string | undefined>(() => {
	if (!isMultiple.value) {
		return props.placeholder ?? undefined
	}

	return (model.value as T[]).map(displayFn).join(', ')
})

const isEmpty = computed<boolean>(() => {
	if (isMultiple.value) {
		return (model.value as T[]).length === 0
	}

	return model.value === undefined
})

// eslint-disable-next-line @typescript-eslint/no-explicit-any
function filterFn(options: T[], query: string): any {
	return options.filter((optionValue) => {
		const option = props.options.find((o) => o.value === optionValue) ?? null

		if (option === null) {
			return false
		}

		return option.label.toLowerCase().includes(query.toLowerCase())
	})
}

function displayFn(value: T): string {
	const option = props.options.find((o) => o.value === value) ?? null

	if (option === null) {
		return ''
	}

	return option.label
}
</script>

<template>
	<div>
		<ComboboxRoot
			v-model="model"
			v-model:open="isOpen"
			:display-value="displayFn"
			:filter-function="filterFn"
			:multiple="isMultiple"
		>
			<ComboboxAnchor>
				<div class="relative">
					<ComboboxInput
						class="h-10 w-full truncate rounded-input border bg-input pl-3 pr-9 text-sm outline-none ring-offset-background duration-200 focus-visible:ring-2 focus-visible:ring-offset-2"
						:class="{
							'border-input-border focus-within:ring-ring': !props.isInvalid,
							'border-destructive focus-within:ring-destructive': props.isInvalid,
							'placeholder:text-input-placeholder': isEmpty && !isMultiple,
							'placeholder:text-input-foreground': !isEmpty && isMultiple,
							'focus:placeholder:text-input-placeholder': isMultiple && !isEmpty,
						}"
						:placeholder="placeholderValue"
						tabindex="0"
					/>

					<ComboboxTrigger
						:as-child="true"
						class="absolute right-1 top-1/2 box-content -translate-y-1/2 p-2 outline-none"
					>
						<AppIcon
							class="text-muted-foreground"
							icon="chevronDown"
							size="default"
						/>
					</ComboboxTrigger>
				</div>
			</ComboboxAnchor>

			<ComboboxPortal>
				<Transition
					enter-active-class="duration-150"
					enter-from-class="opacity-0"
					enter-to-class="opacity-100"
					leave-active-class="duration-150"
					leave-from-class="opacity-100"
					leave-to-class="opacity-0"
				>
					<div v-if="isOpen">
						<ComboboxContent
							class="combobox-content relative overflow-hidden rounded-popover border border-solid border-border bg-background shadow-popover-shadow"
							:force-mount="true"
							position="popper"
						>
							<ComboboxViewport class="max-h-[25rem] p-1.5">
								<ComboboxEmpty>
									{{ props.emptyText ?? t('components.combobox.empty') }}
								</ComboboxEmpty>

								<AppComboboxItem
									v-for="option of props.options"
									:key="option.label"
									:value="option.value"
								>
									{{ option.label }}
								</AppComboboxItem>
							</ComboboxViewport>

							<ComboboxArrow />
						</ComboboxContent>
					</div>
				</Transition>
			</ComboboxPortal>
		</ComboboxRoot>
	</div>
</template>

<style>
.combobox-content {
	width: var(--radix-combobox-trigger-width);
	max-height: var(--radix-combobox-content-available-height);
}
</style>
