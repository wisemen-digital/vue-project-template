import type { I18nKey } from '@/plugins/i18n.plugin.ts'
import { createI18nKeyMap } from '@/types/enum.type.ts'
import { ApiErrorUtil } from '@/utils/apiError.util.ts'

export enum ApiErrorCode {
  UNAUTHORIZED = 'unauthorized',
}

export class ApiErrorEnumUtil {
  private static i18nKeys = createI18nKeyMap<ApiErrorCode>({ unauthorized: 'validation.unauthorized' })

  static getI18nKey(value: ApiErrorCode): I18nKey {
    return this.i18nKeys.get(value)!
  }

  static getI18nKeyForError(error: unknown): I18nKey | null {
    if (!ApiErrorUtil.isError(error)) {
      return null
    }

    const errorCode = error?.errors[0]?.code ?? null

    if (errorCode === null) {
      return null
    }

    return this.i18nKeys.get(errorCode) ?? null
  }
}
