import type { UseMutationReturnType } from '@/composables/core/mutation/mutation.composable'
import { useMutation } from '@/composables/core/mutation/mutation.composable'
import type { ClientCreateForm } from '@/models/clients/clientCreateForm.model.ts'
import { clientService } from '@/modules/clients/api/services/client.service.ts'

export function useClientCreateMutation(): UseMutationReturnType<ClientCreateForm, void> {
	return useMutation<ClientCreateForm, void>({
		queryFn: async ({ body }: { body: ClientCreateForm }) => {
			await clientService.create(body)
		},
		queryKeysToInvalidate: [],
	})
}
