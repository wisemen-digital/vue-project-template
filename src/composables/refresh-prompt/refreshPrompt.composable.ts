import { useToast } from '@wisemen/vue-core'
import { useRegisterSW } from 'virtual:pwa-register/vue'
import {
  onMounted,
  ref,
  watch,
} from 'vue'

import { useI18n } from '@/composables/i18n/i18n.composable'
import { TIME } from '@/constants/time.constant'
import { LoggerUtil } from '@/utils/logger.util'

export function useRefreshPrompt(): void {
  const { t } = useI18n()

  const isLoading = ref<boolean>(false)

  const toast = useToast()

  const {
    needRefresh,
    updateServiceWorker,
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
      }, TIME.ONE_MINUTE)

      LoggerUtil.logInfo('SW Registered', serviceWorkerRegistration)
    },
  })

  async function onRefreshButtonClick(closeToast: () => void): Promise<void> {
    isLoading.value = true
    await updateServiceWorker(true)
    closeToast()
  }

  onMounted(() => {
    watch(needRefresh, (needRefresh) => {
      if (needRefresh) {
        toast.info({
          action: {
            label: t('component.refresh_prompt.new_version.action'),
            onClick: onRefreshButtonClick,
          },
          durationInMs: TIME.ONE_HOUR,
          icon: 'stars',
          message: t('component.refresh_prompt.new_version.description'),
        })
      }
    }, {
      immediate: true,
    })
  })
}
