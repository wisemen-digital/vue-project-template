import type { VueDatePickerProps } from '@vuepic/vue-datepicker'

export interface DateSelectorProps<TRange extends boolean> {
	/**
	 * If the date picker is a range.
	 */
	isRange?: TRange
	/**
	 * If the date picker is a time picker.
	 */
	isTimePicker?: boolean
	/**
	 * If the date picker is a month picker.
	 */
	isMonthPicker?: boolean
	/**
	 * If the date picker is a year picker.
	 */
	isYearPicker?: boolean
	/**
	 * If the date picker is a week picker.
	 */
	isWeekPicker?: boolean
	/**
	 * If the date picker has a timepicker.
	 */
	hasTimePicker?: boolean
	/**
	 * If the date picker is an input.
	 */
	isInput?: boolean

	/**
	 * The minimum range of the date picker.
	 */
	minRange?: number
	/**
	 * The maximum range of the date picker.
	 */
	maxRange?: number
	/**
	 * The minimum date of the date picker.
	 */
	autoRange?: number
	/**
	 * The maximum date of the date picker.
	 */
	minDate?: Date
	/**
	 * The maximum date of the date picker.
	 */
	maxDate?: Date
	/**
	 * The flow of the date picker, it will ask information in order.
	 */
	flow?: ('calendar' | 'hours' | 'minutes' | 'month' | 'seconds' | 'time' | 'year')[]
	/**
	 * The start date of the date picker.
	 */
	startDate?: Date
	/**
	 * The end date of the date picker.
	 */
	endDate?: Date
	/**
	 * The filters of the date picker.
	 */
	filters?: VueDatePickerProps['filters']
	/**
	 * The year range of the date picker.
	 */
	yearRange?: [number, number]
	/**
	 * The allowed dates of the date picker.
	 */
	allowedDates?: Date[]
	/**
	 * The disabled dates of the date picker.
	 */
	disabledDates?: Date[]
	/**
	 * The disabled week days of the date picker.
	 */
	disabledWeekDays?: number[]
}

/**
 * The type of the date picker, [Date, Date] if range, Date if not.
 */
export type ModelDate<TRange> = TRange extends true ? [Date | null, Date | null] : Date | null
