import type { UseMutationReturnType } from '@wisemen/vue-core-query'
import { useMutation } from '@wisemen/vue-core-query'

import type { ContactUuid } from '@/models/contact/contactUuid.model'
import type { ContactUpdateForm } from '@/models/contact/update/contactUpdateForm.model'
import { ContactService } from '@/modules/contact/api/services/contact.service'

interface Params {
  contactUuid: ContactUuid
}

export function useContactUpdateMutation(): UseMutationReturnType<ContactUpdateForm, void, Params> {
  return useMutation<ContactUpdateForm, void, Params>({
    queryFn: async ({
      body, params,
    }) => {
      await ContactService.update(params.contactUuid, body)
    },
    queryKeysToInvalidate: {
      contactDetail: { contactUuid: (params) => params.contactUuid },
      contactIndex: {},
    },
  })
}
