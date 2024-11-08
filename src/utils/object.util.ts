export class ObjectUtil {
  static deepClone<T>(data: T): T {
    return JSON.parse(JSON.stringify(data)) as T
  }
}
