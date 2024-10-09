import type { Page } from '@playwright/test'

import type { S3FileDto } from '@/models/s3-file/s3FileDto.model.ts'
import { DateTimePickerUtil } from '@@/utils/dateTimePicker.util.ts'
import { InterceptorUtil } from '@@/utils/interceptor.util.ts'

export class SelectorUtil {
  static async fileUpload(page: Page, testId: string, file: S3FileDto): Promise<void> {
    await InterceptorUtil.fileUpload(page, file)

    const fileChooserEvent = page.waitForEvent('filechooser')

    await page.getByTestId(testId).click()

    const filePicker = await fileChooserEvent

    await filePicker.setFiles({
      name: file.name ?? '',
      // eslint-disable-next-line node/prefer-global/buffer
      buffer: Buffer.from('test'),
      mimeType: file.mimeType,
    })
  }

  static async fillTextEditor(page: Page, testId: string, text: string): Promise<void> {
    await page.getByTestId(testId).getByRole('paragraph').fill(text)
  }

  static async selectAutoComplete(page: Page, testId: string, text: string, input: string): Promise<void> {
    const autoCompleteSection = page.getByTestId(testId)
    const inputField = autoCompleteSection.locator('input[type="text"]')

    await inputField.fill(input)
    await page.getByRole('option', { name: text }).click()
  }

  static async selectDateTime(page: Page, testId: string, date: string, time?: string): Promise<void> {
    await DateTimePickerUtil.selectDateTime(page, testId, date, time)
  }

  static async selectMultipleOptions(page: Page, testId: string, options: string[]): Promise<void> {
    const targetGroupSelect = page.getByTestId(testId)

    for (const text of options) {
      await targetGroupSelect.click()

      const inputField = targetGroupSelect.locator('input')

      await inputField.fill(text)

      const option = page.getByRole('option', { name: text })

      if (await option.isVisible()) {
        await option.click()
      }
      else {
        return
      }

      await targetGroupSelect.press('Escape')
    }
  }

  static async selectOption(page: Page, testId: string, text: string): Promise<void> {
    await page.getByTestId(testId).click()
    await page.getByRole('option', { name: text }).click()
  }
}
