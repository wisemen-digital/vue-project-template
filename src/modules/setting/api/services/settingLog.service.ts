import type {
  PaginatedData,
  PaginationOptions,
} from '@wisemen/vue-core'
import { PaginationParamsBuilder } from '@wisemen/vue-core'

import { viewDomainEventLogIndexV1 } from '@/client'
import {
  SettingLogIndexPaginationTransformer,
  SettingLogIndexTransformer,
} from '@/modules/setting/models/event-log/settingEventLog.transformer.ts'
import type { SettingLogIndex } from '@/modules/setting/models/event-log/settingEventLogIndex.model.ts'
import type { SettingLogIndexPagination } from '@/modules/setting/models/event-log/settingEventLogIndexPagination.model.ts'

export class SettingLogService {
  static async getAll(
    paginationOptions: PaginationOptions<SettingLogIndexPagination>,
  ): Promise<PaginatedData<SettingLogIndex>> {
    const query = new PaginationParamsBuilder(paginationOptions)
      .buildKeyset(SettingLogIndexPaginationTransformer.toDto)

    const response = await viewDomainEventLogIndexV1({ query })

    return {
      data: response.data.items.map(SettingLogIndexTransformer.fromDto),
      meta: {
        next: response.data.meta.next,
        total: response.data.items.length,
      },
    }
  }
}
