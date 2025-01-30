import { CURRENT_ENVIRONMENT } from '@/constants/environment.constant.ts'
import { worker } from '@/mocks/browser.mock.ts'

export async function setupMockServer(): Promise<ServiceWorkerRegistration | undefined> {
  if (CURRENT_ENVIRONMENT !== 'mock') {
    return
  }

  // `worker.start()` returns a Promise that resolves
  // once the Service Worker is up and ready to intercept requests.
  return await worker.start({ onUnhandledRequest: 'bypass' })
}
