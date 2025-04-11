import { CalendarDateTimeTransformer } from '@/models/date/calendarDateTime.transformer.ts'
import type { SettingsJobIndexDto } from '@/modules/settings/models/jobs/settingsJobIndex.model.ts'
import type { SettingsJobIndex } from '@/modules/settings/models/jobs/settingsJobIndexDto.model.ts'
import type { SettingsJobIndexPagination } from '@/modules/settings/models/jobs/settingsJobIndexPagination.model.ts'
import type { SettingsJobIndexPaginationDto } from '@/modules/settings/models/jobs/settingsJobIndexPaginationDto.model.ts'

export class SettingsJobIndexTransformer {
  static fromDto(dto: SettingsJobIndexDto): SettingsJobIndex {
    return {
      id: dto.id,
      completedAt: CalendarDateTimeTransformer.fromNullableDto(dto.completedAt),
      createdAt: CalendarDateTimeTransformer.fromDto(dto.createdAt),
      name: dto.name,
      queueName: dto.queueName,
      status: dto.status,
    }
  }
}

export class SettingsJobIndexPaginationTransformer {
  static toDto(pagination: SettingsJobIndexPagination): SettingsJobIndexPaginationDto {
    return {
      filter: pagination.filter,
      sort: pagination.sort,
    }
  }
}
