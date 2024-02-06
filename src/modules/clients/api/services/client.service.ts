import { z } from 'zod'

import { httpClient } from '@/libs/http.lib'
import { mapClientCreateFormToClientCreateDto } from '@/models/clients/clientCreateDto.model.ts'
import type { ClientCreateForm } from '@/models/clients/clientCreateForm.model.ts'

interface ClientService {
	create: (form: ClientCreateForm) => Promise<void>
}

export const clientService: ClientService = {
	create: async (form: ClientCreateForm): Promise<void> => {
		await httpClient.post({
			url: '/forgot-password',
			body: mapClientCreateFormToClientCreateDto(form),
			responseSchema: z.unknown(),
		})
	},
}
