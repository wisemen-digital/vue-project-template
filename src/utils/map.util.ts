export class MapUtil {
  static areEqual(map1: Map<any, any>, map2: Map<any, any>): boolean {
    let testVal

    if (map1.size !== map2.size) {
      return false
    }
    for (const [
      key,
      val,
    ] of map1) {
      testVal = map2.get(key)

      if (testVal !== val || (testVal === undefined && !map2.has(key))) {
        return false
      }
    }

    return true
  }
}
