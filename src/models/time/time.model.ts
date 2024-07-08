import { Time } from '@internationalized/date'
import { z } from 'zod'

import { i18nPlugin } from '@/plugins/i18n/i18n.plugin.ts'

export const timeSchema = z.custom<Time>((value) => {
  return value instanceof Time
}, {
  message: i18nPlugin.global.t('validation.invalid_time'),
})
