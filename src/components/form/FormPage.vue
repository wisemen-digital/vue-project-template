<script setup lang="ts">
import type { BreadcrumbItem } from '@wisemen/vue-core'

import AppPage from '@/components/layout/AppPage.vue'

const props = withDefaults(
  defineProps<{
    title: string
    breadcrumbs?: BreadcrumbItem[] | null
    subtitle?: null | string
  }>(),
  {
    breadcrumbs: null,
    subtitle: null,
  },
)
</script>

<template>
  <AppPage
    :title="props.title"
    :subtitle="props.subtitle"
    :breadcrumbs="props.breadcrumbs"
    class="pb-12"
  >
    <template #header-actions>
      <slot name="header-actions" />
    </template>

    <slot />
  </AppPage>
</template>
