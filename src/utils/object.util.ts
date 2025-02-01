export class ObjectUtil {
  static deepClone<T>(obj: T): T {
    return JSON.parse(JSON.stringify(obj))
  }

  static serialize(obj: any, prefix = ''): string {
    const queryString = Object.keys(obj)
      .map((key) => {
        const value = obj[key]
        const prefixedKey = prefix ? `${prefix}[${key}]` : key

        if (value !== null && typeof value === 'object' && !Array.isArray(value)) {
          // Recursively serialize nested objects
          return ObjectUtil.serialize(value, prefixedKey)
        }
        else if (Array.isArray(value)) {
          // Serialize arrays
          return value
            .map((item, index) =>
              typeof item === 'object'
                ? ObjectUtil.serialize(item, `${prefixedKey}[${index}]`)
                : `${encodeURIComponent(`${prefixedKey}[${index}]`)}=${encodeURIComponent(item)}`)
            .join('&')
        }
        else if (value === null || value === undefined) {
          // Skip null or undefined values
          return ''
        }
        else {
          // Serialize primitive values
          return `${encodeURIComponent(prefixedKey)}=${encodeURIComponent(value)}`
        }
      })
      .filter((value) => value !== '')
      .join('&')

    return queryString
  }
}
