import type { PaginationOptions } from '@wisemen/vue-core'
import type { UseInfiniteQueryReturnType } from '@wisemen/vue-core-query'
import { useInfiniteQuery } from '@wisemen/vue-core-query'
import type { ComputedRef } from 'vue'

import { SettingsLogService } from '@/modules/settings/api/services/settingsLog.service.ts'
import type { SettingLogIndex } from '@/modules/settings/models/event-log/settingsEventLogIndex.model.ts'
import type { SettingLogIndexPagination } from '@/modules/settings/models/event-log/settingsEventLogIndexPagination.model.ts'

export function useSettingEventLogIndexQuery(
  paginationOptions: ComputedRef<PaginationOptions<SettingLogIndexPagination>>,
): UseInfiniteQueryReturnType<SettingLogIndex> {
  return useInfiniteQuery<SettingLogIndex, SettingLogIndexPagination>({
    paginationOptions,
    queryFn: (options) => {
      return SettingsLogService.getAll(options)
    },
    queryKey: { settingLogIndex: { paginationOptions } },
  })
}
