<script setup lang="ts" generic="TRoute extends keyof Routes">
import type {
  RouteLocationTyped,
  Routes,
} from '@wisemen/vue-core'
import { RouterLink } from 'vue-router'

const props = defineProps<{
  to: RouteLocationTyped<TRoute>
}>()
</script>

<template>
  <RouterLink
    v-slot="{ isActive, isExactActive }"
    :to="props.to"
    class="rounded text-left ring-brand-primary-500 duration-100 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 disabled:cursor-not-allowed"
  >
    <slot
      :is-active="isActive"
      :is-exact-active="isExactActive"
    />
  </RouterLink>
</template>
