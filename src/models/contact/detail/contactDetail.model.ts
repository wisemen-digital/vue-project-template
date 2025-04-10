import type { Address } from '@/models/address/address.model.ts'
import type { ContactUuid } from '@/models/contact/contactUuid.model'

export interface ContactDetail {
  uuid: ContactUuid
  createdAt: string
  updatedAt: string
  isActive: boolean
  address: Address | null
  email: string | null
  firstName: string | null
  lastName: string | null
  phone: string | null
}
