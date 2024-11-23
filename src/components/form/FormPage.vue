<script setup lang="ts">
import AppPage from '@/components/layout/AppPage.vue'
</script>

<template>
  <AppPage class="pb-6xl">
    <template #header-actions>
      <slot name="header-actions" />
    </template>

    <slot />
  </AppPage>
</template>
