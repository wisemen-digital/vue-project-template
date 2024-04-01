import type { DateTimeDto } from '@/models/date/dateTimeDto.model.ts'

export class DateTransformer {
  static fromDto(date: DateTimeDto): Date {
    return new Date(date)
  }

  static fromNullableDto(date: DateTimeDto | null): Date | null {
    if (date === null) {
      return null
    }

    return this.fromDto(date)
  }

  static toDto(date: Date): DateTimeDto {
    return date.toISOString() as DateTimeDto
  }

  static toNullableDto(date: Date | null): DateTimeDto | null {
    if (date === null) {
      return null
    }

    return this.toDto(date)
  }
}
