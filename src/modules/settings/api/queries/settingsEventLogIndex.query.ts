import type { PaginationOptions } from '@wisemen/vue-core-components'
import type { UseInfiniteQueryReturnType } from '@wisemen/vue-core-query'
import { useInfiniteQuery } from '@wisemen/vue-core-query'
import type { ComputedRef } from 'vue'

import { SettingsLogService } from '@/modules/settings/api/services/settingsLog.service.ts'
import type { SettingsEventLogIndex } from '@/modules/settings/models/event-log/settingsEventLogIndex.model.ts'
import type { SettingsEventLogIndexPagination } from '@/modules/settings/models/event-log/settingsEventLogIndexPagination.model.ts'

export function useSettingsEventLogIndexQuery(
  paginationOptions: ComputedRef<PaginationOptions<SettingsEventLogIndexPagination>>,
): UseInfiniteQueryReturnType<SettingsEventLogIndex> {
  return useInfiniteQuery<SettingsEventLogIndex, SettingsEventLogIndexPagination>({
    paginationOptions,
    queryFn: (options) => {
      return SettingsLogService.getAll(options)
    },
    queryKey: { settingsEventLogIndex: { paginationOptions } },
  })
}
