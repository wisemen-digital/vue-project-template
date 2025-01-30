import { useToast } from '@wisemen/vue-core'
import { useI18n } from 'vue-i18n'

interface UserErrorToastReturnType {
  show: (error: unknown) => void
}

export function useApiErrorToast(): UserErrorToastReturnType {
  const { t } = useI18n()
  const toast = useToast()

  function show(error: unknown): void {
    if (error instanceof TypeError) {
      toast.error({
        message: error?.response?.data?.message ?? t('error.default_error.description'),
      })

      return
    }

    throw error
  }

  return {
    show,
  }
}
