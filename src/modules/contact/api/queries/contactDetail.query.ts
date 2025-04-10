import type {
  UseQueryOptions,
  UseQueryReturnType,
} from '@wisemen/vue-core-query'
import { useQuery } from '@wisemen/vue-core-query'
import type { ComputedRef } from 'vue'
import { toValue } from 'vue'

import type { PrefetchQueryReturnType } from '@/composables/prefetch-query/prefetchQuery.composable'
import { usePrefetchQuery } from '@/composables/prefetch-query/prefetchQuery.composable'
import type { ContactUuid } from '@/models/contact/contactUuid.model'
import type { ContactDetail } from '@/models/contact/detail/contactDetail.model'
import { ContactService } from '@/modules/contact/api/services/contact.service'
import { TimeUtil } from '@/utils/time.util'

export function contactDetailQuery(contactUuid: ComputedRef<ContactUuid>): UseQueryOptions<ContactDetail> {
  return {
    staleTime: TimeUtil.seconds(30),
    queryFn: () => ContactService.getByUuid(toValue(contactUuid)),
    queryKey: { contactDetail: { contactUuid } },
  }
}

export function useContactDetailQuery(contactUuid: ComputedRef<ContactUuid>): UseQueryReturnType<ContactDetail> {
  return useQuery(contactDetailQuery(contactUuid))
}

export function useContactDetailPrefetchQuery(contactUuid: ComputedRef<ContactUuid>): PrefetchQueryReturnType {
  return usePrefetchQuery(contactDetailQuery(contactUuid))
}
