export class ObjectUtil {
  static deepClone<T>(obj: T): T {
    return JSON.parse(JSON.stringify(obj))
  }

  /**
   * Recursively serialize an object into a query string that can be used in a URL.
   * Example:
   * ```
   * ObjectUtil.serialize({ a: 1, b: { c: 2, d: [3, 4] } })
   * // Returns: 'a=1&b[c]=2&b[d][0]=3&b[d][1]=4'
   * ```
   * @param obj
   * @param prefix
   */
  static serialize(obj: any, prefix = ''): string {
    return Object.keys(obj)
      .map((key) => {
        const value = obj[key]
        const prefixedKey = prefix ? `${prefix}[${key}]` : key

        if (value !== null && typeof value === 'object' && !Array.isArray(value)) {
          return ObjectUtil.serialize(value, prefixedKey)
        }

        if (Array.isArray(value)) {
          return value
            .map((item, index) =>
              typeof item === 'object'
                ? ObjectUtil.serialize(item, `${prefixedKey}[${index}]`)
                : `${encodeURIComponent(`${prefixedKey}[${index}]`)}=${encodeURIComponent(item)}`)
            .join('&')
        }
        if (value === null || value === undefined) {
          return ''
        }

        return `${encodeURIComponent(prefixedKey)}=${encodeURIComponent(value)}`
      })
      .filter((value) => value !== '')
      .join('&')
  }
}
