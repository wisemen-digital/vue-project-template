<script setup lang="ts">
import {
  AppIcon,
  type Icon,
} from '@wisemen/vue-core'

import AppRouterLink from '@/components/app/link/AppRouterLink.vue'
import type { RouteLocationCurrent } from '@/types/vueRouter'

const props = defineProps<{
  title: string
  description: string
  icon: Icon
  to: RouteLocationCurrent
}>()
</script>

<template>
  <AppRouterLink
    :to="props.to"
    class="flex w-full flex-col gap-2 rounded-xl border border-secondary bg-secondary p-4 hover:bg-tertiary"
  >
    <span class="flex items-center justify-start gap-2">
      <AppIcon
        :icon="props.icon"
      />
      <span class="truncate font-semibold">
        {{ props.title }}
      </span>
    </span>
    <span class="text-sm text-tertiary">
      {{ props.description }}
    </span>
  </AppRouterLink>
</template>
