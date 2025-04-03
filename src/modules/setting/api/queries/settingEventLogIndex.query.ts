import type { PaginationOptions } from '@wisemen/vue-core'
import type {
  UseInfiniteQueryReturnType,
} from '@wisemen/vue-core-query'
import { useInfiniteQuery } from '@wisemen/vue-core-query'
import type { ComputedRef } from 'vue'

import { SettingLogService } from '@/modules/setting/api/services/settingLog.service.ts'
import type { SettingLogIndex } from '@/modules/setting/models/event-log/settingEventLogIndex.model.ts'
import type {
  SettingLogIndexPagination,
} from '@/modules/setting/models/event-log/settingEventLogIndexPagination.model.ts'

export function useSettingEventLogIndexQuery(
  paginationOptions: ComputedRef<PaginationOptions<SettingLogIndexPagination>>,
): UseInfiniteQueryReturnType<SettingLogIndex> {
  return useInfiniteQuery<SettingLogIndex, SettingLogIndexPagination>({
    paginationOptions,
    queryFn: (options) => {
      return SettingLogService.getAll(options)
    },
    queryKey: {
      settingLogIndex: {
        paginationOptions,
      },
    },
  })
}
