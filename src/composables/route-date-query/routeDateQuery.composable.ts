import { useRouteQuery } from '@vueuse/router'
import type { Ref } from 'vue'
import { computed } from 'vue'

import type { CalendarDate } from '@/models/date/calendarDate.model'
import { CalendarDateTransformer } from '@/models/date/calendarDate.transformer'
import dayjs from '@/plugins/dayjs.plugin.ts'

export function useRouteDateQuery<TDateValue extends CalendarDate>(
  identifier: string,
  defaultDate?: TDateValue,
): Ref<TDateValue> {
  const dateQuery = useRouteQuery<string>(identifier, CalendarDateTransformer.toDto(
    defaultDate ?? (new Date() as CalendarDate),
  ))

  return computed<TDateValue>({
    get: () => dayjs(dateQuery.value).toDate() as TDateValue,
    set: (value) => {
      dateQuery.value = CalendarDateTransformer.toDto(value)
    },
  })
}
