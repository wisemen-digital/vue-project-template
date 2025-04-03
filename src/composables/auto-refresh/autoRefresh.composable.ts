import { useRegisterSW } from 'virtual:pwa-register/vue'
import {
  onMounted,
  watch,
} from 'vue'

import { LoggerUtil } from '@/utils/logger.util'
import { TimeUtil } from '@/utils/time.util'

export function useAutoRefresh(): void {
  const {
    needRefresh, updateServiceWorker,
  } = useRegisterSW({
    immediate: true,
    async onRegisteredSW(swUrl: string, serviceWorkerRegistration: ServiceWorkerRegistration | undefined) {
      LoggerUtil.logInfo('Service Worker at', swUrl)

      if (serviceWorkerRegistration === undefined) {
        LoggerUtil.logError('Service Worker not registered')

        return
      }

      await serviceWorkerRegistration.update()

      setInterval(async () => {
        await serviceWorkerRegistration.update()
      }, TimeUtil.minutes(1))

      LoggerUtil.logInfo('SW Registered', serviceWorkerRegistration)
    },
  })

  onMounted(() => {
    watch(needRefresh, (needRefresh) => {
      if (needRefresh) {
        updateServiceWorker(true)
      }
    }, { immediate: true })
  })
}
