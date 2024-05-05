<script setup lang="ts">
import { BreadcrumbItem } from '@wisemen/vue-core'

import AppPage from '../app/AppPage.vue'

const props = withDefaults(
  defineProps<{
    breadcrumbs?: BreadcrumbItem[] | null
    subtitle?: null | string
    title: string
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
