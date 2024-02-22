import { createHttpZodClient } from '@appwise/zod-http-client'

import { useToast } from '@/composables/toast/toast.composable'
import { logError } from '@/utils/logger.util'

import { axios, unauthorizedAxios } from './axios.lib'

interface ZodError {
	url: string
	method: string
	error: unknown
}

const { VITE_ENVIRONMENT } = import.meta.env

function onZodError({ url, method, error }: ZodError): void {
	const { showToast } = useToast()

	if (VITE_ENVIRONMENT !== 'production') {
		showToast({
			title: `${method.toUpperCase()} ${url} returned a malformed response.`,
		})
	}

	logError(`${method.toUpperCase()} ${url} returned a malformed response\n\n`, error)
}

export const httpClient = createHttpZodClient({
	axios,
	onZodError,
})

export const unauthorizedHttpClient = createHttpZodClient({
	axios: unauthorizedAxios,
	onZodError,
})
