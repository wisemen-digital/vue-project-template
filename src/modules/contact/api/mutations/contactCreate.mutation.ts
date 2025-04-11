import type { UseMutationReturnType } from '@wisemen/vue-core-query'
import { useMutation } from '@wisemen/vue-core-query'

import type { ContactUuid } from '@/models/contact/contactUuid.model'
import type { ContactCreateForm } from '@/models/contact/create/contactCreateForm.model'
import { ContactService } from '@/modules/contact/api/services/contact.service'

export function useContactCreateMutation(): UseMutationReturnType<ContactCreateForm, ContactUuid> {
  return useMutation<ContactCreateForm, ContactUuid>({
    queryFn: async ({ body }) => {
      return await ContactService.create(body)
    },
    queryKeysToInvalidate: { contactIndex: {} },
  })
}
