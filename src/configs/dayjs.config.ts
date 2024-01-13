import dayjs from 'dayjs'
import relativeTime from 'dayjs/plugin/relativeTime'

export function configureDayjs(): void {
  dayjs.extend(relativeTime)
  dayjs.locale('nl')
}
