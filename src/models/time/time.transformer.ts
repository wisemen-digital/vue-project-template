import type { Time } from '@internationalized/date'
import { parseTime } from '@internationalized/date'

import type { TimeDto } from '@/models/time/timeDto.model.ts'

export class TimeTransformer {
  static fromDto(time: TimeDto): Time {
    return parseTime(time)
  }

  static fromNullableDto(time: TimeDto | null): Time | null {
    return time === null ? null : this.fromDto(time)
  }

  static toDto(time: Time): TimeDto {
    return time.toString() as TimeDto
  }

  static toNullableDto(time: Time | null): TimeDto | null {
    return time === null ? null : this.toDto(time)
  }
}
