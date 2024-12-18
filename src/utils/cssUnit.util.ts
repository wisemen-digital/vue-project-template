export class CssUnitUtil {
  static pxToRem(px: number): number {
    const htmlFontSize = Number.parseFloat(getComputedStyle(document.documentElement).fontSize)

    return px / htmlFontSize
  }
}
