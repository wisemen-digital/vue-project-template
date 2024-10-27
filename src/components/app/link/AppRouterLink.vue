<script setup lang="ts">
import { RouterLink } from 'vue-router'

import type { RouteLocationCurrent } from '@/types/vueRouter'

const props = defineProps<{
  to: RouteLocationCurrent
}>()
</script>

<template>
  <RouterLink
    v-slot="{ isActive, isExactActive }"
    :to="props.to"
    class="rounded text-left ring-brand-primary-500 duration-100 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-1 disabled:cursor-not-allowed"
  >
    <slot
      :is-active="isActive"
      :is-exact-active="isExactActive"
    />
  </RouterLink>
</template>
