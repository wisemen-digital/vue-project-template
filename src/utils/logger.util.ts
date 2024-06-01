/* eslint-disable no-console */

export class LoggerUtil {
  static logError(message?: any, ...optionalParams: any[]): void {
    console.error(message, ...optionalParams)
  }

  static logInfo(message?: any, ...optionalParams: any[]): void {
    console.log(message, ...optionalParams)
  }
}
