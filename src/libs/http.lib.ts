import { createHttpZodClient } from '@appwise/zod-http-client'

import { useToast } from '@/ui/composables'

import { axios, unauthorizedAxios } from './axios.lib'

interface OnZodError {
	url: string
	method: string
	error: unknown
}

const { VITE_ENVIRONMENT } = import.meta.env

function onZodError({ url, method, error }: OnZodError): void {
	const { showToastMessage } = useToast()

	if (VITE_ENVIRONMENT !== 'production') {
		showToastMessage(`${method.toUpperCase()} ${url} returned a malformed response.`)
	}

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
