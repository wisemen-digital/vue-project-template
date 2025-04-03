import { useToast } from '@wisemen/vue-core'
import { useI18n } from 'vue-i18n'

import { ApiErrorEnumUtil } from '@/models/api-error/apiError.model.ts'
import { ApiErrorUtil } from '@/utils/apiError.util.ts'

interface UserErrorToastReturnType {
  show: (error: unknown) => void
}

export function useApiErrorToast(): UserErrorToastReturnType {
  const i18n = useI18n()
  const toast = useToast()

  function show(error: unknown): void {
    if (!ApiErrorUtil.isError(error)) {
      throw error
    }

    const errorMessage = ApiErrorEnumUtil.getI18nKeyForError(error)

    toast.error({ message: errorMessage !== null ? i18n.t(errorMessage) : i18n.t('error.default_error.description') })
  }

  return { show }
}
