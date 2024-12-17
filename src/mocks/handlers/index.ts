import { authHandlers } from '@/mocks/handlers/auth.mock.ts'
import { userHandlers } from '@/mocks/handlers/user.mock.ts'

export const handlers = [
  ...authHandlers,
  ...userHandlers,
]
