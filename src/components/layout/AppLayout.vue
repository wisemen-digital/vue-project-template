<script setup lang="ts">
import { RouterView } from 'vue-router'
</script>

<template>
  <div class="flex size-full min-h-screen flex-col">
    <!-- TODO: sidebar, header, ... -->
    <div class="flex flex-1 overflow-hidden">
      <RouterView />
    </div>
  </div>
</template>
