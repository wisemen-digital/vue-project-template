import { CalendarDateTime } from '@internationalized/date'
import { z } from 'zod'

import { i18nPlugin } from '@/plugins/i18n/i18n.plugin.ts'

export const calendarDateTimeSchema = z.custom<CalendarDateTime>((value) => {
  return value instanceof CalendarDateTime
}, {
  message: i18nPlugin.global.t('validation.invalid_datetime'),
})
