import { z } from 'zod'

import { i18nPlugin } from '@/plugins'

const { t } = i18nPlugin.global

const customErrorMap: z.ZodErrorMap = (issue, ctx) => {
  const isInvalidTypeAndNull
		= issue.code === z.ZodIssueCode.invalid_type && issue.received === 'null'

  const isInvalidDiscrimatorAndNull
		= issue.code === z.ZodIssueCode.invalid_union
		|| issue.code === z.ZodIssueCode.invalid_union_discriminator

  const isTooSmallAndString
		= issue.code === z.ZodIssueCode.too_small
		&& issue.minimum === 1
		&& issue.type === 'string'

  if (isInvalidTypeAndNull || isTooSmallAndString || isInvalidDiscrimatorAndNull) {
    return {
      message: t('common.required'),
    }
  }

  return {
    message: ctx.defaultError,
  }
}

export function configureZod(): void {
  z.setErrorMap(customErrorMap)
}
