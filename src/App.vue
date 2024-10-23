<script setup lang="ts">
import {
  AppConfigProvider,
  AppDialogContainer,
  AppThemeProvider,
  AppToastContainer,
  useDocumentTitle,
} from '@wisemen/vue-core'
import { RouterView } from 'vue-router'

import AppPageLoader from '@/components/app/loader/AppPageLoader.vue'
import { useRefreshPrompt } from '@/composables/refresh-prompt/refreshPrompt.composable'
import { logBuildInformation } from '@/constants/environment.constant.ts'

const { setTemplate } = useDocumentTitle()

setTemplate('{title} | App')

useRefreshPrompt()
logBuildInformation()
</script>

<template>
  <AppConfigProvider locale="en">
    <AppThemeProvider theme="light">
      <RouterView />
      <AppPageLoader />
      <AppDialogContainer />
      <AppToastContainer />
    </AppThemeProvider>
  </AppConfigProvider>
</template>
