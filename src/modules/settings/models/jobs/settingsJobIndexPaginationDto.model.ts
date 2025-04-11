import type { BasePagination } from '@wisemen/vue-core-components'

import type {
  ViewJobsIndexFilterQuery,
  ViewJobsIndexSortQueryKey,
} from '@/client'

export interface SettingsJobIndexPaginationDto extends BasePagination {
  filter: ViewJobsIndexFilterQuery
  sort: ViewJobsIndexSortQueryKey
}
