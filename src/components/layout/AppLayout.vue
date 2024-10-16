<script setup lang="ts">
import { RouterView } from 'vue-router'

import AppSidebar from '@/components/layout/sidebar/AppSidebar.vue'
</script>

<template>
  <div class="flex size-full flex-1">
    <AppSidebar />

    <div class="flex flex-1 overflow-hidden">
      <RouterView />
    </div>
  </div>
</template>
