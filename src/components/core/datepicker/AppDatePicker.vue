<script setup lang="ts" generic="TRange extends boolean">
import AppDateSelector from '@/components/core/datepicker/AppDateSelector.vue'
import AppIcon from '@/components/core/icon/AppIcon.vue'
import AppInput from '@/components/core/input/AppInput.vue'
import type { DateSelectorProps, ModelDate } from '@/models/core/datePicker.model'
import { fadeTransition } from '@/transitions'

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
} = defineProps<Omit<DateSelectorProps<TRange>, 'isInput'>>()

const date = defineModel<ModelDate<TRange>>({
	default: null,
})
</script>

<template>
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
	>
		<template #input="{ value, onInput, onEnter, onTab, onBlur, onKeypress, onPaste, onClear, isMenuOpen }">
			<AppInput
				icon-left="calendar"
				:is-outside-focused="isMenuOpen"
				is-readonly
				:model-value="value"
				@blur="onBlur"
				@input="onInput"
				@keydown.enter="onEnter"
				@keydown.tab="onTab"
				@keypress="onKeypress"
				@paste="onPaste"
			>
				<template #right>
					<Transition v-bind="fadeTransition">
						<button v-if="value">
							<AppIcon
								class="h-4 px-2"
								icon="close"
								@click.stop="onClear"
							/>
						</button>
					</Transition>
				</template>
			</AppInput>
		</template>
	</AppDateSelector>
</template>
@/models/core/datePicker.type
