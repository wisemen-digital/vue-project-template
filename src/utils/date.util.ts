import dayjs from 'dayjs'
import type { Locale } from 'vue-i18n'

// format: DD/MM/YYYY
export function formatDate(date: Date | null | string): string {
  if (date === null) {
    return '-'
  }

  return dayjs(date).format('DD/MM/YYYY')
}

// format: DD/MM
export function formatShortDate(date: Date | null | string): string {
  if (date === null) {
    return '-'
  }

  return dayjs(date).format('DD/MM')
}

// format: DDD DD/MM
export function formatShortDateWithDay(date: Date | null | string): null | string {
  if (date === null) {
    return null
  }

  return dayjs(date).format('ddd DD/MM')
}

// format: YYYY-MM-DD
export function formatDateToDto(date: Date | string): string {
  return dayjs(date).format('YYYY-MM-DD')
}

export function formatDateDtoToDate(date: string): Date {
  return dayjs(date, 'YYYY-MM-DD').toDate()
}

export function formatDateToNullableDto(date: Date | null | string | undefined): null | string {
  if (date === null || date === undefined) {
    return null
  }

  return formatDateToDto(date)
}

// format: YYYY-MM
export function formatMonthToDto(date: Date | null | string): null | string {
  if (date === null) {
    return null
  }

  return dayjs(date).format('YYYY-MM')
}

export function formatMonthToNullableDto(date: Date | null | string | undefined): null | string {
  if (date === null || date === undefined) {
    return null
  }

  return formatMonthToDto(date)
}

export function formatStartEndDate(startDate: Date | string, endDate: Date | null | string): string {
  if (endDate === null) {
    return formatDate(startDate)
  }

  return `${formatDate(startDate)} - ${formatDate(endDate)}`
}

export function getFirstDayOfMonth(date: Date | string): Date {
  return dayjs(date).startOf('month').toDate()
}

export function getLastDayOfMonth(date: Date | string): Date {
  return dayjs(date).endOf('month').toDate()
}

export function getNextWeekPlusOneDay(): Date {
  return dayjs().add(1, 'week').add(1, 'day').toDate()
}

export function getTomorrow(): Date {
  return dayjs().add(1, 'day').toDate()
}

export function getToday(): Date {
  return new Date()
}

// format: HH:mm
export function formatTime(date: Date | null | string): string {
  if (date === null) {
    return '-'
  }

  return dayjs(date).format('HH:mm')
}

// format: DD/MM/YYYY HH:mm
export function formatDateTime(date: Date | null | string): null | string {
  if (date === null) {
    return null
  }

  return dayjs(date).format('DD/MM/YYYY HH:mm')
}

export function formatDateTimeToDto(date: Date | string): string {
  if (date === null) {
    return '-'
  }

  const formattedDate = dayjs(date).format()
  const formattedTime = dayjs.utc(date).format()

  return `${formattedDate.toString().substr(0, 11)}${formattedTime.toString().substr(11, 5)}`
}

// format: dddd DD MMMM YYYY
export function formatDateToFullDisplayString(date: Date | null | string): string {
  if (date === null) {
    return '-'
  }

  return dayjs(date).format('dddd DD MMMM YYYY')
}

// format: DD MMMM YYYY - HH:mm
export function formatDateTimeToFullDisplayString(date: Date | null | string): string {
  if (date === null) {
    return '-'
  }

  return dayjs(date).format('DD MMMM YYYY - HH:mm')
}

// format: HH:MM / DD MMM
export function formatTimeOrDateShort(date: Date | null): string {
  if (date === null) {
    return '-'
  }

  if (isDateEqualTo(date, new Date())) {
    return formatTime(date)
  }

  return dayjs(date).format('DD MMM')
}

export function calculateDurationInMinutes(startDate: Date | null, endDate: Date | null): number {
  if (startDate === null || endDate === null) {
    return 0
  }

  return dayjs(endDate).diff(dayjs(startDate), 'minute')
}

// format: MMMM YYYY example: 2021-01-01 -> january 2021
export function formatDateToMonthAndYear(date: Date | null): string {
  if (date === null) {
    return '-'
  }

  return dayjs(date).format('MMMM YYYY')
}

// format: MM/YYYY
export function formatDateMonthYear(date: Date | null | string): string {
  if (date === null) {
    return '-'
  }

  return dayjs(date).format('MM/YY')
}

// parse: DD/MM/YYYY hh:mm
export function parseFullDateTime(dateString: string): Date {
  return dayjs(dateString, 'DD/MM/YYYY hh:mm').toDate()
}

export function isDateTimeEqualTo(date: Date | null, dateToCompare: Date | null): boolean {
  if (date === null || dateToCompare === null) {
    return false
  }

  return formatDateTime(date) === formatDateTime(dateToCompare)
}

export function isDateEqualTo(date: Date | null, dateToCompare: Date | null): boolean {
  if (date === null || dateToCompare === null) {
    return false
  }

  return formatDate(date) === formatDate(dateToCompare)
}

export function isDateBefore(date: Date | string, dateToCompare: Date): boolean {
  return dayjs(date).isBefore(dayjs(dateToCompare))
}

export function isDateOnOrBefore(date: Date, dateToCompare: Date): boolean {
  return dayjs(date).isSameOrBefore(dayjs(dateToCompare))
}

export function isDateAfter(date: Date, dateToCompare: Date): boolean {
  return dayjs(date).isAfter(dayjs(dateToCompare))
}

export function isDateOnOrAfter(date: Date, dateToCompare: Date): boolean {
  return dayjs(date).isSameOrAfter(dayjs(dateToCompare))
}

export function isDateBetween(date: Date, startDate: Date, endDate: Date): boolean {
  const adjustedDate = dayjs(date).set('milliseconds', 0)
  const adjustedStartDate = dayjs(startDate).set('millisecond', 0)
  const adjustedEndDate = dayjs(endDate).set('millisecond', 0)

  return dayjs(adjustedDate).isBetween(adjustedStartDate, adjustedEndDate)
}

export function isDateBetweenOrEqual(date: Date, startDate: Date, endDate: Date): boolean {
  return isDateOnOrAfter(date, startDate) && isDateOnOrBefore(date, endDate)
}

export function isDateInPast(date: Date): boolean {
  const today = new Date()
  return new Date(date) < today
}

export function isDateInFuture(date: Date): boolean {
  const today = new Date()
  return new Date(date) > today
}

export function isDateInFutureOrToday(date: Date | null): boolean {
  if (date === null) {
    return false
  }

  return dayjs(date).isSameOrAfter(dayjs(), 'day')
}

export function getWeekNumber(date: Date): number {
  return dayjs(date).week()
}

export function sortArrayByDate<T extends object>(object: T[], key: keyof T, order: 'asc' | 'desc' = 'asc'): T[] {
  return object.sort((a: T, b: T) => {
    const dateA = new Date(a[key] as Date | number | string)
    const dateB = new Date(b[key] as Date | number | string)

    if (order === 'asc') {
      return dateA.getTime() - dateB.getTime()
    }

    return dateB.getTime() - dateA.getTime()
  })
}

export function getLocaleDayName(date: Date, locale: Locale): string {
  return date.toLocaleDateString(locale, { weekday: 'long' })
}

export function getLocaleMonthName(date: Date, locale: Locale): string {
  return date.toLocaleDateString(locale, { month: 'long' })
}
