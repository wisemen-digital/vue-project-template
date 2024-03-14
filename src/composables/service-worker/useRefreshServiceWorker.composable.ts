import { useRegisterSW } from 'virtual:pwa-register/vue'
import { ref } from 'vue'

import { logInfo } from '@/utils/logger.util'

interface RefreshServiceWorker {
  onRefresh: (callback: () => void) => void
  refresh: () => Promise<void>
}

const ONE_MINUTE_INTERVAL = 60 * 1000

export function useRefreshServiceWorker(): RefreshServiceWorker {
  const needRefreshCallback = ref<() => void>(() => {})

  const {
    needRefresh,
    updateServiceWorker,
  } = useRegisterSW({
    immediate: true,
    onNeedRefresh() {
      logInfo(`ServiceWorker needs refresh`)

      if (needRefreshCallback.value === undefined) {
        return
      }

      needRefreshCallback.value()
    },
    onRegisteredSW(swScriptUrl: string, registration: ServiceWorkerRegistration | undefined) {
      logInfo(`ServiceWorker registered at: ${swScriptUrl}`)

      if (registration === undefined) {
        logInfo('No service worker registered')
        return
      }

      setInterval(async () => {
        await registration.update()
      }, ONE_MINUTE_INTERVAL)
    },
  })

  function onRefresh(callback: () => void): void {
    needRefreshCallback.value = callback
  }

  async function refresh(): Promise<void> {
    await updateServiceWorker(true)
    needRefresh.value = false
  }

  return {
    onRefresh,
    refresh,
  }
}
