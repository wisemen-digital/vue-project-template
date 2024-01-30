import { useRouteQuery } from '@vueuse/router'
import dayjs from 'dayjs'
import type { Ref } from 'vue'
import { computed } from 'vue'

import { formatDateToDto, getToday } from '@/utils/date.util'

export function useRouteDateQuery(identifier: string, defaultDate?: Date): Ref<Date> {
	const dateQuery = useRouteQuery<string>(identifier, formatDateToDto(defaultDate ?? getToday()))

	return computed<Date>({
		get: () => dayjs(dateQuery.value).toDate(),
		set: (value: Date) => {
			dateQuery.value = formatDateToDto(value)
		},
	})
}
