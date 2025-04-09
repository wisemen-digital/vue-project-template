<script setup lang="ts">
import {
  useAppearance,
  VcConfigProvider,
  VcDialogContainer,
  VcThemeProvider,
  VcToastContainer,
} from '@wisemen/vue-core-components'
import { useI18n } from 'vue-i18n'
import {
  RouterView,
  useRouter,
} from 'vue-router'

import AppPageLoader from '@/components/app/loader/AppPageLoader.vue'
import { useAutoRefresh } from '@/composables/auto-refresh/autoRefresh.composable.ts'
import { useDocumentTitle } from '@/composables/document-title/documentTitle.composable.ts'
import { useFontSize } from '@/composables/font-size/fontSize.composable'
import { useLanguage } from '@/composables/language/language.composable'
import { useReduceMotion } from '@/composables/reduce-motion/reduceMotion.composable'
import { useTheme } from '@/composables/theme/theme.composable'
import { logBuildInformation } from '@/constants/environment.constant.ts'
import { useAuthStore } from '@/stores/auth.store.ts'

const { setTemplate } = useDocumentTitle()
const i18n = useI18n()
const router = useRouter()
const appearance = useAppearance()
const authStore = useAuthStore()
const theme = useTheme()

setTemplate('{title} | $projectName')

useAutoRefresh()
useFontSize()
useLanguage()
useReduceMotion()

logBuildInformation()

authStore.onLogout(() => {
  router.replace({ name: 'auth-login' })
})
</script>

<template>
  <VcConfigProvider
    :locale="i18n.locale.value"
    teleport-target-selector="#teleport-target"
  >
    <VcThemeProvider
      :theme="theme"
      :appearance="appearance"
      class="flex size-full flex-1 flex-col overflow-hidden"
    >
      <RouterView />

      <AppPageLoader />
      <VcDialogContainer />
      <VcToastContainer />
      <div id="teleport-target" />
    </VcThemeProvider>
  </VcConfigProvider>
</template>
