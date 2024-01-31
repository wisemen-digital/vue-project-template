<script setup lang="ts" generic="TItem">
import AppFormLabel from '@/components/core/form-label/AppFormLabel.vue'
import AppRadioGroupContainer from '@/components/core/radio/AppRadioGroupContainer.vue'
import AppRadioGroupLabel from '@/components/core/radio/AppRadioGroupLabel.vue'
import AppRadioGroupOption from '@/components/core/radio/AppRadioGroupOption.vue'
import AppRadioGroupOptions from '@/components/core/radio/AppRadioGroupOptions.vue'
import { generateUuid } from '@/utils/core/uuid/generateUuid.util'

export interface AppRadioGroupProps<TItem> {
	/**
	 * The label of the input.
	 */
	label?: string

	/**
	 * Key of the value for comparing.
	 */
	by?: keyof NonNullable<TItem> | ((a: TItem, z: TItem) => boolean)

	/**
	 * List of possible items.
	 */
	items: NonNullable<TItem>[]

	/**
	 * Determines if the radio group is disabled.
	 */
	isDisabled?: boolean

	/**
	 * Determines if is invalid or valid.
	 */
	isInvalid?: boolean

	/**
	 * If the field is required.
	 */
	isRequired?: boolean

	/**
	 * Key of the label for displaying.
	 */
	labelKey?: keyof NonNullable<TItem>

	/**
	 * Key of the description for displaying.
	 */
	descriptionKey?: keyof NonNullable<TItem>

	/**
	 * Key of the disabled state.
	 */
	disabledKey?: keyof NonNullable<TItem>
}

defineProps<AppRadioGroupProps<TItem>>()
const emits = defineEmits<{
	blur: []
}>()
const model = defineModel<TItem>('modelValue', { required: true })
const uuid = `form-radio-group-${generateUuid()}`

function onBlur(): void {
	emits('blur')
}
</script>

<template>
	<AppRadioGroupContainer
		:id="uuid"
		v-slot="{ items: containerItems }"
		v-model="model"
		:is-disabled="isDisabled"
		:is-invalid="isInvalid"
		:items="items"
		@blur="onBlur"
	>
		<AppRadioGroupLabel v-if="label">
			<AppFormLabel
				:id="uuid"
				:is-disabled="isDisabled ?? false"
				:is-invalid="isInvalid ?? false"
				:is-required="isRequired ?? false"
				:label="label"
			/>
		</AppRadioGroupLabel>
		<AppRadioGroupOptions
			v-slot="{ isActive, isChecked, isDisabled: isItemDisabled, item }"
			class="flex flex-col gap-1"
			:disabled-key="disabledKey as any"
			:items="containerItems"
		>
			<AppRadioGroupOption
				:description-key="descriptionKey as any"
				:is-active="isActive"
				:is-checked="isChecked"
				:is-disabled="isItemDisabled"
				:is-invalid="isInvalid"
				:item="item"
				:label-key="labelKey as any"
			/>
		</AppRadioGroupOptions>
	</AppRadioGroupContainer>
</template>
