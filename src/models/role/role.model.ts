import type { CalendarDateTime } from '@/models/date/calendarDateTime.model.ts'

export interface Role {
  uuid: string
  createdAt: CalendarDateTime
  updatedAt: CalendarDateTime
  name: string
  permissions: {
    id: string
    actions: string[]
  }[]
}
