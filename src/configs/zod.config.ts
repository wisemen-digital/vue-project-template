import type {
  ErrorMapCtx,
  ZodIssueOptionalMessage,
} from 'zod'
import { z } from 'zod'

import { i18nPlugin } from '@/plugins/i18n.plugin.ts'

const i18n = i18nPlugin.global

function customErrorMap(issue: ZodIssueOptionalMessage, ctx: ErrorMapCtx): { message: string } {
  const isStringAndEmpty = issue.code === 'too_small' && issue.minimum === 1 && issue.type === 'string'
  const isInvalidType = issue.code === 'invalid_type'
  const isInvalidDiscriminator = issue.code === 'invalid_union_discriminator'

  if (isStringAndEmpty || isInvalidType || isInvalidDiscriminator) {
    return { message: i18n.t('validation.required') }
  }

  if (issue.code === z.ZodIssueCode.invalid_union) {
    return { message: i18n.t('validation.invalid_union') }
  }
  if (issue.code === z.ZodIssueCode.invalid_string) {
    if (issue.validation === 'email') {
      return { message: i18n.t('validation.invalid_email') }
    }
    if (issue.validation === 'url') {
      return { message: i18n.t('validation.invalid_url') }
    }
    if (issue.validation === 'uuid') {
      return { message: i18n.t('validation.invalid_uuid') }
    }
    if (issue.validation === 'regex') {
      return { message: i18n.t('validation.invalid_regex') }
    }
    if (issue.validation === 'datetime') {
      return { message: i18n.t('validation.invalid_datetime') }
    }

    return { message: i18n.t('validation.invalid_string') }
  }

  if (issue.code === z.ZodIssueCode.invalid_date) {
    return { message: i18n.t('validation.invalid_date') }
  }
  if (issue.code === z.ZodIssueCode.too_big) {
    if (issue.type === 'string') {
      return { message: i18n.t('validation.too_big_string', { count: issue.maximum }) }
    }
    if (issue.type === 'number') {
      return { message: i18n.t('validation.too_big_number', { count: issue.maximum }) }
    }
    if (issue.type === 'array') {
      return { message: i18n.t('validation.too_big_array', { count: issue.maximum }) }
    }
    if (issue.type === 'date') {
      return { message: i18n.t('validation.too_big_date', { count: issue.maximum }) }
    }

    return { message: i18n.t('validation.too_big', { count: issue.maximum }) }
  }
  if (issue.code === z.ZodIssueCode.too_small) {
    if (issue.type === 'string') {
      return { message: i18n.t('validation.too_small_string', { count: issue.minimum }) }
    }
    if (issue.type === 'number') {
      return { message: i18n.t('validation.too_small_number', { count: issue.minimum }) }
    }
    if (issue.type === 'array') {
      return { message: i18n.t('validation.too_small_array', { count: issue.minimum }) }
    }
    if (issue.type === 'date') {
      return { message: i18n.t('validation.too_small_date', { v: issue.minimum }) }
    }

    return { message: i18n.t('validation.too_small', { count: issue.minimum }) }
  }

  return { message: ctx.defaultError }
}

export function configureZod(): void {
  z.setErrorMap(customErrorMap)
}
