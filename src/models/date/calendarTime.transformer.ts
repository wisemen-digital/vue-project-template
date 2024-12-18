import type { CalendarTime } from '@/models/date/calendarTime.model.ts'
import type { CalendarTimeDto } from '@/models/date/calendarTimeDto.model.ts'

export class CalendarTimeTransformer {
  static fromDto(time: CalendarTimeDto): CalendarTime {
    return time as string as CalendarTime
  }

  static toDto(time: CalendarTime): CalendarTimeDto {
    return time as string as CalendarTimeDto
  }
}
