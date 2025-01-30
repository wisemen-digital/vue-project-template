import { useToast } from '@wisemen/vue-core'
import { useI18n } from 'vue-i18n'

interface UserErrorToastReturnType {
  show: (error: unknown) => void
}

interface ApiError {
  errors: {
    code: string
    detail: string
    source: {
      pointer: string
    }
  }[]
}

function isApiError(error: unknown): error is ApiError {
  return (error as ApiError).errors !== undefined
}

export function useApiErrorToast(): UserErrorToastReturnType {
  const { t } = useI18n()
  const toast = useToast()

  function show(error: unknown): void {
    console.log('error', error)

    if (isApiError(error)) {
      toast.error({
        message: error.errors[0]?.detail ?? t('error.default_error.description'),
      })

      return
    }

    throw error
  }

  return {
    show,
  }
}
