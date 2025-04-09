<script setup lang="ts">
import { RouterView } from 'vue-router'
</script>

<template>
  <div
    class="from-brand-600 to-brand-800 flex size-full flex-1 bg-gradient-to-br"
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
