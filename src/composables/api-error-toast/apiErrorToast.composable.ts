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
    if (Axios.isAxiosError(error)) {
      const { response } = error

      toast.error({
        title: t('error.default_error.title'),
        description: response?.data?.message ?? t('error.default_error.description'),
      })

      return
    }

    throw error
  }

  return {
    show,
  }
}
