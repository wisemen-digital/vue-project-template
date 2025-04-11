import type {
  PaginatedData,
  PaginationOptions,
} from '@wisemen/vue-core-components'
import { PaginationParamsBuilder } from '@wisemen/vue-core-components'

import { viewJobsIndexV1 } from '@/client'
import {
  SettingsJobIndexPaginationTransformer,
  SettingsJobIndexTransformer,
} from '@/modules/settings/models/jobs/settingsJob.transformer.ts'
import type { SettingsJobIndex } from '@/modules/settings/models/jobs/settingsJobIndexDto.model.ts'
import type { SettingsJobIndexPagination } from '@/modules/settings/models/jobs/settingsJobIndexPagination.model.ts'

export class SettingsJobService {
  static async getAll(
    paginationOptions: PaginationOptions<SettingsJobIndexPagination>,
  ): Promise<PaginatedData<SettingsJobIndex>> {
    const query = new PaginationParamsBuilder(paginationOptions)
      .buildKeyset(SettingsJobIndexPaginationTransformer.toDto)

    const response = await viewJobsIndexV1({ query })

    return {
      data: response.data.items.map(SettingsJobIndexTransformer.fromDto),
      meta: {
        next: response.data.meta.next,
        total: response.data.items.length,
      },
    }
  }
}
