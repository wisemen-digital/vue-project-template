import dayjs from 'dayjs'

import type { CalendarDate } from '@/models/date/calendarDate.model.ts'
import type { CalendarDateDto } from '@/models/date/calendarDateDto.model.ts'

export class CalendarDateTransformer {
  static fromDate(date: Date): CalendarDate {
    return new Date(date) as CalendarDate
  }

  static fromDto(date: CalendarDateDto): CalendarDate {
    return new Date(date) as CalendarDate
  }

  static fromNullableDto(date: CalendarDateDto | null): CalendarDate | null {
    return date === null ? null : this.fromDto(date)
  }

  static toDto(date: CalendarDate): CalendarDateDto {
    return dayjs(date).format('YYYY-MM-DD') as CalendarDateDto
  }

  static toNullableDto(date: CalendarDate | null): CalendarDateDto | null {
    return date === null ? null : this.toDto(date)
  }
}
