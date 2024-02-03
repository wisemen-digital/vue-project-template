import { z } from 'zod'

import { httpClient } from '@/libs/http.lib'
import { mapCustomerCreateFormToCustomerCreateDto } from '@/models/customers/customerCreateDto.model.ts'
import type { CustomerCreateForm } from '@/models/customers/customerCreateForm.model.ts'

interface CustomerService {
	create: (form: CustomerCreateForm) => Promise<void>
}

export const customerService: CustomerService = {
	create: async (form: CustomerCreateForm): Promise<void> => {
		await httpClient.post({
			url: '/forgot-password',
			body: mapCustomerCreateFormToCustomerCreateDto(form),
			responseSchema: z.unknown(),
		})
	},
}
