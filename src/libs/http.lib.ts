import { createHttpZodClient } from '@appwise/zod-http-client'
import { useToast } from '@wisemen/vue-core'

import { axios, unauthorizedAxios } from './axios.lib'

interface ZodError {
  error: unknown
  method: string
  url: string
}

const ENVIRONMENT = import.meta.env.ENVIRONMENT

function onZodError({ error, method, url }: ZodError): void {
  const toast = useToast()

  if (ENVIRONMENT !== 'production') {
    toast.error({
      description: `${method.toUpperCase()} ${url} returned a malformed response.`,
      title: 'Something went wrong',
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
