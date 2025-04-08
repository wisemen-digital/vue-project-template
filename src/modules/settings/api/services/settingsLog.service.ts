import { PaginationParamsBuilder } from '@wisemen/vue-core'
import type {
  PaginatedData,
  PaginationOptions,
} from '@wisemen/vue-core-components'

import { viewDomainEventLogIndexV1 } from '@/client'
import {
  SettingsEventLogIndexPaginationTransformer,
  SettingsEventLogIndexTransformer,
} from '@/modules/settings/models/event-log/settingsEventLog.transformer.ts'
import type { SettingsEventLogIndex } from '@/modules/settings/models/event-log/settingsEventLogIndex.model.ts'
import type { SettingsEventLogIndexPagination } from '@/modules/settings/models/event-log/settingsEventLogIndexPagination.model.ts'

export class SettingsLogService {
  static async getAll(
    paginationOptions: PaginationOptions<SettingsEventLogIndexPagination>,
  ): Promise<PaginatedData<SettingsEventLogIndex>> {
    const query = new PaginationParamsBuilder(paginationOptions)
      .buildKeyset(SettingsEventLogIndexPaginationTransformer.toDto)

    const response = await viewDomainEventLogIndexV1({ query })

    return {
      data: response.data.items.map(SettingsEventLogIndexTransformer.fromDto),
      meta: {
        next: response.data.meta.next,
        total: response.data.items.length,
      },
    }
  }
}
