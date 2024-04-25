<script setup lang="ts">
import { NavigationItem } from '@/types/navigationItem.type'

import AppSidebarMenuItem from './AppSidebarMenuItem.vue'

const props = defineProps<{
  items: NavigationItem[]
}>()
</script>

<template>
  <nav class="mt-16">
    <ul class="flex flex-col items-center gap-y-2">
      <AppSidebarMenuItem
        v-for="item of props.items"
        :key="item.label"
        :item="item"
      />
    </ul>
  </nav>
</template>
