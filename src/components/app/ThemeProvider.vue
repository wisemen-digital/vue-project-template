<script lang="ts" setup>
import { watch } from 'vue'

import { useTheme } from '@/composables/theme/theme.composable.ts'

const { theme } = useTheme()

watch(theme, (theme) => {
  if (theme === null) {
    return
  }

  document.documentElement.setAttribute('data-theme', theme)
}, {
  immediate: true,
})
</script>

<template>
  <slot />
</template>
