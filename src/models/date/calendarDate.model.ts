import { CalendarDate } from '@internationalized/date'
import { z } from 'zod'

import { i18nPlugin } from '@/plugins/i18n/i18n.plugin.ts'

export const calendarDateSchema = z.custom<CalendarDate>((value) => {
  return value instanceof CalendarDate
}, {
  message: i18nPlugin.global.t('validation.invalid_date'),
})
