import path from 'node:path'
import process from 'node:process'
import { fileURLToPath } from 'node:url'

import {
  defineConfig,
  devices,
} from '@playwright/test'
/**
 * Read environment variables from file.
 * https://github.com/motdotla/dotenv
 */
// require('dotenv').config();
import dotenv from 'dotenv'

const __filename = fileURLToPath(import.meta.url) // get the resolved path to the file
const __dirname = path.dirname(__filename) // get the name of the directory

dotenv.config({ path: path.resolve(__dirname, '.env.e2e') })

const PORT = 3000
const ENVIRONMENT = 'e2e'

/**
 * See https://playwright.dev/docs/test-configuration.
 */
export default defineConfig({
  expect: {
    /**
     * Maximum time expect() should wait for the condition to be met.
     * For example in `await expect(locator).toHaveText();`
     */
    timeout: 5000,
  },
  /* Fail the build on CI if you accidentally left test.only in the source code. */
  forbidOnly: Boolean(process.env.CI),
  fullyParallel: true,
  /* Configure projects for major browsers */
  projects: [
    {
      name: 'setup',
      testMatch: /.*\.setup\.ts/,
    },
    {
      name: 'chromium',
      dependencies: [
        'setup',
      ],
      use: {
        ...devices['Desktop Chrome'],
        storageState: 'tests/.auth/user.json',
      },
    },
    // {
    //   name: 'firefox',
    //   use: {
    //     ...devices['Desktop Firefox'],
    //   },
    // },
    // {
    //   name: 'webkit',
    //   use: {
    //     ...devices['Desktop Safari'],
    //   },
    // },
  ],
  /* Reporter to use. See https://playwright.dev/docs/test-reporters */
  // reporter: 'html',
  /* Retry on CI only */
  retries: process.env.CI === undefined ? 0 : 0,
  testDir: './tests',
  /* Maximum time one test can run for. */
  timeout: 30 * 1000,
  /* Shared settings for all the projects below. See https://playwright.dev/docs/api/class-testoptions. */
  use: {
    /* Maximum time each action such as `click()` can take. Defaults to 0 (no limit). */
    actionTimeout: 0,
    /* Base URL to use in actions like `await page.goto('/')`. */
    baseURL: `http://localhost:${PORT}`,

    /* Only on CI systems run the tests headless */
    headless: true,
    testIdAttribute: 'data-test-id',

    /* Collect trace when retrying the failed test. See https://playwright.dev/docs/trace-viewer */
    trace: 'on-first-retry',
  },

  /* Run your local dev server before starting the tests */
  webServer: {
    command: process.env.CI === undefined ? `pnpm dev --port ${PORT}` : `pnpm preview --port ${PORT}`,
    env: { ENVIRONMENT },
    port: PORT,
    // reuseExistingServer: process.env.CI === undefined,
    /**
     * Use the dev server by default for faster feedback loop.
     * Use the preview server on CI for more realistic testing.
     * Playwright will re-use the local server if there is already a dev-server running.
     */
    stderr: 'pipe',
    stdout: 'pipe',
  },

  /* Folder for test artifacts such as screenshots, videos, traces, etc. */
  // outputDir: 'test-results/',

  /* Opt out of parallel tests on CI. */
  // workers: process.env.CI === undefined ? 1 : 1,
})
