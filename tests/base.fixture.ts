import { expect, test as base } from '@playwright/test'

import { TEST_ID } from '@/constants/testId.constant.ts'

export const test = base.extend({
  page: async ({ page }, use) => {
    const errors: string[] = []

    page.on('console', (event) => {
      if (event.type() === 'error') {
        errors.push(event.text())
      }
    })

    await use(page)

    // TODO enable accessibility scan
    // const accessibilityScanResults = await new AxeBuilder({ page })
    //   .withTags([
    //     'wcag2a',
    //     'wcag2aa',
    //     'wcag21a',
    //     'wcag21aa',
    //   ])
    //   .analyze()

    // eslint-disable-next-line playwright/no-standalone-expect
    expect(errors).toStrictEqual([])

    // eslint-disable-next-line playwright/no-standalone-expect
    await expect(page.getByTestId(TEST_ID.SHARED.MALFORMED_RESPONSE_TOAST)).toBeHidden()
    // expect(accessibilityScanResults.violations).toEqual([])
    //
    // await testInfo.attach('accessibility-scan-results', {
    //   body: JSON.stringify(accessibilityScanResults, null, 2),
    //   contentType: 'application/json',
    // })
  },
})

export { expect } from '@playwright/test'
