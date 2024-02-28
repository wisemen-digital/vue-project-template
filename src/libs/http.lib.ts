import { createHttpZodClient } from '@appwise/zod-http-client'

import { useToast } from '@/composables/toast/toast.composable'

import { axios, unauthorizedAxios } from './axios.lib'

interface ZodError {
	url: string
	method: string
	error: unknown
}

const ENVIRONMENT = import.meta.env.ENVIRONMENT

function onZodError({ url, method, error }: ZodError): void {
	const { showToast } = useToast()

	if (ENVIRONMENT !== 'production') {
		showToast({
			title: `${method.toUpperCase()} ${url} returned a malformed response.`,
		})
	}

	// eslint-disable-next-line no-console
	console.error(`${method.toUpperCase()} ${url} returned a malformed response\n\n`, error)
}

export const httpClient = createHttpZodClient({
	axios,
	onZodError,
})

export const unauthorizedHttpClient = createHttpZodClient({
	axios: unauthorizedAxios,
	onZodError,
})
