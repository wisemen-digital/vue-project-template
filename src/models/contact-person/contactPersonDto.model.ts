import { z } from 'zod'

import type { ContactPersonForm } from '@/models/contact-person/contactPersonForm.model.ts'

export const contactPersonDtoSchema = z.object({
	title: z.string(),
	firstName: z.string(),
	lastName: z.string(),
	personFunction: z.string(),
	email: z.string().email(),
	phoneNumber: z.string(),
	isPrimary: z.boolean(),
})

export type ContactPersonDto = z.infer<typeof contactPersonDtoSchema>

export function mapContactPersonFormToDto(form: ContactPersonForm): ContactPersonDto {
	return {
		title: form.title,
		firstName: form.firstName,
		lastName: form.lastName,
		personFunction: form.personFunction,
		email: form.email,
		phoneNumber: form.phoneNumber,
		isPrimary: form.isPrimary,
	}
}
