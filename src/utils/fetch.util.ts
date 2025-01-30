export class FetchUtil {
  static isError(error: unknown): boolean {
    return error instanceof TypeError
  }
}
