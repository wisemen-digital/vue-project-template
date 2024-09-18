import dayjs from 'dayjs'

import { LocaleUtil } from '@/utils/locale.util'

export class DateUtil {
  static getFirstDayOfMonth(date: Date): Date {
    return dayjs(date).startOf('month').toDate()
  }

  static getLastDayOfMonth(date: Date): Date {
    return dayjs(date).endOf('month').toDate()
  }

  static isAfter(date: Date, after: Date): boolean {
    return dayjs(date).isAfter(after)
  }

  static isBefore(date: Date, before: Date): boolean {
    return dayjs(date).isBefore(before)
  }

  static isBetween(date: Date, start: Date, end: Date): boolean {
    return dayjs(date).isBetween(start, end, 'date')
  }

  static isInFuture(date: Date): boolean {
    return dayjs(date).isAfter(new Date())
  }

  static isInPast(date: Date): boolean {
    return dayjs(date).isBefore(new Date())
  }

  static isSame(date: Date, other: Date): boolean {
    return dayjs(date).isSame(other, 'date')
  }

  // E.g. 2024/01/01
  static toDto(date: Date): string {
    return dayjs(date).format('YYYY-MM-DD')
  }

  // E.g. 01/01/2024
  static toLocaleDate(date: Date): string {
    const formatter = new Intl.DateTimeFormat(LocaleUtil.getLocale(), {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
    })

    return formatter.format(date)
  }

  // E.g. Monday, 01 January 2024
  static toLongLocaleDate(date: Date): string {
    const formatter = new Intl.DateTimeFormat(LocaleUtil.getLocale(), {
      day: '2-digit',
      month: 'long',
      weekday: 'long',
      year: 'numeric',
    })

    return formatter.format(date)
  }

  // E.g. 01/2024
  static toMonthAndYear(date: Date): string {
    return dayjs(date).format('MM/YYYY')
  }

  // E.g. 10:30
  static toTime(date: Date): string {
    return dayjs(date).format('HH:mm')
  }
}
