<script lang="ts" setup>
import { useTheme } from '@/composables/theme/theme.composable.ts'

const { theme } = useTheme()
</script>

<template>
  <div :class="theme">
    <slot />
  </div>
</template>
