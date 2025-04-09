<script setup lang="ts">
import { RouterView } from 'vue-router'
</script>

<template>
  <div
    class="bg-secondary flex size-full flex-1"
  >
    <slot name="sidebar" />

    <div class="flex size-full flex-1 flex-col overflow-hidden">
      <slot name="header" />

      <div
        class="bg-primary flex size-full flex-1 overflow-hidden rounded-tl-4xl"
      >
        <RouterView />
      </div>
    </div>
  </div>
</template>
