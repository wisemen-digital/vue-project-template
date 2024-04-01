import type { DateDto } from '@/models/date/dateDto.model'

export class DateTransformer {
  static toDate(date: DateDto): Date {
    return new Date(date)
  }

  static toDto(date: Date): DateDto {
    return date.toISOString() as DateDto
  }

  static toNullableDate(date: DateDto | null): Date | null {
    if (date === null) {
      return null
    }

    return this.toDate(date)
  }

  static toNullableDto(date: Date | null): DateDto | null {
    if (date === null) {
      return null
    }

    return this.toDto(date)
  }
}
