import dayjs from 'dayjs'
import nl from 'dayjs/locale/nl'
import customParseFormat from 'dayjs/plugin/customParseFormat'
import duration from 'dayjs/plugin/duration'
import isBetween from 'dayjs/plugin/isBetween'
import isSameOrAfter from 'dayjs/plugin/isSameOrAfter'
import isSameOrBefore from 'dayjs/plugin/isSameOrBefore'
import isToday from 'dayjs/plugin/isToday'
import localeData from 'dayjs/plugin/localeData'
import updateLocale from 'dayjs/plugin/updateLocale'
import utc from 'dayjs/plugin/utc'
import weekOfYear from 'dayjs/plugin/weekOfYear'

dayjs.extend(updateLocale)
dayjs.updateLocale('nl', { weekStart: 1 })

dayjs.extend(weekOfYear)
dayjs.extend(localeData)
dayjs.extend(customParseFormat)
dayjs.extend(isBetween)
dayjs.extend(duration)
dayjs.extend(isToday)
dayjs.extend(isSameOrBefore)
dayjs.extend(isSameOrAfter)
dayjs.extend(utc)
dayjs.locale(nl)

export default dayjs
