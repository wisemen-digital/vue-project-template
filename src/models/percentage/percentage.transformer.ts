import type { Percentage } from '@/models/percentage/percentage.model'
import type { PercentageDto } from '@/models/percentage/percentageDto.model'

export class PercentageTransformer {
  static fromDto(percentageDto: PercentageDto): Percentage {
    return (percentageDto * 100) as Percentage
  }

  static fromNullableDto(percentageDto: PercentageDto | null): Percentage | null {
    if (percentageDto === null) {
      return null
    }

    return this.fromDto(percentageDto)
  }

  static toDto(percentage: Percentage): PercentageDto {
    return (percentage / 100) as PercentageDto
  }

  static toNullableDto(percentage: Percentage | null): PercentageDto | null {
    if (percentage === null) {
      return null
    }

    return this.toDto(percentage)
  }
}
