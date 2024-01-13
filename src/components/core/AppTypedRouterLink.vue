<script setup lang="ts" generic="T extends keyof Routes">
import type { RouteLocationNamedRaw } from 'vue-router'

import type {
  RouteLocationTyped,
  Routes,
} from '@/plugins'

interface Props {
  to: RouteLocationTyped<T>
}

const { to } = defineProps<Props>()
</script>

<template>
  <RouterLink
    v-slot="{ isActive, isExactActive }"
    :to="(to as RouteLocationNamedRaw)"
    class="rounded text-left ring-primary ring-offset-background duration-100 hover:underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 disabled:cursor-not-allowed"
  >
    <slot
      :is-active="isActive"
      :is-exact-active="isExactActive"
    />
  </RouterLink>
</template>
