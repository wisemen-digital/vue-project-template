<script setup lang="ts">
import AppPage from './AppPage.vue'

const props = withDefaults(
  defineProps<{
    subtitle?: null | string
    title: string
  }>(),
  {
    subtitle: null,
  },
)
</script>

<template>
  <AppPage
    :subtitle="props.subtitle"
    :title="props.title"
    class="h-screen overflow-hidden"
  >
    <template #header-actions>
      <slot name="header-actions" />
    </template>

    <slot />
  </AppPage>
</template>
