/* eslint-disable no-console */
export function logError(message?: any, ...optionalParams: any[]): void {
  console.error(message, ...optionalParams)
}

export function logInfo(message?: any, ...optionalParams: any[]): void {
  console.log(message, ...optionalParams)
}
