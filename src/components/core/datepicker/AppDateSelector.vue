<script setup lang="ts" generic="TRange extends boolean">
import '@vuepic/vue-datepicker/dist/main.css'

import VueDatePicker from '@vuepic/vue-datepicker'

import AppIcon from '@/components/core/icon/AppIcon.vue'
import type { DateSelectorProps, ModelDate } from '@/models/core/datePicker.model'

const {
	hasTimePicker = false,
	isMonthPicker = false,
	isRange = false,
	isTimePicker = false,
	isWeekPicker = false,
	isYearPicker = false,
	isInput = false,

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
} = defineProps<DateSelectorProps<TRange>>()

const emits = defineEmits<{
	close: []
}>()

const date = defineModel<ModelDate<TRange>>({
	default: null,
})

function handleClose(): void {
	emits('close')
}
</script>

<template>
	<!-- eslint-disable vue/valid-v-model -->
	<VueDatePicker
		v-model="date as any"
		:allowed-dates="allowedDates"
		auto-apply
		:auto-range="autoRange"
		:clearable="false"
		:disabled-dates="disabledDates"
		:disabled-week-days="disabledWeekDays"
		:enable-time-picker="hasTimePicker"
		:end-date="endDate"
		:filters="filters"
		:flow="flow"
		:hide-input-icon="true"
		:ignore-time-validation="!hasTimePicker"
		:inline="!isInput"
		is-24
		:max-date="maxDate"
		:max-range="maxRange"
		:min-date="minDate"
		:min-range="minRange"
		:month-picker="isMonthPicker"
		no-disabled-range
		:range="isRange"
		:start-date="startDate"
		teleport="body"
		:time-picker="isTimePicker"
		:transitions="{
			// @ts-expect-error - This works but the library typing is wrong
			menuAppearTop: 'popover',
			menuAppearBottom: 'popover',
		}"
		:week-picker="isWeekPicker"
		:year-picker="isYearPicker"
		:year-range="yearRange"
		@closed="handleClose"
	>
		<template #dp-input="{ value, onInput, onEnter, onTab, onBlur, onKeypress, onPaste, onClear, isMenuOpen }">
			<slot
				:is-menu-open="isMenuOpen"
				name="input"
				:on-blur="onBlur"
				:on-clear="onClear"
				:on-enter="onEnter"
				:on-input="onInput"
				:on-keypress="onKeypress"
				:on-paste="onPaste"
				:on-tab="onTab"
				:value="value"
			/>
		</template>
		<template #calendar-icon>
			<AppIcon icon="calendar" />
		</template>
		<template #input-icon>
			<AppIcon icon="calendar" />
		</template>
		<template #clear-icon>
			<AppIcon icon="close" />
		</template>
		<template #arrow-left>
			<AppIcon icon="chevronLeft" />
		</template>
		<template #arrow-right>
			<AppIcon icon="chevronRight" />
		</template>
		<template #arrow-up>
			<AppIcon icon="chevronUp" />
		</template>
		<template #arrow-down>
			<AppIcon icon="chevronDown" />
		</template>
		<template #clock-icon>
			<AppIcon icon="clock" />
		</template>
	</VueDatePicker>
</template>

<style lang="scss">
.dp__arrow_top {
	@apply hidden;
}

.dp__menu {
	@apply rounded-card border-border bg-popover text-popover-foreground;
}

.dp__calendar_item {
	@apply rounded-button;
}

.dp__cell_inner {
	@apply rounded-button hover:bg-neutral-100;
}

.dp__active_date,
.dp__overlay_cell_active,
.dp__range_start,
.dp__range_end {
	@apply bg-primary text-primary-foreground hover:bg-primary;
}

.dp__range_between {
	@apply rounded-button bg-primary/20 text-black;
}

.dp__today {
	@apply border-primary;
}

.dp__btn,
.dp__inner_nav {
	@apply rounded-button text-black hover:bg-neutral-100;
}

.dp__cell_offset {
	@apply text-neutral-300 hover:bg-neutral-100;
}

.dp__overlay {
	@apply rounded-card border-border bg-popover text-popover-foreground;
}
</style>
