import type { DateDto } from '@/models/date/dateDto.model'

export class DateTransformer {
  static fromDto(date: DateDto): Date {
    return new Date(date)
  }

  static fromNullableDto(date: DateDto | null): Date | null {
    if (date === null) {
      return null
    }

    return this.fromDto(date)
  }

  static toDto(date: Date): DateDto {
    return date.toISOString() as DateDto
  }

  static toNullableDto(date: Date | null): DateDto | null {
    if (date === null) {
      return null
    }

    return this.toDto(date)
  }
}
