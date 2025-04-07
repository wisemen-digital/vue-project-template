import { CalendarDateTimeTransformer } from '@/models/date/calendarDateTime.transformer.ts'
import type { SettingLogIndex } from '@/modules/setting/models/event-log/settingEventLogIndex.model.ts'
import type { SettingLogIndexDto } from '@/modules/setting/models/event-log/settingEventLogIndexDto.model.ts'
import type { SettingLogIndexPagination } from '@/modules/setting/models/event-log/settingEventLogIndexPagination.model.ts'
import type { SettingLogIndexPaginationDto } from '@/modules/setting/models/event-log/settingEventLogIndexPaginationDto.model.ts'

export class SettingLogIndexTransformer {
  static fromDto(dto: SettingLogIndexDto): SettingLogIndex {
    return {
      uuid: dto.uuid,
      createdAt: CalendarDateTimeTransformer.fromDto(dto.createdAt),
      content: dto.content,
      message: dto.message,
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
