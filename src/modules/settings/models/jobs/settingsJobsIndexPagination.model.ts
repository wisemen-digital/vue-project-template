import type { BasePagination } from '@wisemen/vue-core-components'

import type {
  QueueName,
  ViewJobsIndexSortQueryKey,
} from '@/client'

export interface SettingsJobsIndexPagination extends BasePagination {
  filter: {
    archived?: boolean
    queueNames?: Array<QueueName>
  }
  sort: ViewJobsIndexSortQueryKey
}
