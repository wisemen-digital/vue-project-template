import type { UseMutationReturnType } from '@wisemen/vue-core-query'
import { useMutation } from '@wisemen/vue-core-query'

import type { ContactUuid } from '@/models/contact/contactUuid.model'
import { ContactService } from '@/modules/contact/api/services/contact.service'

interface Params {
  contactUuid: ContactUuid
}

export function useContactDeleteMutation(): UseMutationReturnType<void, void, Params> {
  return useMutation<void, void, Params>({
    queryFn: async ({ params }) => {
      await ContactService.delete(params.contactUuid)
    },
    queryKeysToInvalidate: { contactIndex: {} },
  })
}
