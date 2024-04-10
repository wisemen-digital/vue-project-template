import { CURRENT_ENVIRONMENT } from '@/constants/environment.constant.ts'

export class Environment {
  static isAllowed(environmentMode: typeof CURRENT_ENVIRONMENT[]): boolean {
    return environmentMode.includes(CURRENT_ENVIRONMENT)
  }
}
