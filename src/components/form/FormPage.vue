<script setup lang="ts">
import type { BreadcrumbItem } from '@wisemen/vue-core'

import AppPage from '@/components/layout/AppPage.vue'

const props = withDefaults(
  defineProps<{
    title: string
    breadcrumbs?: BreadcrumbItem[]
  }>(),
  {
    breadcrumbs: () => [],
  },
)
</script>

<template>
  <AppPage
    :title="props.title"
    :breadcrumbs="props.breadcrumbs"
    class="pb-6xl"
  >
    <template #header-actions>
      <slot name="header-actions" />
    </template>

    <slot />
  </AppPage>
</template>
