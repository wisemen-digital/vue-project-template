import { useVcToast } from '@wisemen/vue-core-components'
import { useI18n } from 'vue-i18n'

import { ApiErrorEnumUtil } from '@/models/api-error/apiError.model.ts'
import { ApiErrorUtil } from '@/utils/apiError.util.ts'

interface UserErrorToastReturnType {
  show: (error: unknown) => void
}

export function useApiErrorToast(): UserErrorToastReturnType {
  const i18n = useI18n()
  const toast = useVcToast()

  function show(error: unknown): void {
    if (!ApiErrorUtil.isError(error)) {
      throw error
    }

    const errorMessage = ApiErrorEnumUtil.getI18nKeyForError(error)

    toast.error({
      title: i18n.t('toast.error.general_title'),
      description: errorMessage !== null ? i18n.t(errorMessage) : i18n.t('error.default_error.description'),
    })
  }

  return { show }
}
