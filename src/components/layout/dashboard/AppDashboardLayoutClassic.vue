<script setup lang="ts">
import { RouterView } from 'vue-router'
</script>

<template>
  <div class="flex size-full flex-1 overflow-hidden">
    <slot name="sidebar" />
    <div class="flex h-dvh flex-1 flex-col overflow-hidden">
      <slot name="header" />
      <RouterView />
    </div>
  </div>
</template>
