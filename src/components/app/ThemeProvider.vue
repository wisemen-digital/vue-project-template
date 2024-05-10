<script lang="ts" setup>
import { computed } from 'vue'

import { useTheme } from '@/composables/theme/theme.composable.ts'
import type { ThemeConstant } from '@/constants/theme.constant.ts'

const theme = useTheme()

const currentTheme = computed<ThemeConstant | null>(() => theme.current.value)
</script>

<template>
  <div :class="currentTheme">
    <slot />
  </div>
</template>
