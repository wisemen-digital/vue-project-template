import { z } from 'zod'

import type { Customer } from '@/models/customers/customer.model'
import { customerUuidSchema } from '@/models/customers/customer.model.ts'
import { formatDateToDto } from '@/utils/date.util.ts'

export const customerDtoSchema = z.object({
	uuid: customerUuidSchema,
	createdAt: z.string(),
	updatedAt: z.string(),
	email: z.string(),
	firstName: z.string(),
	lastName: z.string(),
	fullName: z.string(),
})

export type CustomerDto = z.infer<typeof customerDtoSchema>

export function transformCustomerDtoToCustomer(customerDtoObject: CustomerDto): Customer {
	return {
		uuid: customerDtoObject.uuid,
		email: customerDtoObject.email,
		firstName: customerDtoObject.firstName,
		fullName: customerDtoObject.fullName,
		lastName: customerDtoObject.lastName,
		updatedAt: new Date(customerDtoObject.updatedAt),
		createdAt: new Date(customerDtoObject.createdAt),
	}
}

export function transformCustomerToCustomerDto(customerObject: Customer): CustomerDto {
	return {
		uuid: customerObject.uuid,
		email: customerObject.email,
		firstName: customerObject.firstName,
		fullName: customerObject.fullName,
		lastName: customerObject.lastName,
		updatedAt: formatDateToDto(customerObject.updatedAt),
		createdAt: formatDateToDto(customerObject.createdAt),
	}
}

export const customerDtoTransformer = customerDtoSchema.transform(transformCustomerDtoToCustomer)
