import { CalendarDateTimeTransformer } from '@/models/date/calendarDateTime.transformer.ts'
import type { SettingsEventLogIndex } from '@/modules/settings/models/event-log/settingsEventLogIndex.model.ts'
import type { SettingsEventLogIndexDto } from '@/modules/settings/models/event-log/settingsEventLogIndexDto.model.ts'
import type { SettingsEventLogIndexPagination } from '@/modules/settings/models/event-log/settingsEventLogIndexPagination.model.ts'
import type { SettingsEventLogIndexPaginationDto } from '@/modules/settings/models/event-log/settingsEventLogIndexPaginationDto.model.ts'

export class SettingsEventLogIndexTransformer {
  static fromDto(dto: SettingsEventLogIndexDto): SettingsEventLogIndex {
    return {
      uuid: dto.uuid,
      createdAt: CalendarDateTimeTransformer.fromDto(dto.createdAt),
      content: dto.content,
      message: '',
      topic: dto.topic,
      type: dto.type,
    }
  }
}

export class SettingsEventLogIndexPaginationTransformer {
  static toDto(pagination: SettingsEventLogIndexPagination): SettingsEventLogIndexPaginationDto {
    return {
      filter: pagination.filter,
      sort: pagination.sort,
    }
  }
}
