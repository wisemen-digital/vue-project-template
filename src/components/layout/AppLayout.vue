<script setup lang="ts">
import { computed } from 'vue'
import { RouterView } from 'vue-router'

import AppDarkModeToggle from '@/components/layout/AppDarkModeToggle.vue'
import { useTheme } from '@/composables/theme/theme.composable.ts'

const theme = useTheme()

const isDarkModeEnabled = computed<boolean>(() => theme.theme.value === 'dark')

function onDarkModeToggleClick(): void {
  if (theme.theme.value === 'dark') {
    theme.setTheme(null)
    return
  }

  theme.setTheme('dark')
}
</script>

<template>
  <div class="flex size-full min-h-screen flex-col">
    <!-- TODO: sidebar, header, ... -->
    <div class="flex flex-1 overflow-hidden">
      <RouterView />
    </div>
    <AppDarkModeToggle
      :is-dark-mode="isDarkModeEnabled"
      class="fixed bottom-4 left-4"
      @click="onDarkModeToggleClick"
    />
  </div>
</template>
