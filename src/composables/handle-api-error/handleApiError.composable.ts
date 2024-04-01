import { useToast } from '@wisemen/vue-core'
import { AxiosError } from 'axios'
import type { Form } from 'formango'
import type { z } from 'zod'

import { i18nPlugin } from '@/plugins/i18n/i18n.plugin'
import { logError, logInfo } from '@/utils/logger.util'

/**
 * TODO
 * Maps API errors to form errors.
 */
function mapApiErrorsToFormErrors(errors: unknown): z.ZodFormattedError<unknown> {
  logInfo(errors)

  return {
    _errors: [],
  }
}

function handleAxiosError<T extends z.ZodType>(error: AxiosError, form?: Form<T>): void {
  const { t } = i18nPlugin.global
  const toast = useToast()

  const { response } = error
  const { status } = response ?? {}

  const mappedErrors = mapApiErrorsToFormErrors(response?.data)

  switch (status) {
    case 403:
      toast.error({
        description: t('error.forbidden.description'),
        title: t('error.forbidden.title'),
      })
      break
    case 422:
      toast.error({
        description: t('error.validation_error.description'),
        title: t('error.validation_error.title'),
      })

      form?.addErrors(mappedErrors as any)
      break
    case 500:
      toast.error({
        description: t('error.internal_server_error.description'),
        title: t('error.internal_server_error.title'),
      })
      logError(error)
      break
    default:
      toast.error({
        description: t('error.default_error.description'),
        title: t('error.default_error.title'),
      })
      logError(error)
      break
  }
}

export function useHandleApiError<T extends z.ZodType>(error: unknown, form?: Form<T>): void {
  if (error instanceof AxiosError) {
    handleAxiosError(error, form)
    return
  }

  throw error
}
