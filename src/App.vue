<script setup lang="ts">
import {
  AppDialogContainer,
  AppToastContainer,
  useDocumentTitle,
} from '@wisemen/vue-core'
import { RouterView } from 'vue-router'

import AppPageLoader from '@/components/app/loader/AppPageLoader.vue'
import ThemeProvider from '@/components/app/ThemeProvider.vue'
import { useRefreshPrompt } from '@/composables/refresh-prompt/refreshPrompt.composable'
import { logBuildInformation } from '@/constants/environment.constant.ts'

const { setTemplate } = useDocumentTitle()

setTemplate('{title} | App')

useRefreshPrompt()
logBuildInformation()
</script>

<template>
  <ThemeProvider class="flex h-full flex-1 flex-col">
    <RouterView />
    <AppPageLoader />
    <AppDialogContainer />
    <AppToastContainer />
  </ThemeProvider>
</template>
