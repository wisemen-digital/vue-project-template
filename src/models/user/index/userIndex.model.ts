import type { UserUuid } from '@/models/user/userUuid.model'

export interface UserIndex {
  uuid: UserUuid
  email: string
  firstName: string | null
  fullName: string | null
  lastName: string | null
}
