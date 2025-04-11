import type {
  PaginatedData,
  PaginationOptions,
} from '@wisemen/vue-core-components'
import { PaginationParamsBuilder } from '@wisemen/vue-core-components'

import { viewJobsIndexV1 } from '@/client'
import {
  SettingsJobsIndexPaginationTransformer,
  SettingsJobsIndexTransformer,
} from '@/modules/settings/models/jobs/settingsJobs.transformer.ts'
import type { SettingsJobsIndex } from '@/modules/settings/models/jobs/settingsJobsIndexDto.model.ts'
import type { SettingsJobsIndexPagination } from '@/modules/settings/models/jobs/settingsJobsIndexPagination.model.ts'

export class SettingsJobService {
  static async getAll(
    paginationOptions: PaginationOptions<SettingsJobsIndexPagination>,
  ): Promise<PaginatedData<SettingsJobsIndex>> {
    const query = new PaginationParamsBuilder(paginationOptions)
      .buildKeyset(SettingsJobsIndexPaginationTransformer.toDto)

    const response = await viewJobsIndexV1({ query })

    return {
      data: response.data.items.map(SettingsJobsIndexTransformer.fromDto),
      meta: {
        next: response.data.meta.next,
        total: response.data.items.length,
      },
    }
  }
}
