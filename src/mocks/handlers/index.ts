import { authHandlers } from '@/mocks/handlers/auth.mock.ts'
import { contactHandlers } from '@/mocks/handlers/contact.mock.ts'
import { userHandlers } from '@/mocks/handlers/user.mock.ts'

export const handlers = [
  ...authHandlers,
  ...contactHandlers,
  ...userHandlers,
]
