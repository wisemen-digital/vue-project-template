<script setup lang="ts">
import { RouterView } from 'vue-router'
</script>

<template>
  <div class="flex size-full flex-1">
    <slot name="sidebar" />

    <div class="flex flex-1 overflow-hidden">
      <RouterView />
    </div>
  </div>
</template>
