import type { CalendarDateTime } from '@/models/date/calendarDateTime.model.ts'
import type { CalendarDateTimeDto } from '@/models/date/calendarDateTimeDto.model.ts'

export class CalendarDateTimeTransformer {
  static fromDto(date: CalendarDateTimeDto): CalendarDateTime {
    return new Date(date) as CalendarDateTime
  }

  static fromNullableDto(date: CalendarDateTimeDto | null): CalendarDateTime | null {
    if (date === null) {
      return null
    }

    return this.fromDto(date)
  }

  static toDto(date: CalendarDateTime): CalendarDateTimeDto {
    return date.toISOString() as CalendarDateTimeDto
  }

  static toNullableDto(date: CalendarDateTime | null): CalendarDateTimeDto | null {
    return date === null ? null : this.toDto(date)
  }
}
