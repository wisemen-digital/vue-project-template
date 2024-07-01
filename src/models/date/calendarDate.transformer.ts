import type { CalendarDate } from '@internationalized/date'
import { parseDate } from '@internationalized/date'

import type { CalendarDateDto } from '@/models/date/calendarDateDto.model.ts'

export class CalendarDateTransformer {
  static fromDto(date: CalendarDateDto): CalendarDate {
    return parseDate(date)
  }

  static fromNullableDto(date: CalendarDateDto | null): CalendarDate | null {
    return date === null ? null : this.fromDto(date)
  }

  static toDto(date: CalendarDate): CalendarDateDto {
    return date.toString() as CalendarDateDto
  }

  static toNullableDto(date: CalendarDate | null): CalendarDateDto | null {
    return date === null ? null : this.toDto(date)
  }
}
