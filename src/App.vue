<script setup lang="ts">
import {
  AppDialogContainer,
  AppToastContainer,
} from '@wisemen/vue-core'
import { RouterView } from 'vue-router'

import AppPageLoader from '@/components/app/loader/AppPageLoader.vue'
import ThemeProvider from '@/components/app/ThemeProvider.vue'
import { onCreated } from '@/composables/created/created.composable.ts'
import { useDocumentTitle } from '@/composables/document-title/documentTitle.composable'
import { useRefreshPrompt } from '@/composables/refresh-prompt/refreshPrompt.composable'
import {
  CURRENT_BUILD_COMMIT,
  CURRENT_BUILD_NUMBER,
  CURRENT_BUILD_TIMESTAMP,
  CURRENT_ENVIRONMENT,
} from '@/constants/environment.constant.ts'
import { LoggerUtil } from '@/utils/logger.util.ts'

const { setTemplate } = useDocumentTitle()

setTemplate('{title} | App')

useRefreshPrompt()

onCreated(() => {
  if (CURRENT_BUILD_COMMIT === 'undefined') {
    return
  }

  LoggerUtil.logInfo('Application started', {
    COMMIT: CURRENT_BUILD_COMMIT,
    ENVIRONMENT: CURRENT_ENVIRONMENT,
    NUMBER: CURRENT_BUILD_NUMBER,
    TIMESTAMP: CURRENT_BUILD_TIMESTAMP,
  })
})
</script>

<template>
  <ThemeProvider class="flex h-full flex-1 flex-col">
    <RouterView />
    <AppPageLoader />
    <AppDialogContainer />
    <AppToastContainer />
  </ThemeProvider>
</template>
