<script setup lang="ts" generic="TInputType extends InputType, TRange extends boolean = false">
import { useAttrs } from 'vue'

import AppDateSelector from '@/components/core/datepicker/AppDateSelector.vue'
import AppFormError from '@/components/core/form-error/AppFormError.vue'
import AppFormLabel from '@/components/core/form-label/AppFormLabel.vue'
import AppIcon from '@/components/core/icon/AppIcon.vue'
import AppInput from '@/components/core/input/AppInput.vue'
import AppTextFormDescription from '@/components/core/text/AppTextFormDescription.vue'
import { useFormInput } from '@/composables/core/form/formInput.composable'
import type { DateSelectorProps, ModelDate } from '@/models/core/datePicker.model'
import type { InputFormProps, InputType } from '@/models/core/input.model'
import { fadeTransition } from '@/transitions'

export type DateProps<TRange extends boolean> = Omit<DateSelectorProps<TRange>, 'isInput'>
// eslint-disable-next-line vue/prop-name-casing
type Props = DateProps<TRange> & Omit<InputFormProps<TInputType>, 'onBlur'>
const {
	hasTimePicker = false,
	isMonthPicker = false,
	isRange = false,
	isTimePicker = false,
	isWeekPicker = false,
	isYearPicker = false,

	allowedDates,
	autoRange,
	disabledDates,
	disabledWeekDays,
	endDate,
	filters,
	flow,
	maxDate,
	maxRange,
	minDate,
	minRange,
	startDate,
	yearRange,

	errors = null,
	label = null,
	description = null,
	isRequired = false,
	isTouched,
	type,
} = defineProps<Props>()

const emits = defineEmits<{
	blur: []
}>()
const attrs = useAttrs()

const date = defineModel<ModelDate<TRange>>({
	default: null,
})

const { id, isInvalid } = useFormInput({
	isTouched: () => isTouched,
	errors: () => errors,
	type: type ?? 'text',
	value: date,
})

function handleBlur(isOpen: boolean): void {
	if (!isOpen) {
		emits('blur')
	}
}

function handleClose(): void {
	emits('blur')
}
</script>

<template>
	<div
		class="w-full"
		:class="attrs.class"
	>
		<AppFormLabel
			v-if="label !== null"
			:id="id"
			:is-disabled="isDisabled ?? false"
			:is-invalid="isInvalid"
			:is-required="isRequired"
			:label="label"
		/>
		<!-- eslint-disable vue/valid-v-model -->
		<AppDateSelector
			v-model="date as any"
			:allowed-dates="allowedDates"
			:auto-range="autoRange"
			:disabled-dates="disabledDates"
			:disabled-week-days="disabledWeekDays"
			:end-date="endDate"
			:filters="filters"
			:flow="flow"
			:has-time-picker="hasTimePicker"
			is-input
			:is-month-picker="isMonthPicker"
			:is-range="isRange"
			:is-time-picker="isTimePicker"
			:is-week-picker="isWeekPicker"
			:is-year-picker="isYearPicker"
			:max-date="maxDate"
			:max-range="maxRange"
			:min-date="minDate"
			:min-range="minRange"
			:start-date="startDate"
			:year-range="yearRange"
			@close="handleClose"
		>
			<template #input="inputSlotProps">
				<AppInput
					v-bind="{
						...attrs,
						onBlur: undefined,
					}"
					icon-left="calendar"
					:is-invalid="isInvalid"
					:is-outside-focused="inputSlotProps.isMenuOpen"
					is-readonly
					:model-value="value"
					type="text"
					@blur="handleBlur(inputSlotProps.isMenuOpen)"
					@input="onInput"
					@keydown.enter="inputSlotProps.onEnter"
					@keydown.tab="inputSlotProps.onTab"
					@keypress="onKeypress"
					@paste="onPaste"
				>
					<template #right>
						<Transition v-bind="fadeTransition">
							<button v-if="value">
								<AppIcon
									class="h-4 px-2"
									icon="close"
									@click.stop="inputSlotProps.onClear"
								/>
							</button>
						</Transition>
					</template>
				</AppInput>
			</template>
		</AppDateSelector>
		<AppTextFormDescription
			v-if="description !== null"
			class="mt-1"
		>
			{{ description }}
		</AppTextFormDescription>

		<AppFormError
			:errors="errors"
			:is-touched="isTouched"
		/>
	</div>
</template>
@/models/core/datePicker.type@/models/core/input.type
