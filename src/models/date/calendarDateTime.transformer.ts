import type { CalendarDateTime } from '@internationalized/date'
import {
  parseAbsoluteToLocal,
  toCalendarDateTime,
} from '@internationalized/date'

import type { CalendarDateTimeDto } from '@/models/date/calendarDateTimeDto.model.ts'

export class CalendarDateTimeTransformer {
  static fromDto(date: CalendarDateTimeDto): CalendarDateTime {
    return toCalendarDateTime(parseAbsoluteToLocal(date))
  }

  static fromNullableDto(date: CalendarDateTimeDto | null): CalendarDateTime | null {
    return date === null ? null : this.fromDto(date)
  }

  static toDto(date: CalendarDateTime): CalendarDateTimeDto {
    return date.toString() as CalendarDateTimeDto
  }

  static toNullableDto(date: CalendarDateTime | null): CalendarDateTimeDto | null {
    return date === null ? null : this.toDto(date)
  }
}
