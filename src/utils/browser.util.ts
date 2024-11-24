export class BrowserUtil {
  static hasSupportForViewTransition(): boolean {
    return document.startViewTransition !== undefined
  }

  static isChrome(): boolean {
    return navigator.userAgent.indexOf('Chrome') !== -1
  }

  static isFirefox(): boolean {
    return navigator.userAgent.indexOf('Firefox') !== -1
  }

  static isSafari(): boolean {
    return navigator.userAgent.indexOf('Safari') !== -1
  }
}