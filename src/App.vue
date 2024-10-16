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

<style lang="scss">
@keyframes fade-in {
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
}

@keyframes fade-out {
  from {
    opacity: 1;
  }
  to {
    opacity: 0;
  }
}

.view-transition {
  view-transition-name: title;
}

::view-transition-old(title) {
  animation: 0.1s linear both fade-out;
}

::view-transition-new(title) {
  animation: 0.3s linear both fade-in;
}

::view-transition-old(root) {
  // animation: 0;
}

::view-transition-new(root) {
  // animation: 0;
}
</style>
