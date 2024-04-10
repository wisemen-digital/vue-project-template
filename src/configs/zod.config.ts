import type { ErrorMapCtx, ZodIssueOptionalMessage } from 'zod'
import { z } from 'zod'

import { i18nPlugin } from '@/plugins/i18n/i18n.plugin.ts'

const { t } = i18nPlugin.global

function customErrorMap(issue: ZodIssueOptionalMessage, ctx: ErrorMapCtx): { message: string } {
  const isStringAndEmpty = issue.code === 'too_small' && issue.minimum === 1 && issue.type === 'string'
  const isInvalidType = issue.code === 'invalid_type'
  const isInvalidDiscriminator = issue.code === 'invalid_union_discriminator'

  if (isStringAndEmpty || isInvalidType || isInvalidDiscriminator) {
    return {
      message: t('validation.required'),
    }
  }

  // TODO: Add more custom error messages here.

  return {
    message: ctx.defaultError,
  }
}

export function configureZod(): void {
  z.setErrorMap(customErrorMap)
}
