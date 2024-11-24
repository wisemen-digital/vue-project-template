export class TimeUtil {
  static hours(value: number): number {
    return this.minutes(value) * 60
  }

  static minutes(value: number): number {
    return this.seconds(value) * 60
  }

  static seconds(value: number): number {
    return value * 1000
  }
}
