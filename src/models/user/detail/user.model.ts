import type { UserUuid } from '@/models/user/userUuid.model'

export interface User {
  uuid: UserUuid
  firstName: string | null
  fullName: string | null
  lastName: string | null
}
