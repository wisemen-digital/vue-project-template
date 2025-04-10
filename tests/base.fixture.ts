import * as crypto from 'node:crypto'
import * as fs from 'node:fs'
import * as path from 'node:path'
import process from 'node:process'

import AxeBuilder from '@axe-core/playwright'
import {
  expect,
  test as base,
} from '@playwright/test'
import { http } from 'msw'
import type { MockServiceWorker } from 'playwright-msw'
import { createWorkerFixture } from 'playwright-msw'

import { TEST_ID } from '@/constants/testId.constant.ts'
import { handlers } from '@/mocks/handlers'

const istanbulCLIOutput = path.join(process.cwd(), '.nyc_output')

export function generateUUID(): string {
  return crypto.randomBytes(16).toString('hex')
}

const test = base.extend<{
  http: typeof http
  worker: MockServiceWorker
}>({
  context: async ({ context }, use) => {
    await context.addInitScript(() =>
      window.addEventListener('beforeunload', () => {
        return (window as any).collectIstanbulCoverage(JSON.stringify((window as any).__coverage__))
      }))

    await fs.promises.mkdir(istanbulCLIOutput, { recursive: true })

    await context.exposeFunction('collectIstanbulCoverage', (coverageJSON: string) => {
      if (coverageJSON) {
        fs.writeFileSync(path.join(istanbulCLIOutput, `playwright_coverage_${generateUUID()}.json`), coverageJSON)
      }
    })

    await use(context)

    for (const page of context.pages()) {
      await page.evaluate(() => (window as any).collectIstanbulCoverage(JSON.stringify((window as any).__coverage__)))
    }
  },
  http,
  page: async ({ page }, use, testInfo) => {
    const errors: string[] = []
    const warnings: string[] = []

    page.on('console', (event) => {
      if (event.type() === 'error') {
        errors.push(event.text())
      }
    })

    page.on('console', (event) => {
      if (event.type() === 'warning') {
        warnings.push(event.text())
      }
    })

    await use(page)

    await page.waitForTimeout(500)

    const accessibilityScanResults = await new AxeBuilder({ page })
      .withTags([
        'wcag2a',
        'wcag2aa',
        'wcag21a',
        'wcag21aa',
      ])
      .analyze()

    const wcag21aaViolations = accessibilityScanResults.violations.filter((v) =>
      v.tags.includes('wcag21aa'))
    const otherViolations = accessibilityScanResults.violations.filter((v) =>
      !v.tags.includes('wcag21aa'))

    expect(errors).toStrictEqual([])
    expect(warnings).toStrictEqual([])

    await expect(page.getByTestId(TEST_ID.SHARED.MALFORMED_RESPONSE_TOAST)).toBeHidden()

    expect(wcag21aaViolations).toEqual([])

    if (otherViolations.length > 0) {
      console.warn('[AXE WARNING] Accessibility issues detected that do not meet these standards: WCAG 2.0 Level A / WCAG 2.0 Level AA / WCAG 2.1 Level A. Please review and address the following issues. You can find more details if you download the Accessibility report in the "Attachements" tab.', otherViolations)
    }

    await testInfo.attach('accessibility-scan-results', {
      body: JSON.stringify(accessibilityScanResults, null, 2),
      contentType: 'application/json',
    })
  },
  worker: createWorkerFixture(handlers, { waitForPageLoad: true }),
})

export {
  expect, test,
}
