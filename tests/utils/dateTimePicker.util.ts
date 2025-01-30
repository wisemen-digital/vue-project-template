import type { Page } from '@playwright/test'

export class DateTimePickerUtil {
  private static getMonthName(month: number): string {
    const monthNames = [
      'Jan',
      'Feb',
      'Mar',
      'Apr',
      'May',
      'Jun',
      'Jul',
      'Aug',
      'Sep',
      'Oct',
      'Nov',
      'Dec',
    ]

    return monthNames[month - 1]
  }

  static async selectDateTime(
    page: Page,
    dateTestId: string,
    date: string,
    time?: string,
  ): Promise<void> {
    await page.getByTestId(dateTestId).click()

    const [
      year,
      month,
      day,
    ] = date.split('-').map(Number)

    if (time) {
      await this.selectTime(page, time)
    }

    await this.selectYear(page, year)
    await this.selectMonth(page, month)
    await this.selectDay(page, day)
  }

  private static async selectDay(page: Page, day: number): Promise<void> {
    await page.locator(`.dp__calendar_item:has-text("${day}")`).click()
  }

  private static async selectMonth(page: Page, month: number): Promise<void> {
    await page.locator('[data-dp-element="overlay-month"]').click()

    const monthName = this.getMonthName(month)

    await page.locator(`[data-test="${monthName}"]`).click()
  }

  private static async selectTime(page: Page, time: string): Promise<void> {
    const [
      hours,
      minutes,
    ] = time.split(':').map(Number)

    await page.locator('[data-test="open-time-picker-btn"]').click()

    await page.locator('[data-test="hours-toggle-overlay-btn-0"]').click()
    await page.locator(`[data-test="${hours.toString().padStart(2, '0')}"]`).click()

    await page.locator('[data-test="minutes-toggle-overlay-btn-0"]').click()
    await page.locator(`[data-test="${minutes.toString().padStart(2, '0')}"]`).click()

    await page.locator('[aria-label="Close time Picker"]').click()
  }

  private static async selectYear(page: Page, year: number): Promise<void> {
    await page.locator('[data-dp-element="overlay-year"]').click()

    await page.locator(`[data-test="${year}"]`).click()
  }
}
