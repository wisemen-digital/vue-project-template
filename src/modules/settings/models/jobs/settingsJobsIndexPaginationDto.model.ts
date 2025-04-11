import type { BasePagination } from '@wisemen/vue-core-components'

import type {
  ViewJobsIndexFilterQuery,
  ViewJobsIndexSortQueryKey,
} from '@/client'

export interface SettingsJobsIndexPaginationDto extends BasePagination {
  filter: ViewJobsIndexFilterQuery
  sort: ViewJobsIndexSortQueryKey
}
