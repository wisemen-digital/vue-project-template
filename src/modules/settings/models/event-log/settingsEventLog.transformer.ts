import { CalendarDateTimeTransformer } from '@/models/date/calendarDateTime.transformer.ts'
import type { SettingLogIndex } from '@/modules/settings/models/event-log/settingsEventLogIndex.model.ts'
import type { SettingLogIndexDto } from '@/modules/settings/models/event-log/settingsEventLogIndexDto.model.ts'
import type { SettingLogIndexPagination } from '@/modules/settings/models/event-log/settingsEventLogIndexPagination.model.ts'
import type { SettingLogIndexPaginationDto } from '@/modules/settings/models/event-log/settingsEventLogIndexPaginationDto.model.ts'

export class SettingLogIndexTransformer {
  static fromDto(dto: SettingLogIndexDto): SettingLogIndex {
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

export class SettingLogIndexPaginationTransformer {
  static toDto(pagination: SettingLogIndexPagination): SettingLogIndexPaginationDto {
    return {
      filter: pagination.filter,
      sort: pagination.sort,
    }
  }
}
