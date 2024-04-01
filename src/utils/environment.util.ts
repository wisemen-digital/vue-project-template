export enum EnvironmentMode {
  DEVELOPMENT = 'development',
  PRODUCTION = 'production',
  QA = 'qa',
  SANDBOX = 'sandbox',
  STAGING = 'staging',
}

export interface Environment {
  currentEnvironment: EnvironmentMode
  isAllowed: (environmentMode: EnvironmentMode[]) => boolean
  isDevelopment: boolean
  version: string
}

export const IS_DEVELOPMENT = import.meta.env.MODE === EnvironmentMode.DEVELOPMENT
export const CURRENT_ENVIRONMENT = import.meta.env.MODE as EnvironmentMode
export const VERSION_NUMBER = import.meta.env.VITE_APP_VERSION as null | string

export function isAllowed(environmentMode: EnvironmentMode[]): boolean {
  return environmentMode.includes(import.meta.env.MODE as EnvironmentMode)
}
