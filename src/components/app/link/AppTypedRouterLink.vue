<script setup lang="ts" generic="T extends keyof Routes">
import type { RouteLocationNamedRaw } from 'vue-router'
import { RouterLink } from 'vue-router'

import type { Routes } from '@/routes/routes'
import type { RouteLocationTyped } from '@/types/router/router.type'

const { to } = defineProps<{
  to: RouteLocationTyped<T>
}>()
</script>

<template>
  <RouterLink
    v-slot="{ isActive, isExactActive }"
    :to="to as RouteLocationNamedRaw"
    class="rounded text-left ring-primary ring-offset-background duration-100 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 disabled:cursor-not-allowed"
  >
    <slot
      :is-active="isActive"
      :is-exact-active="isExactActive"
    />
  </RouterLink>
</template>
