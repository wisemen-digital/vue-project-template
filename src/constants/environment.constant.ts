/* eslint-disable no-console */
import { LoggerUtil } from '@/utils/logger.util'

export const API_BASE_URL = import.meta.env.API_BASE_URL

export const AUTH_BASE_URL = import.meta.env.AUTH_BASE_URL
export const AUTH_CLIENT_ID = import.meta.env.AUTH_CLIENT_ID
export const AUTH_ORGANIZATION_ID = import.meta.env.AUTH_ORGANIZATION_ID

export const AUTH_GOOGLE_IDP_ID = import.meta.env.AUTH_GOOGLE_IDP_ID
export const AUTH_APPLE_IDP_ID = import.meta.env.AUTH_APPLE_IDP_ID

export const SENTRY_DSN = import.meta.env.SENTRY_DSN
export const SENTRY_SAMPLE_RATE = import.meta.env.SENTRY_SAMPLE_RATE

export const CURRENT_ENVIRONMENT = import.meta.env.ENVIRONMENT
export const CURRENT_BUILD_NUMBER = BUILD_NUMBER
export const CURRENT_BUILD_COMMIT = BUILD_COMMIT
export const CURRENT_BUILD_TIMESTAMP = BUILD_TIMESTAMP

export function logBuildInformation(): void {
  if (CURRENT_BUILD_COMMIT === 'undefined') {
    return
  }

  console.groupCollapsed('Build Information')

  function logRow(label: string, value: string): void {
    LoggerUtil.logInfo(`%c${label.padEnd(15)} %c${value}`, 'font-weight: bold;', 'font-weight: normal;')
  }

  logRow('Api Base URL', API_BASE_URL)
  LoggerUtil.logInfo('')
  logRow('Environment', CURRENT_ENVIRONMENT)
  logRow('Build Number', CURRENT_BUILD_NUMBER)
  logRow('Build Commit', CURRENT_BUILD_COMMIT)
  logRow('Build Timestamp', CURRENT_BUILD_TIMESTAMP)

  console.groupEnd()
}
