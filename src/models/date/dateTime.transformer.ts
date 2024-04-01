import type { DateTimeDto } from '@/models/date/dateTimeDto.model.ts'

export class DateTransformer {
  static toDate(date: DateTimeDto): Date {
    return new Date(date)
  }

  static toDto(date: Date): DateTimeDto {
    return date.toISOString() as DateTimeDto
  }

  static toNullableDate(date: DateTimeDto | null): Date | null {
    if (date === null) {
      return null
    }

    return this.toDate(date)
  }

  static toNullableDto(date: Date | null): DateTimeDto | null {
    if (date === null) {
      return null
    }

    return this.toDto(date)
  }
}
