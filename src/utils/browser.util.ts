export class BrowserUtil {
  static hasSupportForViewTransition(): boolean {
    return document.startViewTransition !== undefined
  }

  static isChrome(): boolean {
    return navigator.userAgent.includes('Chrome')
  }

  static isFirefox(): boolean {
    return navigator.userAgent.includes('Firefox')
  }

  static isSafari(): boolean {
    return navigator.userAgent.includes('Safari')
  }
}
