import { createHttpZodClient } from '@appwise/zod-http-client'

import { useToast } from '@/composables/toast/toast.composable'

import { axios, unauthorizedAxios } from './axios.lib'

interface ZodError {
  error: unknown
  method: string
  url: string
}

const ENVIRONMENT = import.meta.env.ENVIRONMENT

function onZodError({ error, method, url }: ZodError): void {
  const { showToast } = useToast()

  if (ENVIRONMENT !== 'production') {
    showToast({
      title: `${method.toUpperCase()} ${url} returned a malformed response.`,
    })
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
