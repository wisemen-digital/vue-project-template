import type { UseMutationReturnType } from '@/composables/core/mutation.composable.ts'
import { useMutation } from '@/composables/core/mutation.composable.ts'
import type { CustomerCreateForm } from '@/models/customers/customerCreateForm.model.ts'
import { customerService } from '@/modules/clients/api/services/customer.service.ts'

export function useCustomerCreateMutation(): UseMutationReturnType<CustomerCreateForm, void> {
	return useMutation<CustomerCreateForm, void>({
		queryFn: async ({ body }: { body: CustomerCreateForm }) => {
			await customerService.create(body)
		},
		queryKeysToInvalidate: [],
	})
}
