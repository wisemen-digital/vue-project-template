<script setup lang="ts">
import { RouterView } from 'vue-router'

import AppSidebar from './sidebar/AppSidebar.vue'
</script>

<template>
  <div class="flex size-full flex-1">
    <AppSidebar />

    <div class="flex flex-1 flex-col overflow-hidden">
      <RouterView />
    </div>
  </div>
</template>
