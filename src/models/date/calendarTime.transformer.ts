import dayjs from 'dayjs'

import type { CalendarTime } from '@/models/date/calendarTime.model.ts'
import type { CalendarTimeDto } from '@/models/date/calendarTimeDto.model.ts'

export class CalendarTimeTransformer {
  static fromDto(time: CalendarTimeDto): CalendarTime {
    return time.toString() as CalendarTime
  }

  static fromNullableDto(date: CalendarTimeDto | null): CalendarTime | null {
    return date === null ? null : this.fromDto(date)
  }

  static fromTime(time: string): CalendarTime {
    return time as CalendarTime
  }

  static toDto(date: CalendarTime): CalendarTimeDto {
    return dayjs(date).format('YYYY-MM-DD') as CalendarTimeDto
  }

  static toNullableDto(date: CalendarTime | null): CalendarTimeDto | null {
    return date === null ? null : this.toDto(date)
  }
}
