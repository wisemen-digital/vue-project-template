import type { PaginationOptions } from '@wisemen/vue-core-components'
import type { UseInfiniteQueryReturnType } from '@wisemen/vue-core-query'
import { useInfiniteQuery } from '@wisemen/vue-core-query'
import type { ComputedRef } from 'vue'

import { SettingsJobService } from '@/modules/settings/api/services/settingsJob.service.ts'
import type { SettingsJobsIndex } from '@/modules/settings/models/jobs/settingsJobsIndexDto.model.ts'
import type { SettingsJobsIndexPagination } from '@/modules/settings/models/jobs/settingsJobsIndexPagination.model.ts'

export function useSettingsJobsIndexQuery(
  paginationOptions: ComputedRef<PaginationOptions<SettingsJobsIndexPagination>>,
): UseInfiniteQueryReturnType<SettingsJobsIndex> {
  return useInfiniteQuery<SettingsJobsIndex, SettingsJobsIndexPagination>({
    paginationOptions,
    queryFn: (options) => {
      return SettingsJobService.getAll(options)
    },
    queryKey: { settingsJobsIndex: { paginationOptions } },
  })
}
