<script setup lang="ts">
import { RouterView } from 'vue-router'
</script>

<template>
  <div class="bg-secondary flex size-full flex-1">
    <slot name="sidebar" />

    <div class="p-xl pl-xs z-[1] flex h-dvh flex-1 flex-col overflow-hidden">
      <div
        class="
          bg-primary flex flex-1 flex-col overflow-auto rounded-2xl shadow-lg
        "
      >
        <RouterView />
      </div>
    </div>
  </div>
</template>
