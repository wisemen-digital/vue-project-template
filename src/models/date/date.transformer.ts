import { CalendarDate } from '@internationalized/date'

import type { DateDto } from '@/models/date/dateDto.model'

export class DateTransformer {
  static fromDto(date: DateDto): CalendarDate {
    const dateParts = date.split('-')

    return new CalendarDate(Number(dateParts[0]), Number(dateParts[1]), Number(dateParts[2]))
  }

  static fromNullableDto(date: DateDto | null): CalendarDate | null {
    if (date === null) {
      return null
    }

    return this.fromDto(date)
  }

  static toDto(date: CalendarDate): DateDto {
    return date.toString() as DateDto
  }

  static toNullableDto(date: CalendarDate | null): DateDto | null {
    if (date === null) {
      return null
    }

    return this.toDto(date)
  }
}
