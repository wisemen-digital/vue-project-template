import { z } from 'zod'

import { personTitleConstantSchema } from '@/constants/personTitle.constant.ts'

export const contactPersonFormSchema = z.object({
	title: personTitleConstantSchema,
	firstName: z.string(),
	lastName: z.string(),
	personFunction: z.string(),
	email: z.string().email(),
	phoneNumber: z.string(),
	isPrimary: z.boolean(),
})

export type ContactPersonForm = z.infer<typeof contactPersonFormSchema>

export function mapContactPersonDtoToForm(dto: ContactPersonForm): ContactPersonForm {
	return {
		title: dto.title,
		firstName: dto.firstName,
		lastName: dto.lastName,
		personFunction: dto.personFunction,
		email: dto.email,
		phoneNumber: dto.phoneNumber,
		isPrimary: dto.isPrimary,
	}
}
