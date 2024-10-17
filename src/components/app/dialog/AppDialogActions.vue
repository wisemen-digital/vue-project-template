<script setup lang="ts">
import AppButtonGroup from '@/components/app/AppButtonGroup.vue'
</script>

<template>
  <AppButtonGroup
    justify="center"
    class="mt-8"
  >
    <slot />
  </AppButtonGroup>
</template>
