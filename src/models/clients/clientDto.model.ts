import { z } from 'zod'

import type { Client } from '@/models/clients/client.model.ts'
import { clientUuidSchema } from '@/models/clients/client.model.ts'
import { formatDateToDto } from '@/utils/date.util.ts'

export const clientDtoSchema = z.object({
	uuid: clientUuidSchema,
	createdAt: z.string(),
	updatedAt: z.string(),
	email: z.string(),
	firstName: z.string(),
	lastName: z.string(),
	fullName: z.string(),
})

export type ClientDto = z.infer<typeof clientDtoSchema>

export function transformClientDtoToClient(clientDtoDtoObject: ClientDto): Client {
	return {
		uuid: clientDtoDtoObject.uuid,
		email: clientDtoDtoObject.email,
		firstName: clientDtoDtoObject.firstName,
		fullName: clientDtoDtoObject.fullName,
		lastName: clientDtoDtoObject.lastName,
		updatedAt: new Date(clientDtoDtoObject.updatedAt),
		createdAt: new Date(clientDtoDtoObject.createdAt),
	}
}

export function transformClientToClientDto(client: Client): ClientDto {
	return {
		uuid: client.uuid,
		email: client.email,
		firstName: client.firstName,
		fullName: client.fullName,
		lastName: client.lastName,
		updatedAt: formatDateToDto(client.updatedAt),
		createdAt: formatDateToDto(client.createdAt),
	}
}

export const clientDtoTransformer = clientDtoSchema.transform(transformClientDtoToClient)
