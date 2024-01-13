import { AxiosError } from 'axios'
import type { z } from 'zod'

interface AxiosErrorData {
	message: string
	errors: Record<string, string[]>
}

function snakeCaseToCamelCase(str: string): string {
	return str.replace(/([-_][a-z])/g, (group) => group.toUpperCase().replace('-', '').replace('_', ''))
}

type Mapping<FormType, ResponseType> = {
	[K in keyof FormType]: K extends keyof ResponseType ? never : K
}[keyof FormType]

export function mapApiErrors<FormType, ResponseType>(
	error: unknown,
	keyMapping: Partial<Record<Mapping<FormType, ResponseType>, keyof ResponseType>> = {}
): z.ZodFormattedError<unknown> {
	if (!(error instanceof AxiosError)) {
		throw error
	}

	const { response } = error
	const { status } = response ?? {}

	if (response == null || (status != null && status !== 422)) {
		return {} as unknown as z.ZodFormattedError<unknown>
	}

	const { data } = response as { data: AxiosErrorData }
	const { errors } = data

	return Object.entries(errors).reduce<z.ZodFormattedError<unknown>>(
		(acc, [key]) => {
			const keyAsCamelCase = snakeCaseToCamelCase(key)
			const [mappedKey] = Object.entries(keyMapping).find(([_k, v]) => v === keyAsCamelCase) ?? []

			return {
				...acc,
				[mappedKey ?? keyAsCamelCase]: {
					_errors: errors[key],
				},
			}
		},
		{ _errors: [] }
	)
}
