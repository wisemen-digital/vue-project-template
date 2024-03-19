<script setup lang="ts">
import { useRegisterSW } from 'virtual:pwa-register/vue'
import { useI18n } from 'vue-i18n'

import AppButton from '@/components/app/button/AppButton.vue'
import AppIconButton from '@/components/app/button/AppIconButton.vue'
import AppText from '@/components/app/text/AppText.vue'
import { useLoading } from '@/composables/loading/loading.composable.ts'
import { logError, logInfo } from '@/utils/logger.util.ts'

const ONE_MINUTE = 60000

const { t } = useI18n()

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
    }, ONE_MINUTE)

    logInfo('SW Registered', serviceWorkerRegistration)
  },
})

function close(): void {
  needRefresh.value = false
}

const {
  isLoading,
  setLoadingState,
} = useLoading()

async function onRefreshButtonClick(): Promise<void> {
  setLoadingState(true)
  await updateServiceWorker(true)
}

function onCloseButtonClick(): void {
  close()
}
</script>

<template>
  <div
    v-if="needRefresh"
    class="fixed right-4 top-4 z-[100] w-[300px]"
  >
    <div class="relative rounded border border-solid border-border bg-background p-4 shadow-card-shadow">
      <AppText
        class="font-bold"
        variant="subtext"
      >
        {{ t('shared.new_version_available') }}
      </AppText>
      <AppText
        class="my-2"
        variant="caption"
      >
        {{ t('shared.new_version_available_description') }}
      </AppText>
      <AppButton
        :is-loading="isLoading"
        size="sm"
        value="test"
        @click="onRefreshButtonClick"
      >
        <AppText variant="caption">
          {{ t('shared.click_to_refresh') }}
        </AppText>
      </AppButton>
      <div class="absolute right-1 top-1">
        <AppIconButton
          button-size="sm"
          icon="close"
          icon-size="sm"
          @click="onCloseButtonClick"
        />
      </div>
    </div>
  </div>
</template>
