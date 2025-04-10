import type { ContactUuid } from '@/models/contact/contactUuid.model'

export interface ContactIndex {
  uuid: ContactUuid
  isActive: boolean
  email: string | null
  firstName: string | null
  lastName: string | null
  phone: string | null
}
