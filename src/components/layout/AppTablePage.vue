<script setup lang="ts">
import type { BreadcrumbItem } from '@wisemen/vue-core'
import {
  computed,
  useSlots,
} from 'vue'

import AppPage from './AppPage.vue'

const props = withDefaults(
  defineProps<{
    title: string
    breadcrumbs?: BreadcrumbItem[]
    subtitle?: string | null
  }>(),
  {
    breadcrumbs: () => [],
    subtitle: null,
  },
)

const slots = useSlots()

const hasTabsSlot = computed<boolean>(() => slots.tabs !== undefined)
</script>

<template>
  <AppPage
    :subtitle="props.subtitle"
    :breadcrumbs="props.breadcrumbs"
    :title="props.title"
    class="max-h-dvh overflow-hidden"
  >
    <template #header-actions>
      <slot name="header-actions" />
    </template>

    <div
      v-if="hasTabsSlot"
      class="mb-3xl"
    >
      <slot name="tabs" />
    </div>

    <slot />
  </AppPage>
</template>
