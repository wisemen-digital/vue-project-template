import { useToast } from '@wisemen/vue-core'
import Axios from 'axios'

import { useI18n } from 'vue-i18n'

interface UserErrorToastReturnType {
  show: (error: unknown) => void
}

export function useApiErrorToast(): UserErrorToastReturnType {
  const { t } = useI18n()
  const toast = useToast()

  function show(error: unknown): void {
    if (Axios.isAxiosError(error) === true) {
      const { response } = error

      toast.error({
        message: response?.data?.message ?? t('error.default_error.description'),
      })

      return
    }

    throw error
  }

  return {
    show,
  }
}
