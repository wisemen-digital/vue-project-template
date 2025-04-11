import type { PaginationOptions } from '@wisemen/vue-core-components'
import type { UseInfiniteQueryReturnType } from '@wisemen/vue-core-query'
import { useInfiniteQuery } from '@wisemen/vue-core-query'
import type { ComputedRef } from 'vue'

import { SettingsJobService } from '@/modules/settings/api/services/settingsJob.service.ts'
import type { SettingsJobIndex } from '@/modules/settings/models/jobs/settingsJobIndexDto.model.ts'
import type { SettingsJobIndexPagination } from '@/modules/settings/models/jobs/settingsJobIndexPagination.model.ts'

export function useSettingsJobsIndexQuery(
  paginationOptions: ComputedRef<PaginationOptions<SettingsJobIndexPagination>>,
): UseInfiniteQueryReturnType<SettingsJobIndex> {
  return useInfiniteQuery<SettingsJobIndex, SettingsJobIndexPagination>({
    paginationOptions,
    queryFn: (options) => {
      return SettingsJobService.getAll(options)
    },
    queryKey: { settingsJobsIndex: { paginationOptions } },
  })
}
