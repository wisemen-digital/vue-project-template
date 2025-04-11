import { CalendarDateTimeTransformer } from '@/models/date/calendarDateTime.transformer.ts'
import type { SettingsJobsIndexDto } from '@/modules/settings/models/jobs/settingsJobsIndex.model.ts'
import type { SettingsJobsIndex } from '@/modules/settings/models/jobs/settingsJobsIndexDto.model.ts'
import type { SettingsJobsIndexPagination } from '@/modules/settings/models/jobs/settingsJobsIndexPagination.model.ts'
import type { SettingsJobsIndexPaginationDto } from '@/modules/settings/models/jobs/settingsJobsIndexPaginationDto.model.ts'

export class SettingsJobsIndexTransformer {
  static fromDto(dto: SettingsJobsIndexDto): SettingsJobsIndex {
    return {
      id: dto.id,
      completedAt: CalendarDateTimeTransformer.fromNullableDto(dto.completedAt),
      createdAt: CalendarDateTimeTransformer.fromDto(dto.createdAt),
      jobName: dto.jobName,
      queueName: dto.queueName,
      status: dto.status,
    }
  }
}

export class SettingsJobsIndexPaginationTransformer {
  static toDto(pagination: SettingsJobsIndexPagination): SettingsJobsIndexPaginationDto {
    return {
      filter: pagination.filter,
      sort: pagination.sort,
    }
  }
}
