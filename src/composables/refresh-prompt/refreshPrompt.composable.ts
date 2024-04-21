import { useToast } from '@wisemen/vue-core'
import { useRegisterSW } from 'virtual:pwa-register/vue'
import {
  onMounted,
  watch,
} from 'vue'
import { useI18n } from 'vue-i18n'

import { useLoading } from '@/composables/loading/loading.composable.ts'
import { TIME } from '@/constants/time.constant'
import { logError, logInfo } from '@/utils/logger.util.ts'

export function useRefreshPrompt(): void {
  const { t } = useI18n()

  const {
    isLoading,
    setLoadingState,
  } = useLoading()

  const toast = useToast()

  const {
    needRefresh,
    updateServiceWorker,
  } = useRegisterSW({
    immediate: true,
    async onRegisteredSW(swUrl, serviceWorkerRegistration) {
      logInfo('Service Worker at', swUrl)

      if (serviceWorkerRegistration === undefined) {
        logError('Service Worker not registered')
        return
      }

      await serviceWorkerRegistration.update()

      setInterval(async () => {
        await serviceWorkerRegistration.update()
      }, TIME.ONE_MINUTE)

      logInfo('SW Registered', serviceWorkerRegistration)
    },
  })

  async function onRefreshButtonClick(closeToast: () => void): Promise<void> {
    setLoadingState(true)
    await updateServiceWorker(true)
    closeToast()
  }

  onMounted(() => {
    watch(needRefresh, (needRefresh) => {
      if (needRefresh) {
        toast.custom({
          action: {
            isLoading,
            label: t('components.refresh_prompt.new_version.action'),
            onClick: onRefreshButtonClick,
          },
          description: t('components.refresh_prompt.new_version.description'),
          duration: TIME.FIVE_MINUTES,
          icon: 'download',
          title: t('components.refresh_prompt.new_version.title'),
          type: 'info',
        })
      }
    }, {
      immediate: true,
    })
  })
}
